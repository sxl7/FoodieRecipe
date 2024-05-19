import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const ProtectedRoute = () => {
  const { auth } = useAuth();
  return auth?.accessToken ? <Outlet /> : <Navigate to="/home" />
};

export default ProtectedRoute;
