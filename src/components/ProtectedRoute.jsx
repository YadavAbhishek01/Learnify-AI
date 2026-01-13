// src/components/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Authcontext } from "../context/Authcontext";
import AppLayout from "./AppLayout";

export const ProtectedRoute = () => {
  const { token, authUser, loading } = useContext(Authcontext);

  // Show loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
  <div className="flex flex-col items-center gap-4">
    <div className="relative">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-100 border-t-green-500"></div>
      <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-green-50 animate-ping"></div>
    </div>
    <div className="text-center">
      <p className="text-lg font-semibold text-gray-700">
        Loading...
      </p>
      <p className="text-sm text-gray-500">
        Please wait a moment
      </p>
    </div>
  </div>
</div>
    );
  }

  // If no token or user, redirect to login
  if (!token || !authUser) {
    return <Navigate to="/login" replace />;
  }

  // ✅ FIXED: Return Outlet for nested routes
  return (
  <AppLayout>
    <Outlet />
  </AppLayout>
);

};
