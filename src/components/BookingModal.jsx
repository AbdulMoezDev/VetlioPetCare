import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Heart,
  Dog,
  Cat,
  Bird,
  ShieldCheck,
  Stethoscope,
  Scissors,
  Syringe,
  Smile,
  ArrowRight,
  ArrowLeft,
  CalendarCheck,
} from "lucide-react";

const SERVICES_LIST = [
  {
    id: "checkup",
    title: "General Checkup",
    price: "$45",
    duration: "30 mins",
    desc: "Complete nose-to-tail wellness evaluation by senior veterinarian.",
    icon: Stethoscope,
    color: "#6E9B49",
  },
  {
    id: "walking",
    title: "Dog Walking & Activity",
    price: "$25",
    duration: "45 mins",
    desc: "Tailored outdoor exercise, hydration, and positive stimulation.",
    icon: Dog,
    color: "#8FB3FC",
  },
  {
    id: "grooming",
    title: "Grooming & Spa",
    price: "$55",
    duration: "60 mins",
    desc: "Warm bath, coat trim, nail clipping, and gentle ear cleaning.",
    icon: Scissors,
    color: "#FDBD10",
  },
  {
    id: "vaccines",
    title: "Vaccination & Booster",
    price: "$40",
    duration: "20 mins",
    desc: "Core and non-core preventive immunizations and rabies shots.",
    icon: Syringe,
    color: "#FB7E46",
  },
  {
    id: "dental",
    title: "Dental Hygiene",
    price: "$60",
    duration: "45 mins",
    desc: "Tartar removal, breath freshening, and oral health check.",
    icon: Smile,
    color: "#A0DF6D",
  },
  {
    id: "emergency",
    title: "Urgent & Same-Day Care",
    price: "$75",
    duration: "45 mins",
    desc: "Priority assessment for sudden illness, discomfort, or minor trauma.",
    icon: ShieldCheck,
    color: "#E05345",
  },
];

const DOCTORS_LIST = [
  {
    id: "dr-sarah",
    name: "Dr. Sarah Jenkins",
    role: "Chief Veterinarian (12+ yrs)",
  },
  {
    id: "dr-david",
    name: "Dr. David Chen",
    role: "Pet Surgeon & Orthopedics",
  },
  {
    id: "dr-maya",
    name: "Dr. Maya Patel",
    role: "Feline & Exotic Specialist",
  },
  {
    id: "any",
    name: "First Available Specialist",
    role: "Fastest appointment slot",
  },
];

const TIME_SLOTS = [
  "09:00 AM",
  "10:15 AM",
  "11:30 AM",
  "01:15 PM",
  "02:45 PM",
  "04:00 PM",
  "05:15 PM",
];

