import React, { useState, useEffect } from "react";
import {
  X,
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Heart
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

// Official Google G Icon
const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

function AuthModal() {
  const {
    isAuthModalOpen,
    authModalMode,
    closeAuthModal,
    signInWithEmail,
    signInWithGoogle,
    signUpWithEmail,
  } = useAuth();

  const [mode, setMode] = useState("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  useEffect(() => {
    if (authModalMode) {
      setMode(authModalMode);
    }
    setErrorMsg("");
    setSuccessMsg("");
  }, [authModalMode, isAuthModalOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  // Lock body scroll
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleGoogleLogin = async () => {
    setErrorMsg("");
    setIsGoogleSubmitting(true);
    const { error } = await signInWithGoogle();
    setIsGoogleSubmitting(false);
    if (error) {
      setErrorMsg(error.message || "Failed to sign in with Google.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (mode === "signup") {
      if (!fullName.trim()) {
        setErrorMsg("Please enter your full name.");
        return;
      }
      if (password.length < 6) {
        setErrorMsg("Password must be at least 6 characters.");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg("Passwords do not match.");
        return;
      }

      setIsSubmitting(true);
      const { error } = await signUpWithEmail(
        email.trim(),
        password,
        fullName.trim(),
        phone.trim()
      );
      setIsSubmitting(false);

      if (error) {
        setErrorMsg(error.message || "Failed to create account.");
      } else {
        setSuccessMsg("Account created successfully! Welcome to Vetlio.");
      }
    } else {
      if (!email.trim() || !password) {
        setErrorMsg("Please enter both email and password.");
        return;
      }

      setIsSubmitting(true);
      const { error } = await signInWithEmail(email.trim(), password);
      setIsSubmitting(false);

      if (error) {
        setErrorMsg(error.message || "Invalid email or password.");
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-modal-in"
      onClick={closeAuthModal}
    >
      <div
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-[#ebdcc9] overflow-hidden relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-[#f6efe4] px-6 py-5 border-b border-[#ebdcc9] flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#70A352] text-white flex items-center justify-center">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-[#27221F] uppercase tracking-tight">
                {mode === "login" ? "Welcome Back" : "Join Vetlio Family"}
              </h3>
              <p className="text-[11px] text-stone-500 font-medium">
                {mode === "login"
                  ? "Access your saved pets & care history"
                  : "Create a pet parent account to save your records"}
              </p>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-2 rounded-xl bg-white hover:bg-stone-100 text-stone-600 transition shadow-2xs cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="p-2 bg-stone-100 mx-6 mt-6 rounded-2xl flex items-center gap-1 border border-stone-200">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setErrorMsg("");
              setSuccessMsg("");
            }}
            className={`flex-1 py-2 text-xs font-extrabold uppercase tracking-wider rounded-xl transition cursor-pointer ${
              mode === "login"
                ? "bg-white text-[#27221F] shadow-xs"
                : "text-stone-500 hover:text-[#27221F]"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setErrorMsg("");
              setSuccessMsg("");
            }}
            className={`flex-1 py-2 text-xs font-extrabold uppercase tracking-wider rounded-xl transition cursor-pointer ${
              mode === "signup"
                ? "bg-white text-[#27221F] shadow-xs"
                : "text-stone-500 hover:text-[#27221F]"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 text-[#70A352] text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleSubmitting}
            className="w-full bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition cursor-pointer shadow-2xs flex items-center justify-center gap-2 mb-4 hover:shadow-xs active:scale-98"
          >
            <GoogleIcon />
            <span>
              {isGoogleSubmitting ? "Connecting..." : "Continue with Google"}
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">
              Or with Email
            </span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-bold text-[#27221F] uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Jessica Miller"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-[#70A352] focus:bg-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#27221F] uppercase tracking-wider mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. jessica@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-[#70A352] focus:bg-white"
                />
              </div>
            </div>

            {mode === "signup" && (
              <div>
                <label className="block text-xs font-bold text-[#27221F] uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. (555) 234-5678"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-[#70A352] focus:bg-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#27221F] uppercase tracking-wider mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-[#70A352] focus:bg-white"
                />
              </div>
            </div>

            {mode === "signup" && (
              <div>
                <label className="block text-xs font-bold text-[#27221F] uppercase tracking-wider mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-[#70A352] focus:bg-white"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#70A352] hover:bg-[#5b8c3d] disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition cursor-pointer shadow-sm flex items-center justify-center gap-2 mt-4"
            >
              {isSubmitting
                ? "Processing..."
                : mode === "login"
                ? "Sign In to Account"
                : "Create Account"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Guest Dismiss Option */}
          <div className="mt-5 pt-4 border-t border-stone-100 flex flex-col items-center gap-2 text-center">
            <button
              type="button"
              onClick={closeAuthModal}
              className="text-xs font-bold text-stone-500 hover:text-[#27221F] uppercase tracking-wider underline transition cursor-pointer"
            >
              Continue Browsing as Guest &rarr;
            </button>

            <div className="flex items-center gap-1 text-[11px] text-stone-400 mt-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#70A352]" />
              <span>You can always book appointments without an account.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
