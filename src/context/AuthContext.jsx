import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login"); // 'login' | 'signup'

  // Fetch user profile from Supabase profiles table
  const fetchProfile = useCallback(async (userId, userEmail, userMeta = {}) => {
    if (!supabase || !userId) return;
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error && error.code !== "PGRST116") {
        console.warn("Could not fetch profile:", error.message);
      }

      if (data) {
        setProfile(data);
      } else {
        // Fallback profile if table not populated yet
        setProfile({
          id: userId,
          full_name: userMeta.full_name || userEmail?.split("@")[0] || "Pet Parent",
          phone: userMeta.phone || "",
        });
      }
    } catch (err) {
      console.warn("Profile fetch exception:", err);
    }
  }, []);

  // Initialize and listen to auth state changes
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      // Check for demo mock user in localStorage
      try {
        const savedMockUser = localStorage.getItem("vetlio_demo_user");
        if (savedMockUser) {
          const parsed = JSON.parse(savedMockUser);
          setUser(parsed);
          setProfile(parsed.profile);
        }
      } catch (e) {
        console.warn(e);
      }
      setIsLoading(false);
      return;
    }

    // Real Supabase session initialization
    try {
      localStorage.removeItem("vetlio_demo_user");
    } catch (e) {
      console.warn(e);
    }

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      if (currentSession?.user) {
        fetchProfile(
          currentSession.user.id,
          currentSession.user.email,
          currentSession.user.user_metadata
        );
      }
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      if (newSession?.user) {
        await fetchProfile(
          newSession.user.id,
          newSession.user.email,
          newSession.user.user_metadata
        );
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const openAuthModal = (mode = "login") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Sign In with Email & Password
  const signInWithEmail = async (email, password) => {
    if (!isSupabaseConfigured || !supabase) {
      // Demo mock login fallback
      const mockUser = {
        id: "demo-user-" + Date.now(),
        email,
        user_metadata: { full_name: email.split("@")[0] },
      };
      const mockProfile = {
        id: mockUser.id,
        full_name: email.split("@")[0],
        phone: "+1 (555) 019-2834",
      };
      setUser(mockUser);
      setProfile(mockProfile);
      localStorage.setItem(
        "vetlio_demo_user",
        JSON.stringify({ ...mockUser, profile: mockProfile })
      );
      closeAuthModal();
      return { data: { user: mockUser }, error: null };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      closeAuthModal();
    }
    return { data, error };
  };

  // Sign In with Google OAuth via Supabase
  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured || !supabase) {
      // Demo mock Google login fallback
      const mockUser = {
        id: "google-demo-user-" + Date.now(),
        email: "alex.turner@gmail.com",
        user_metadata: {
          full_name: "Alex Turner",
          avatar_url: "https://lh3.googleusercontent.com/a/default-user",
        },
      };
      const mockProfile = {
        id: mockUser.id,
        full_name: "Alex Turner",
        phone: "+1 (555) 019-2834",
      };
      setUser(mockUser);
      setProfile(mockProfile);
      localStorage.setItem(
        "vetlio_demo_user",
        JSON.stringify({ ...mockUser, profile: mockProfile })
      );
      closeAuthModal();
      return { data: { user: mockUser }, error: null };
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    return { data, error };
  };

  // Sign Up with Email, Password & Meta
  const signUpWithEmail = async (email, password, fullName, phone) => {
    if (!isSupabaseConfigured || !supabase) {
      // Demo mock signup fallback
      const mockUser = {
        id: "demo-user-" + Date.now(),
        email,
        user_metadata: { full_name: fullName, phone },
      };
      const mockProfile = {
        id: mockUser.id,
        full_name: fullName,
        phone,
      };
      setUser(mockUser);
      setProfile(mockProfile);
      localStorage.setItem(
        "vetlio_demo_user",
        JSON.stringify({ ...mockUser, profile: mockProfile })
      );
      closeAuthModal();
      return { data: { user: mockUser }, error: null };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
        },
      },
    });

    if (!error) {
      closeAuthModal();
    }
    return { data, error };
  };

  // Sign Out
  const signOut = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setUser(null);
      setProfile(null);
      setSession(null);
      localStorage.removeItem("vetlio_demo_user");
      return;
    }

    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isLoading,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        signInWithEmail,
        signInWithGoogle,
        signUpWithEmail,
        signOut,
        isSupabaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// oxlint-disable-next-line react/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
