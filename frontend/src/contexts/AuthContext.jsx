import { createContext, useContext, useState, useEffect } from 'react';
import { 
  GoogleAuthProvider, 
  signInWithPopup,
  onAuthStateChanged, 
  signOut
} from 'firebase/auth';
import { auth } from '../services/firebase';

const AuthContext = createContext(null);

// Helper function to get a higher resolution profile image
const getHighResProfilePicture = (photoURL) => {
  if (!photoURL) return null;
  
  // For Google profile pictures, replace the default size parameter
  if (photoURL.includes('googleusercontent.com')) {
    // Replace s96-c with s400-c to get a higher resolution image
    return photoURL.replace(/=s\d+-c/, '=s400-c');
  }
  
  return photoURL;
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Setup auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Enhance the user object with a higher resolution profile picture
        const enhancedUser = {
          ...user,
          photoURL: getHighResProfilePicture(user.photoURL)
        };
        setCurrentUser(enhancedUser);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Sign in with Google popup
  const signInWithGoogle = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      
      // Using basic signInWithPopup without custom options to avoid internal errors
      const result = await signInWithPopup(auth, provider);
      
      // Enhance the user object with a higher resolution profile picture
      const enhancedUser = {
        ...result.user,
        photoURL: getHighResProfilePicture(result.user.photoURL)
      };
      
      return enhancedUser;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError(error.message);
      return null;
    }
  };

  // Sign out
  const logout = async () => {
    setError(null);
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      setError(error.message);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    isRedirecting,
    signInWithGoogle,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 