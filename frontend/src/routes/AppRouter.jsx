import { Routes, Route } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";

import Register from "../pages/auth/register";
import LoginPage from "../pages/auth/LoginPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";

import AdminLayout from "../features/Admin/layouts/AdminLayout";
import DoctorsadminPage from "../features/Admin/pages/Doctors/DoctorsadminPage";
import PatientsPage from "../features/Admin/pages/patients/PatientsPage";
import HeadsPage from "../features/Admin/pages/Heads/HeadsPage";

import DoctorLayout from "../features/Doctor/doctorlayout";
import CreatePatientPage from "../features/Doctor/CreatePatientPage";
import PatientProfilePage from "../features/Doctor/PatientProfilePage";
import BeneficiaryReportPage from "../features/reports/BeneficiaryReportPage";
import DoctorsPage from "../features/Doctor/Doctorpage";
import ReportPreviewPage from "../features/reports/ReportPreviewPage";
import SecondaryReport from "../features/reports/PostReportPage";
import PostReportPage from "../features/reports/PostReportPage";

export default function AppRouter() {
  return (
    <Routes>
      {/* ================= Authentication ================= */}
<Route
          path="*"
          element={<LoginPage />}
        />
      <Route element={<AuthLayout />}>
        <Route
          path="/register"
          element={<Register />}
        />

        

        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPasswordPage />}
        />
      </Route>

      {/* ================= Admin ================= */}

      <Route
        path="/admin/dashboard"
        element={<AdminLayout />}
      >
        <Route
          path="doctors"
          element={<DoctorsadminPage />}
        />

        <Route
          path="patients"
          element={<PatientsPage />}
        />

        <Route
          path="heads"
          element={<HeadsPage />}
        />
      </Route>

      {/* ================= Doctor ================= */}

      <Route
        path="/doctor"
        element={<DoctorLayout />}
      >
        {/* Dashboard */}

        <Route
          index
          element={<DoctorsPage />}
        />

        {/* Create Patient */}

        <Route
          path="new"
          element={<CreatePatientPage />}
        />

        {/* Patient Profile */}

        <Route
          path="patient/:patientId"
          element={<PatientProfilePage />}
        />

        {/* Beneficiary Report */}

        <Route
          path="reports/beneficiary/:patientId"
          element={<BeneficiaryReportPage />}
        />

        {/* Secondary Report */}

        <Route
          path="reports/secondary/:patientId"
          element={<PostReportPage />}
        />
      </Route>

      <Route
        path="/doctor/pre-reports/:reportId"
        element={<ReportPreviewPage />}
      />
    </Routes>
  );
}