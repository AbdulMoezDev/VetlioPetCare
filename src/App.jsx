import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";
import MainLayout from "./layouts/MainLayout";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import HowItWorksPage from "./pages/HowItWorksPage";
import Contact from "./pages/Contact";
import MyAppointments from "./pages/MyAppointments";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="services/:serviceId" element={<ServiceDetail />} />
              <Route path="how-it-works" element={<HowItWorksPage />} />
              <Route path="contact" element={<Contact />} />
              <Route path="my-appointments" element={<MyAppointments />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;