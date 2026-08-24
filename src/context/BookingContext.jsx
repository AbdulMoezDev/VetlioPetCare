import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const { user } = useAuth();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "success", isVisible: false });

  // Clear legacy mock seed if found in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("vetlio_appointments");
      if (saved && saved.includes("VET-92814")) {
        localStorage.removeItem("vetlio_appointments");
      }
    } catch (e) {
      console.warn(e);
    }
  }, []);

  // Guest mode uses temporary session storage (runtime only); Signed-in users use database
  const [appointments, setAppointments] = useState(() => {
    try {
      // Check session storage for temporary active tab guest appointments
      const sessionSaved = sessionStorage.getItem("vetlio_guest_appointments");
      if (sessionSaved) {
        return JSON.parse(sessionSaved);
      }
    } catch (e) {
      console.warn(e);
    }
    return [];
  });

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 4000);
  }, []);

  // Load appointments: from Supabase if logged in, otherwise runtime session for guests
  const loadUserAppointments = useCallback(async () => {
    if (!user) {
      // Guest mode: runtime session only
      try {
        const sessionSaved = sessionStorage.getItem("vetlio_guest_appointments");
        if (sessionSaved) {
          setAppointments(JSON.parse(sessionSaved));
        } else {
          setAppointments([]);
        }
      } catch (e) {
        console.warn(e);
        setAppointments([]);
      }
      return;
    }

    // Authenticated user with real Supabase
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("appointments")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (!error && data) {
          const formatted = data.map((d) => ({
            id: d.id,
            serviceId: d.service_id,
            serviceTitle: d.service_title,
            doctorName: d.doctor_name,
            petName: d.pet_name,
            petType: d.pet_type,
            petBreed: d.pet_breed,
            petAge: d.pet_age,
            ownerName: d.owner_name,
            ownerEmail: d.owner_email,
            ownerPhone: d.owner_phone,
            date: d.appointment_date,
            time: d.time_slot,
            status: d.status,
            createdAt: d.created_at,
            notes: d.notes,
          }));

          // If guest had runtime appointments in session, sync them to user's cloud account
          try {
            const guestSaved = sessionStorage.getItem("vetlio_guest_appointments");
            if (guestSaved) {
              const guestList = JSON.parse(guestSaved);
              const toSync = guestList.filter(
                (g) => !formatted.some((f) => f.id === g.id)
              );

              if (toSync.length > 0) {
                const rowsToInsert = toSync.map((g) => ({
                  id: g.id,
                  user_id: user.id,
                  service_id: g.serviceId,
                  service_title: g.serviceTitle,
                  doctor_name: g.doctorName,
                  pet_name: g.petName,
                  pet_type: g.petType,
                  pet_breed: g.petBreed,
                  pet_age: g.petAge,
                  owner_name: g.ownerName,
                  owner_email: g.ownerEmail,
                  owner_phone: g.ownerPhone,
                  appointment_date: g.date,
                  time_slot: g.time,
                  status: g.status || "Confirmed",
                  notes: g.notes,
                }));

                await supabase.from("appointments").insert(rowsToInsert);
                formatted.unshift(...toSync);
                sessionStorage.removeItem("vetlio_guest_appointments");
                showToast("Saved your active appointments to your account!", "success");
              }
            }
          } catch (e) {
            console.warn("Sync error:", e);
          }

          setAppointments(formatted);
        }
      } catch (err) {
        console.warn("Could not load cloud appointments:", err);
      }
    } else {
      // Demo signed-in user persistence (mock database per user)
      try {
        const userSaved = localStorage.getItem(`vetlio_user_${user.id}_appointments`);
        if (userSaved) {
          setAppointments(JSON.parse(userSaved));
        } else {
          setAppointments([]);
        }
      } catch (e) {
        console.warn(e);
      }
    }
  }, [user, showToast]);

  useEffect(() => {
    loadUserAppointments();
  }, [loadUserAppointments]);

  // Save appointments to runtime session (guests) or user store (logged in)
  useEffect(() => {
    if (!user) {
      // Guest: runtime session only
      try {
        sessionStorage.setItem("vetlio_guest_appointments", JSON.stringify(appointments));
      } catch (e) {
        console.warn(e);
      }
    } else if (!isSupabaseConfigured || !supabase) {
      // Demo logged-in user store
      try {
        localStorage.setItem(`vetlio_user_${user.id}_appointments`, JSON.stringify(appointments));
      } catch (e) {
        console.warn(e);
      }
    }
  }, [appointments, user]);

  const openBooking = (serviceId = null) => {
    if (serviceId) {
      setPreselectedServiceId(serviceId);
    }
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setPreselectedServiceId(null);
  };

  const addAppointment = async (data) => {
    const randomCode = "VET-" + Math.floor(10000 + Math.random() * 90000);
    const newAppointment = {
      id: randomCode,
      ...data,
      status: "Confirmed",
      createdAt: new Date().toISOString()
    };

    // If logged in to Supabase, push permanently to cloud
    if (user && isSupabaseConfigured && supabase) {
      try {
        await supabase.from("appointments").insert({
          id: randomCode,
          user_id: user.id,
          service_id: data.serviceId,
          service_title: data.serviceTitle,
          doctor_name: data.doctorName,
          pet_name: data.petName,
          pet_type: data.petType,
          pet_breed: data.petBreed,
          pet_age: data.petAge,
          owner_name: data.ownerName,
          owner_email: data.ownerEmail,
          owner_phone: data.ownerPhone,
          appointment_date: data.date,
          time_slot: data.time,
          status: "Confirmed",
          notes: data.notes,
        });
      } catch (err) {
        console.warn("Could not save to cloud DB:", err);
      }
    }

    setAppointments((prev) => [newAppointment, ...prev]);
    showToast(`Appointment booked successfully! Ref: ${randomCode}`, "success");
    return newAppointment;
  };

  const cancelAppointment = async (appointmentId) => {
    // If logged in to Supabase, update cloud status
    if (user && isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from("appointments")
          .update({ status: "Cancelled" })
          .eq("id", appointmentId);
      } catch (err) {
        console.warn("Could not cancel on cloud DB:", err);
      }
    }

    setAppointments((prev) =>
      prev.map((app) =>
        app.id === appointmentId ? { ...app, status: "Cancelled" } : app
      )
    );
    showToast(`Appointment ${appointmentId} has been cancelled.`, "info");
  };

  return (
    <BookingContext.Provider
      value={{
        isBookingOpen,
        preselectedServiceId,
        openBooking,
        closeBooking,
        appointments,
        addAppointment,
        cancelAppointment,
        toast,
        showToast
      }}
    >
      {children}
      {/* Global Toast Notification */}
      {toast.isVisible && (
        <div className="fixed bottom-6 right-6 z-50 animate-modal-in">
          <div
            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border text-sm font-bold tracking-wide ${
              toast.type === "success"
                ? "bg-[#27221F] text-white border-[#70A352]"
                : toast.type === "info"
                ? "bg-[#27221F] text-stone-200 border-sky-400"
                : "bg-red-950 text-white border-red-500"
            }`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                toast.type === "success"
                  ? "bg-[#70A352] animate-pulse"
                  : toast.type === "info"
                  ? "bg-sky-400"
                  : "bg-red-400"
              }`}
            />
            {toast.message}
          </div>
        </div>
      )}
    </BookingContext.Provider>
  );
}

// oxlint-disable-next-line react/only-export-components
export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
