import React from "react";
import { Navigate } from "react-router-dom";
import { getToken, getRole } from "../api/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = getToken();
  const role = getRole();

  if (!token) return <Navigate to="/login" replace />;

  if (!role || !allowedRoles.includes(role)) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
