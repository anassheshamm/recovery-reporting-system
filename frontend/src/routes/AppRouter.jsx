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
import PostReport from "../features/reports/postReportPreview";
import PostReportPage from "../features/reports/PostReportPage";
import TeamLeaderLayout from "../features/TeamLeader/TeamLeaderLayout";
import PendingReportsPage from "../features/TeamLeader/PendingReportsPage";
import TeamDoctorsPage from "../features/TeamLeader/TeamDoctorsPage";
import TeamPatientsPage from "../features/TeamLeader/TeamPatientsPage";
 

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";


export default function AppRouter() {
  return (
    <Routes>
      {/* ================= Authentication ================= */}
<Route
          path="*"
          element={
            <PublicRoute>
          <LoginPage />
            </PublicRoute>}
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
  path="/admin"
  element={
    <ProtectedRoute roles={["admin"]}>
      <AdminLayout />
    </ProtectedRoute>
  }
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
  element={
    <ProtectedRoute roles={["doctor"]}>
      <DoctorLayout />
    </ProtectedRoute>
  }
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
  element={
    <ProtectedRoute roles={["doctor"]}>
      <ReportPreviewPage />
    </ProtectedRoute>
  }
/>
      <Route
  path="/doctor/post-reports/:reportId"
  element={
    <ProtectedRoute roles={["doctor"]}>
      <PostReport />
    </ProtectedRoute>
  }
/>

     {/* ================= Team Leader (WITH Sidebar) ================= */}
      <Route
  path="/team-leader"
  element={
    <ProtectedRoute roles={["teamLeader"]}>
      <TeamLeaderLayout />
    </ProtectedRoute>
  }
>
        <Route index element={<PendingReportsPage />} />
        
        {/* New Team Leader Dashboard Routes */}
        <Route path="doctors" element={<TeamDoctorsPage />} />
        <Route path="patients" element={<TeamPatientsPage />} />
        <Route path="patient/:patientId" element={<PatientProfilePage />} />
      </Route>

      {/* ================= Team Leader (WITHOUT Sidebar - Previews) ================= */}
      {/* Reusing the exact same preview components you built for the doctor! */}
      <Route
  path="/team-leader/pre-reports/:reportId"
  element={
    <ProtectedRoute roles={["teamLeader"]}>
      <ReportPreviewPage />
    </ProtectedRoute>
  }
/>
      <Route
  path="/team-leader/post-reports/:reportId"
  element={
    <ProtectedRoute roles={["teamLeader"]}>
      <PostReport />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
}