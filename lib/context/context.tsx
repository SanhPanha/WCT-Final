'use client';
import React, { useContext, useState, useEffect, ReactNode } from "react";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase/firebaseConfiguration";
import type { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const Loading = dynamic(() => import("@/app/loading"));

interface AuthContextType {
  userLoggedIn: boolean;
  isEmailUser: boolean;
  isGoogleUser: boolean;
  isFacebookUser: boolean;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: (redirectTo?: string) => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [isFacebookUser, setIsFacebookUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      try {
        if (user) {
          setCurrentUser(user);
          setIsEmailUser(
            user.providerData.some(
              (provider) => provider.providerId === "password"
            )
          );
          setIsGoogleUser(
            user.providerData.some(
              (provider) =>
                provider.providerId === GoogleAuthProvider.PROVIDER_ID
            )
          );
          setIsFacebookUser(
            user.providerData.some(
              (provider) =>
                provider.providerId === FacebookAuthProvider.PROVIDER_ID
            )
          );
          setUserLoggedIn(true);
        } else {
          setCurrentUser(null);
          setUserLoggedIn(false);
          setIsEmailUser(false);
          setIsGoogleUser(false);
          setIsFacebookUser(false);
        }
      } catch (error) {
        console.error("Error handling auth state change:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async (redirectTo = "/") => {
    try {
      await auth.signOut();
      setCurrentUser(null);
      setUserLoggedIn(false);
      setIsEmailUser(false);
      setIsGoogleUser(false);
      setIsFacebookUser(false);
      router.push(redirectTo);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const value: AuthContextType = {
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    isFacebookUser,
    currentUser,
    setCurrentUser,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <Loading />}
    </AuthContext.Provider>
  );
}
