import { Navigate, Outlet } from "react-router";
import Header from "../components/nav/Header";
import { ProfileProvider, useProfile } from "../context/ProfileContext";
import { Loader } from "lucide-react";

// Inner component that uses the context
const DashboardContent = () => {
  const { profile, isLoading } = useProfile();
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader className="animate-spin h-8 w-8 text-blue-500 mb-2" />
        <p className="text-gray-600">Loading your profile...</p>
      </div>
    );
  }
  
  if (!profile) {
    return <Navigate to="/authentication" replace />;
  }
  
  return (
    <div className="min-h-screen xl:flex">
      <div className="flex-1 transition-all duration-300 ease-in-out">
        <Header />
        <div className="px-10 mx-auto w-7/8 mt-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// Outer component that provides the context
const DashboardLayout = () => {
  return (
    <ProfileProvider>
      <DashboardContent />
    </ProfileProvider>
  );
};

export default DashboardLayout;