import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, signInWithGoogle, signInWithEmail, signUpWithEmail, logOut } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  loading: boolean;
  userSignInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  userSignInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  userSignUpWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  userSignOut: () => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAdmin: false,
  loading: true,
  userSignInWithGoogle: async () => ({ success: false, error: "Not implemented" }),
  userSignInWithEmail: async () => ({ success: false, error: "Not implemented" }),
  userSignUpWithEmail: async () => ({ success: false, error: "Not implemented" }),
  userSignOut: async () => ({ success: false, error: "Not implemented" }),
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  
  // List of admin emails
  const adminEmails = [
    "admin@example.com",
    // Add more admin emails here
  ];
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAdmin(user ? adminEmails.includes(user.email || "") : false);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Sign in with Google
  const userSignInWithGoogle = async () => {
    const result = await signInWithGoogle();
    if (!result.success && result.error) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: result.error,
      });
    }
    return result;
  };

  // Sign in with email/password
  const userSignInWithEmail = async (email: string, password: string) => {
    const result = await signInWithEmail(email, password);
    if (!result.success && result.error) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: result.error,
      });
    }
    return result;
  };

  // Sign up with email/password
  const userSignUpWithEmail = async (email: string, password: string) => {
    const result = await signUpWithEmail(email, password);
    if (!result.success && result.error) {
      toast({
        variant: "destructive",
        title: "Registration Error",
        description: result.error,
      });
    }
    return result;
  };

  // Sign out
  const userSignOut = async () => {
    const result = await logOut();
    if (!result.success && result.error) {
      toast({
        variant: "destructive",
        title: "Sign Out Error",
        description: result.error,
      });
    }
    return result;
  };

  const value = {
    currentUser,
    isAdmin,
    loading,
    userSignInWithGoogle,
    userSignInWithEmail,
    userSignUpWithEmail,
    userSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}