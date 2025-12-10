
import React from "react";
import { Route, Routes } from "react-router-dom";

import LandingPage from "../components/LandingPage/LandingPage";
import QuienesSomos from "../components/LandingPage/QuienesSomos";
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import SignOut from "../components/SignOut";
import ProtectedRoute from "../components/ProtectedRoute";

import TurnoForm from "../features/turno/pages/TurnoForm";
import AdminTurnos from "../features/admin/pages/AdminTurnos";
import NoMatch from "../components/NoMatch";
import FooterInfo from "../components/LandingPage/FooterInfo";

const Router = () => {
  return (
    <>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Logout: solo para usuarios logueados (podés agregar ProtectedRoute si querés) */}
        <Route
          path="/signout"
          element={
            <ProtectedRoute>
              <SignOut />
            </ProtectedRoute>
          }
        />

        {/* Rutas protegidas */}
        <Route
          path="/turno"
          element={
            <ProtectedRoute>
              <TurnoForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminTurnos />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NoMatch />} />
      </Routes>
      <FooterInfo />
    </>
  );
};

export default Router;




