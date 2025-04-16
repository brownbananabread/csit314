// ProfileContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAlert } from './AlertContext';
import { fetchRequest } from '../utils/fetchRequest';

interface Profile {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  serviceOffered: string;
}

interface ProfileContextType {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showAlert } = useAlert();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getProfile = async () => {
    try {
      setIsLoading(true);
      const { status, body} = await fetchRequest({
        method: 'GET',
        url: 'http://localhost:5174/api/profile',
      });
      console.log(status, body);

      if (status !== 200) {
        throw new Error("Failed to fetch profile.");
      }

      setProfile(body);
      console.log("Profile fetched successfully:", body);
      setError(null);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Failed to fetch profile.");
      showAlert("User logged out!", "To access your account please sign in.", "info", true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, isLoading, error, refreshProfile: getProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfile must be used within a ProfileProvider');
  return context;
};
