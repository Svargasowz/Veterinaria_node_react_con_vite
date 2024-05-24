// src/components/ProtectedRoute.jsx
import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Swal from "sweetalert2";

function ProtectedRoute() {
  const auth = window.localStorage.getItem("token");

  useEffect(() => {
    if (!auth) {
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        timer: 3000,
        showConfirmButton: false,
        text: 'Debes iniciar sesión para acceder a esta página.',
        backdrop: `
        rgba(255, 0, 0, 0.4)
        left top
        no-repeat
      `
      });
    }
  }, [auth]);

  return auth ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
