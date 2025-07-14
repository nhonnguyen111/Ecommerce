import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminLoginRoute = ({ children }) => {
  const { status } = useSelector((state) => state.status);

  if (status) return <Navigate to="/admin" replace />;

  return children;
};

export default AdminLoginRoute;
