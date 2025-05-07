import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile
} from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from './config';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Upload profile image to Firebase Storage
  async function uploadProfileImage(image, userId) {
    try {
      // Convert URI to blob
      const response = await fetch(image);
      const blob = await response.blob();
      
      // Create a reference to the storage location
      const storageRef = ref(storage, `profileImages/${userId}`);
      
      // Upload the blob
      await uploadBytes(storageRef, blob);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw error;
    }
  }

  // Register a new user
  async function register(email, password, name, profileImage = null) {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // If profile image exists, upload it
      let photoURL = null;
      if (profileImage) {
        photoURL = await uploadProfileImage(profileImage, user.uid);
      }
      
      // Update user profile with name and photo URL
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL
      });
      
      return user;
    } catch (error) {
      console.error("Error registering user: ", error);
      throw error;
    }
  }

  // Login user
  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error logging in: ", error);
      throw error;
    }
  }

  // Logout user
  async function logout() {
    return signOut(auth);
  }

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    register,
    login,
    logout,
    uploadProfileImage
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}