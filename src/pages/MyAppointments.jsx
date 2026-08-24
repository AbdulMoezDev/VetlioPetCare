import React, { useState } from "react";
import {
  Calendar,
  User,
  Dog,
  Cat,
  Bird,
  CheckCircle2,
  XCircle,
  Plus,
  Phone,
  Mail,
  Trash2,
  ShieldCheck,
  Cloud,
  ArrowRight
} from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";

function MyAppointments() {
  const { appointments, cancelAppointment, openBooking } = useBooking();
  const { user, openAuthModal } = useAuth();
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = appointments.filter((app) => {
    if (filterStatus === "all") return true;
    return app.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const getPetIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "cat":
        return Cat;
      case "bird":
        return Bird;
      default:
        return Dog;
    }
  };

  return (
    <div className="bg-[#f6efe4] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-[#70A352] uppercase tracking-widest bg-white/80 px-4 py-1.5 rounded-full border border-[#ebdcc9] inline-block shadow-2xs">
                Pet Parent Portal
              </span>
              {user ? (
                <span className="text-[11px] font-bold text-[#70A352] bg-[#E7F5E4] px-3 py-1 rounded-full border border-[#70A352]/30 flex items-center gap-1">
                  <Cloud className="w-3 h-3" /> Cloud Synced
                </span>
              ) : (
                <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                  Guest Storage (Local)
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#27221F] uppercase tracking-tight">
              My Appointments & Care Visits
            </h1>
            <p className="text-stone-600 text-sm sm:text-base mt-2 font-medium">
              Review upcoming veterinary consultations, grooming appointments, and medical visits.
            </p>
          </div>

          <button
            onClick={() => openBooking()}
            className="bg-[#70A352] hover:bg-[#5b8c3d] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-2xl shadow-sm transition flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Book New Appointment
          </button>
        </div>

        {/* Guest Mode Callout Banner */}
        {!user && (
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-amber-200 bg-amber-50/40 shadow-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-[#27221F] uppercase">
                  Want to access your appointments anywhere?
                </h4>
                <p className="text-xs text-stone-600 font-medium mt-0.5">
                  Sign in or create a free account to automatically back up your pet records to the Supabase cloud database.
                </p>
              </div>
            </div>

            <button
              onClick={() => openAuthModal("signup")}
              className="bg-[#27221F] hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition cursor-pointer shrink-0 flex items-center gap-1.5"
            >
              Sign Up / Log In <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-8">
          {[
            { id: "all", label: `All (${appointments.length})` },
            {
              id: "confirmed",
              label: `Active / Confirmed (${
                appointments.filter((a) => a.status === "Confirmed").length
              })`
            },
            {
              id: "cancelled",
              label: `Cancelled (${
                appointments.filter((a) => a.status === "Cancelled").length
              })`
            }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filterStatus === tab.id
                  ? "bg-[#27221F] text-white shadow-xs"
                  : "bg-white text-stone-600 hover:bg-stone-100 border border-[#ebdcc9]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* List of Appointments */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#ebdcc9] shadow-sm max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#f6efe4] text-stone-400 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#27221F] uppercase mb-2">
              No Appointments Found
            </h3>
            <p className="text-stone-600 text-sm mb-6 max-w-md mx-auto">
              You do not have any scheduled appointments under this filter. Book a visit for your pet today!
            </p>
            <button
              onClick={() => openBooking()}
              className="bg-[#70A352] hover:bg-[#5b8c3d] text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-md transition cursor-pointer"
            >
              Book an Appointment
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((app) => {
              const PetIcon = getPetIcon(app.petType);
              const isConfirmed = app.status === "Confirmed";

              return (
                <div
                  key={app.id}
                  className={`bg-white rounded-3xl border p-6 sm:p-7 shadow-xs flex flex-col justify-between transition-all ${
                    isConfirmed
                      ? "border-[#ebdcc9] hover:shadow-md"
                      : "border-stone-200 opacity-75 bg-stone-50/70"
                  }`}
                >
                  <div>
                    {/* Top Row: Ref ID & Status */}
                    <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                      <span className="text-xs font-black text-stone-700 bg-stone-100 px-3 py-1 rounded-full uppercase tracking-wider">
                        {app.id}
                      </span>
                      <span
                        className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 ${
                          isConfirmed
                            ? "bg-[#E7F5E4] text-[#70A352]"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {isConfirmed ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5" />
                        )}
                        {app.status}
                      </span>
                    </div>

                    {/* Pet & Service Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#70A352]/15 text-[#70A352] flex items-center justify-center shrink-0">
                        <PetIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xl text-[#27221F] tracking-tight leading-tight">
                          {app.petName}
                        </h4>
                        <p className="text-xs font-semibold text-stone-500 uppercase">
                          {app.petType} {app.petBreed ? `• ${app.petBreed}` : ""}
                        </p>
                      </div>
                    </div>

                    {/* Service & Doctor details */}
                    <div className="space-y-2 bg-[#f6efe4]/50 p-4 rounded-2xl border border-[#ebdcc9]/60 text-xs text-[#27221F] mb-4">
                      <div className="flex justify-between">
                        <span className="text-stone-500 font-semibold">Service:</span>
                        <span className="font-bold">{app.serviceTitle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500 font-semibold">Doctor:</span>
                        <span className="font-bold">{app.doctorName || "Assigned Specialist"}</span>
                      </div>
                      <div className="flex justify-between border-t border-[#ebdcc9]/50 pt-2 text-[#70A352]">
                        <span className="font-bold">Date & Time:</span>
                        <span className="font-extrabold">
                          {app.date} @ {app.time}
                        </span>
                      </div>
                    </div>

                    {/* Owner Contact */}
                    <div className="text-xs text-stone-600 space-y-1 mb-4">
                      <p className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-stone-400" />
                        <span className="font-semibold">{app.ownerName}</span>
                      </p>
                      {app.ownerPhone && (
                        <p className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-stone-400" />
                          <span>{app.ownerPhone}</span>
                        </p>
                      )}
                      {app.ownerEmail && (
                        <p className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-stone-400" />
                          <span>{app.ownerEmail}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    {isConfirmed ? (
                      <button
                        onClick={() => cancelAppointment(app.id)}
                        className="text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Cancel Visit
                      </button>
                    ) : (
                      <span className="text-xs text-stone-400 font-medium italic">
                        Cancelled
                      </span>
                    )}

                    <button
                      onClick={() => openBooking(app.serviceId)}
                      className="text-xs font-bold text-[#70A352] hover:underline uppercase tracking-wider cursor-pointer"
                    >
                      Book Again &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAppointments;