function BookingModal({ isOpen: propIsOpen, onClose: propOnClose }) {
  const navigate = useNavigate();
  const context = useBooking();

  const isOpen = propIsOpen !== undefined ? propIsOpen : context?.isBookingOpen;
  const onClose = propOnClose || context?.closeBooking;

  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const [formData, setFormData] = useState({
    petType: "dog",
    petName: "",
    petBreed: "",
    petAge: "",
    serviceId: "checkup",
    doctorId: "any",
    appointmentDate: new Date(Date.now() + 86400000)
      .toISOString()
      .split("T")[0],
    timeSlot: "10:15 AM",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    notes: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // Sync preselected service from context or prefill logged in user info
  const { user, profile } = useAuth();

  useEffect(() => {
    if (context?.preselectedServiceId) {
      setFormData((prev) => ({
        ...prev,
        serviceId: context.preselectedServiceId,
      }));
    }

    if (user && isOpen) {
      setFormData((prev) => ({
        ...prev,
        ownerName: prev.ownerName || profile?.full_name || user?.user_metadata?.full_name || "",
        ownerEmail: prev.ownerEmail || user?.email || "",
        ownerPhone: prev.ownerPhone || profile?.phone || user?.user_metadata?.phone || "",
      }));
    }
  }, [context?.preselectedServiceId, isOpen, user, profile]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validateStep = (currentStep) => {
    const errors = {};
    if (currentStep === 1) {
      if (!formData.petName.trim()) {
        errors.petName = "Please enter your pet's name";
      }
    }
    if (currentStep === 3) {
      if (!formData.appointmentDate) {
        errors.appointmentDate = "Please choose a date";
      }
      if (!formData.timeSlot) {
        errors.timeSlot = "Please select a time slot";
      }
    }
    if (currentStep === 4) {
      if (!formData.ownerName.trim()) {
        errors.ownerName = "Owner name is required";
      }
      if (!formData.ownerPhone.trim()) {
        errors.ownerPhone = "Phone number is required";
      }
      if (!formData.ownerEmail.trim()) {
        errors.ownerEmail = "Email address is required";
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const selectedService =
    SERVICES_LIST.find((s) => s.id === formData.serviceId) || SERVICES_LIST[0];
  const selectedDoctor =
    DOCTORS_LIST.find((d) => d.id === formData.doctorId) || DOCTORS_LIST[0];

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (validateStep(4)) {
      let createdRef = "VET-" + Math.floor(100000 + Math.random() * 900000);
      if (context?.addAppointment) {
        const app = context.addAppointment({
          serviceId: formData.serviceId,
          serviceTitle: selectedService.title,
          doctorName: selectedDoctor.name,
          petName: formData.petName,
          petType: formData.petType,
          petBreed: formData.petBreed || "Mixed / Not specified",
          petAge: formData.petAge || "Not specified",
          ownerName: formData.ownerName,
          ownerEmail: formData.ownerEmail,
          ownerPhone: formData.ownerPhone,
          date: formData.appointmentDate,
          time: formData.timeSlot,
          notes: formData.notes,
        });
        createdRef = app.id;
      }
      setBookingRef(createdRef);
      setIsSuccess(true);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setStep(1);
    setFormData({
      petType: "dog",
      petName: "",
      petBreed: "",
      petAge: "",
      serviceId: "checkup",
      doctorId: "any",
      appointmentDate: new Date(Date.now() + 86400000)
        .toISOString()
        .split("T")[0],
      timeSlot: "10:15 AM",
      ownerName: "",
      ownerEmail: "",
      ownerPhone: "",
      notes: "",
    });
    setFormErrors({});
    onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      onClick={handleResetAndClose}
    >
      <div
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-modal-in border border-stone-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#27221F] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6E9B49] flex items-center justify-center text-white">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight">
                {isSuccess ? "Appointment Confirmed" : "Book an Appointment"}
              </h3>
              <p className="text-xs text-stone-300">
                {isSuccess
                  ? "We look forward to meeting your pet!"
                  : "Quick 4-step personalized veterinary booking"}
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Step Indicator */}
        {!isSuccess && (
          <div className="bg-[#f6efe4] px-6 py-3 border-b border-stone-200">
            <div className="flex items-center justify-between">
              {[
                { num: 1, label: "Pet Details" },
                { num: 2, label: "Service" },
                { num: 3, label: "Date & Time" },
                { num: 4, label: "Review & Owner" },
              ].map((item) => (
                <div key={item.num} className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      step === item.num
                        ? "bg-[#6E9B49] text-white ring-4 ring-[#6E9B49]/20"
                        : step > item.num
                        ? "bg-[#27221F] text-white"
                        : "bg-white text-stone-400 border border-stone-300"
                    }`}
                  >
                    {step > item.num ? "✓" : item.num}
                  </div>
                  <span
                    className={`text-xs font-semibold hidden sm:inline ${
                      step >= item.num ? "text-[#27221F]" : "text-stone-400"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* SUCCESS SCREEN */}
          {isSuccess ? (
            <div className="py-6 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#E7F5E4] text-[#6E9B49] flex items-center justify-center mb-4 ring-8 ring-[#E7F5E4]/50">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#6E9B49] bg-[#E7F5E4] px-3 py-1 rounded-full mb-2">
                Booking ID: {bookingRef}
              </span>
              <h4 className="text-2xl font-extrabold text-[#27221F] mb-2">
                You're all booked, {formData.ownerName || "Pet Parent"}!
              </h4>
              <p className="text-stone-600 text-sm max-w-md mb-6">
                A confirmation email & SMS has been sent to{" "}
                <span className="font-semibold text-[#27221F]">
                  {formData.ownerEmail || "your email"}
                </span>
                . Our team is ready to care for {formData.petName || "your pet"}.
              </p>

              {/* Summary Card */}
              <div className="bg-[#f6efe4] w-full rounded-2xl p-5 border border-[#e4d7c6] text-left text-sm space-y-3 mb-6">
                <div className="flex justify-between border-b border-[#e4d7c6] pb-2">
                  <span className="text-stone-600">Patient:</span>
                  <span className="font-bold text-[#27221F]">
                    {formData.petName} ({formData.petType.toUpperCase()})
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#e4d7c6] pb-2">
                  <span className="text-stone-600">Service:</span>
                  <span className="font-bold text-[#27221F]">
                    {selectedService.title} ({selectedService.price})
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#e4d7c6] pb-2">
                  <span className="text-stone-600">Date & Time:</span>
                  <span className="font-bold text-[#27221F]">
                    {formData.appointmentDate} at {formData.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Doctor / Specialist:</span>
                  <span className="font-bold text-[#27221F]">
                    {selectedDoctor.name}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 w-full">
                <button
                  onClick={handleResetAndClose}
                  className="bg-white border border-stone-300 hover:bg-stone-50 text-[#27221F] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition cursor-pointer"
                >
                  Close & Return
                </button>
                <button
                  onClick={() => {
                    handleResetAndClose();
                    navigate("/my-appointments");
                  }}
                  className="bg-[#6E9B49] hover:bg-[#5b853b] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition cursor-pointer shadow-sm flex items-center gap-2"
                >
                  View in My Bookings <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: PET DETAILS */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-[#27221F] mb-2">
                      What kind of pet do you have?
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { id: "dog", label: "Dog", icon: Dog },
                        { id: "cat", label: "Cat", icon: Cat },
                        { id: "bird", label: "Bird", icon: Bird },
                        { id: "other", label: "Other", icon: Heart },
                      ].map((item) => {
                        const Icon = item.icon;
                        const isSelected = formData.petType === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, petType: item.id })
                            }
                            className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 border-2 transition-all cursor-pointer ${
                              isSelected
                                ? "border-[#6E9B49] bg-[#E7F5E4] text-[#6E9B49] shadow-xs font-bold"
                                : "border-stone-200 hover:border-stone-300 text-stone-700 bg-stone-50"
                            }`}
                          >
                            <Icon className="w-6 h-6" />
                            <span className="text-xs">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#27221F] uppercase tracking-wider mb-1">
                        Pet's Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Milo, Luna"
                        value={formData.petName}
                        onChange={(e) =>
                          setFormData({ ...formData, petName: e.target.value })
                        }
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition ${
                          formErrors.petName
                            ? "border-red-500 bg-red-50"
                            : "border-stone-300 focus:border-[#6E9B49] focus:ring-2 focus:ring-[#6E9B49]/20"
                        }`}
                      />
                      {formErrors.petName && (
                        <p className="text-red-500 text-xs mt-1">
                          {formErrors.petName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#27221F] uppercase tracking-wider mb-1">
                        Breed (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Golden Retriever, Persian"
                        value={formData.petBreed}
                        onChange={(e) =>
                          setFormData({ ...formData, petBreed: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#6E9B49] focus:ring-2 focus:ring-[#6E9B49]/20 text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#27221F] uppercase tracking-wider mb-1">
                      Pet's Age / Life Stage
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Puppy / Kitten (< 1 yr)", val: "junior" },
                        { label: "Adult (1 - 7 yrs)", val: "adult" },
                        { label: "Senior (7+ yrs)", val: "senior" },
                      ].map((age) => (
                        <button
                          key={age.val}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, petAge: age.val })
                          }
                          className={`p-2.5 rounded-xl border text-xs text-center transition cursor-pointer ${
                            formData.petAge === age.val
                              ? "border-[#6E9B49] bg-[#E7F5E4] font-bold text-[#6E9B49]"
                              : "border-stone-200 bg-white hover:border-stone-300 text-stone-700"
                          }`}
                        >
                          {age.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#27221F] uppercase tracking-wider mb-1">
                      Any known conditions or allergies?
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Sensitive stomach, anxious during nail trims..."
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#6E9B49] focus:ring-2 focus:ring-[#6E9B49]/20 text-sm outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: SELECT SERVICE */}
              {step === 2 && (
                <div className="space-y-4">
                  <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    Select a Care Service
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICES_LIST.map((srv) => {
                      const Icon = srv.icon;
                      const isSelected = formData.serviceId === srv.id;
                      return (
                        <div
                          key={srv.id}
                          onClick={() =>
                            setFormData({ ...formData, serviceId: srv.id })
                          }
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? "border-[#6E9B49] bg-[#E7F5E4] shadow-xs"
                              : "border-stone-200 hover:border-stone-300 bg-white"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center"
                              style={{
                                backgroundColor: isSelected
                                  ? "#6E9B49"
                                  : "#f6efe4",
                                color: isSelected ? "#ffffff" : "#27221F",
                              }}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-[#27221F] text-sm bg-white/80 px-2 py-0.5 rounded-md border border-stone-200">
                              {srv.price}
                            </span>
                          </div>
                          <div>
                            <h5 className="font-extrabold text-[#27221F] text-sm mb-1">
                              {srv.title}
                            </h5>
                            <p className="text-xs text-stone-600 leading-snug">
                              {srv.desc}
                            </p>
                          </div>
                          <span className="text-[11px] text-stone-400 font-semibold mt-2">
                            Duration: ~{srv.duration}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: DATE, TIME & VET */}
              {step === 3 && (
                <div className="space-y-5">
                  {/* Date selection */}
                  <div>
                    <label className="block text-xs font-bold text-[#27221F] uppercase tracking-wider mb-2">
                      Choose Appointment Date *
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="relative flex-1">
                        <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                        <input
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          value={formData.appointmentDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              appointmentDate: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#6E9B49] focus:ring-2 focus:ring-[#6E9B49]/20 text-sm outline-none font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Time slot */}
                  <div>
                    <label className="block text-xs font-bold text-[#27221F] uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Select Time Slot *
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {TIME_SLOTS.map((time) => {
                        const isSelected = formData.timeSlot === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, timeSlot: time })
                            }
                            className={`py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                              isSelected
                                ? "bg-[#6E9B49] text-white border-[#6E9B49] shadow-xs"
                                : "bg-white text-stone-700 border-stone-200 hover:border-stone-300"
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Preferred Doctor */}
                  <div>
                    <label className="block text-xs font-bold text-[#27221F] uppercase tracking-wider mb-2">
                      Preferred Veterinarian
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {DOCTORS_LIST.map((doc) => {
                        const isSelected = formData.doctorId === doc.id;
                        return (
                          <button
                            key={doc.id}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, doctorId: doc.id })
                            }
                            className={`p-3 rounded-xl border text-left transition cursor-pointer flex items-center gap-3 ${
                              isSelected
                                ? "border-[#6E9B49] bg-[#E7F5E4]"
                                : "border-stone-200 bg-white hover:border-stone-300"
                            }`}
                          >
                            <div className="w-8 h-8 rounded-full bg-[#27221F] text-white flex items-center justify-center font-bold text-xs">
                              {doc.name.charAt(3)}
                            </div>
                            <div className="overflow-hidden">
                              <p className="text-xs font-bold text-[#27221F] truncate">
                                {doc.name}
                              </p>
                              <p className="text-[11px] text-stone-500 truncate">
                                {doc.role}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: OWNER INFO & SUMMARY */}
              {step === 4 && (
                <div className="space-y-4">
                  {/* Mini summary badge */}
                  <div className="bg-[#f6efe4] p-4 rounded-2xl border border-[#e4d7c6] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#6E9B49] uppercase tracking-wider">
                        {selectedService.title} • {formData.petName}
                      </span>
                      <p className="text-sm font-extrabold text-[#27221F]">
                        {formData.appointmentDate} at {formData.timeSlot}
                      </p>
                    </div>
                    <span className="text-lg font-extrabold text-[#27221F]">
                      {selectedService.price}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    Owner Contact Information
                  </p>

                  <div>
                    <label className="block text-xs font-bold text-[#27221F] uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.ownerName}
                        onChange={(e) =>
                          setFormData({ ...formData, ownerName: e.target.value })
                        }
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none ${
                          formErrors.ownerName
                            ? "border-red-500 bg-red-50"
                            : "border-stone-300 focus:border-[#6E9B49]"
                        }`}
                      />
                    </div>
                    {formErrors.ownerName && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.ownerName}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#27221F] uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          placeholder="e.g. +1 555-0199"
                          value={formData.ownerPhone}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              ownerPhone: e.target.value,
                            })
                          }
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none ${
                            formErrors.ownerPhone
                              ? "border-red-500 bg-red-50"
                              : "border-stone-300 focus:border-[#6E9B49]"
                          }`}
                        />
                      </div>
                      {formErrors.ownerPhone && (
                        <p className="text-red-500 text-xs mt-1">
                          {formErrors.ownerPhone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#27221F] uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          placeholder="john@example.com"
                          value={formData.ownerEmail}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              ownerEmail: e.target.value,
                            })
                          }
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none ${
                            formErrors.ownerEmail
                              ? "border-red-500 bg-red-50"
                              : "border-stone-300 focus:border-[#6E9B49]"
                          }`}
                        />
                      </div>
                      {formErrors.ownerEmail && (
                        <p className="text-red-500 text-xs mt-1">
                          {formErrors.ownerEmail}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-500 text-xs">
                    🛡️ No pre-payment required. You can pay securely at the clinic
                    or reschedule up to 2 hours before the visit.
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer Controls */}
        {!isSuccess && (
          <div className="bg-stone-50 px-6 py-4 border-t border-stone-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1.5 text-stone-700 hover:text-stone-900 font-bold text-xs uppercase tracking-wider px-3 py-2 rounded-lg hover:bg-stone-200 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-[#6E9B49] hover:bg-[#5b853b] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl flex items-center gap-2 transition cursor-pointer shadow-sm"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirmBooking}
                className="bg-[#6E9B49] hover:bg-[#5b853b] text-white font-extrabold text-xs uppercase tracking-wider px-7 py-3 rounded-xl flex items-center gap-2 transition cursor-pointer shadow-md"
              >
                Confirm Appointment <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingModal;
