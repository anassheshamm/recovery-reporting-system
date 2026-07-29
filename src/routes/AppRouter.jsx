import { Routes, Route } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/auth/register";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route
          path="/"
          element={<Register />}
        />
      </Route>
    </Routes>
  );
}