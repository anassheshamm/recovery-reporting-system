import { Routes, Route } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/auth/register";

import AdminLayout from "../features/Admin/layouts/AdminLayout";
import DoctorsPage from "../features/Admin/pages/Doctors/DoctorsPage";
import PatientsPage from "../features/Admin/pages/patients/PatientsPage";
import HeadsPage from "../features/Admin/pages/Heads/HeadsPage"; 
import LoginPage from "../pages/auth/LoginPage"
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import Doctorpage from "../features/Doctor/Doctorpage";
import CreatePatientPage from "../features/Doctor/CreatePatientPage";
import DoctorLayout from "../features/Doctor/DoctorLayout";
import PatientProfilePage from "../features/Doctor/PatientProfilePage";


export default function AppRouter() {
  return (
    <Routes>
      {/* Authentication */}
      <Route element={<AuthLayout />}>
        <Route path="/register" element={<Register />} />
   <Route path="/login" element={<LoginPage />} />
<Route path="/forgot-password" element={<ForgotPasswordPage />} />
<Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="doctors" element={<DoctorsPage />} />
        <Route path="patients" element={<PatientsPage />} />
        <Route path="heads" element={<HeadsPage />} />
      
      </Route>
            
<Route path="/doctor" element={<DoctorLayout />}>
  <Route index element={<DoctorsPage />} />   // optional
  <Route path="new" element={<CreatePatientPage />} />
  <Route path="patients" element={<PatientProfilePage />} />
</Route>

    </Routes>
  );
}