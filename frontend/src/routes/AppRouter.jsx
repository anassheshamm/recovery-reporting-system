import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../features/Admin/layouts/AdminLayout";
import DoctorLayout from "../features/Doctor/doctorlayout";
import TeamLeaderLayout from "../features/TeamLeader/TeamLeaderLayout";

// Auth Pages
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/register";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";

// Admin Pages
import PatientsPage from "../features/Admin/pages/patients/PatientsPage";
import DoctorsAdminPage from "../features/Admin/pages/Doctors/DoctorsadminPage";
import HeadsPage from "../features/Admin/pages/Heads/HeadsPage";

// Doctor Pages
import DoctorPage from "../features/Doctor/Doctorpage";
import CreatePatientPage from "../features/Doctor/CreatePatientPage";
import PatientProfilePage from "../features/Doctor/PatientProfilePage"; // Reused for Admin

// Team Leader Pages
import TeamPatientsPage from "../features/TeamLeader/TeamPatientsPage";
import TeamDoctorsPage from "../features/TeamLeader/TeamDoctorsPage";
import PendingReportsPage from "../features/TeamLeader/PendingReportsPage";

// Reports Pages
import BeneficiaryReportPage from "../features/reports/BeneficiaryReportPage";
import PostReportPage from "../features/reports/PostReportPage";
import ReportPreviewPage from "../features/reports/ReportPreviewPage";
import PostReportPreview from "../features/reports/postReportPreview";

// Protection wrappers
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Routes (Auth) */}
      <Route element={<PublicRoute><AuthLayout /></PublicRoute>}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]}><AdminLayout /></ProtectedRoute>}>
        <Route path="/admin" element={<Navigate to="/admin/patients" replace />} />
        <Route path="/admin/patients" element={<PatientsPage />} />
        
        {/* ADDED: Admin viewing patient profile */}
        <Route path="/admin/patients/:patientId" element={<PatientProfilePage />} />
        
        <Route path="/admin/doctors" element={<DoctorsAdminPage />} />
        <Route path="/admin/heads" element={<HeadsPage />} />
      </Route>

      {/* Doctor Routes */}
      <Route element={<ProtectedRoute allowedRoles={["doctor"]}><DoctorLayout /></ProtectedRoute>}>
        <Route path="/doctor" element={<Navigate to="/doctor/patients" replace />} />
        <Route path="/doctor/patients" element={<DoctorPage />} />
        <Route path="/doctor/patients/new" element={<CreatePatientPage />} />
        <Route path="/doctor/patient/:patientId" element={<PatientProfilePage />} />
        
        {/* Report Routes for Doctor */}
        <Route path="/doctor/patient/:patientId/pre-report/new" element={<BeneficiaryReportPage />} />
        <Route path="/doctor/patient/:patientId/post-report/new" element={<PostReportPage />} />
      </Route>

      {/* Team Leader Routes */}
      <Route element={<ProtectedRoute allowedRoles={["teamLeader"]}><TeamLeaderLayout /></ProtectedRoute>}>
        <Route path="/team-leader" element={<Navigate to="/team-leader/patients" replace />} />
        <Route path="/team-leader/patients" element={<TeamPatientsPage />} />
        <Route path="/team-leader/doctors" element={<TeamDoctorsPage />} />
        <Route path="/team-leader/reports/pending" element={<PendingReportsPage />} />
        <Route path="/team-leader/reports/pre/:reportId" element={<ReportPreviewPage />} />
        <Route path="/team-leader/reports/post/:reportId" element={<PostReportPreview />} />
      </Route>

      {/* Fallback for unknown routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}