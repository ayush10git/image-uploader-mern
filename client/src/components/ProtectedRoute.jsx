import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element, ...rest }) => {
  const { user, loading } = useSelector((state) => state.userReducer);

  return (
    <Route
      {...rest}
      element={!loading && user ? <Navigate to="/feed" /> : element}
    />
  );
};

export default ProtectedRoute;
