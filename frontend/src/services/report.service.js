import api from "./api";

class ReportService {
  createPreReport(data) {
    return api.post("/pre-reports", data);
  }

  getPendingReports() {
    return api.get("/pre-reports/pending");
  }

  getPreReport(id) {
    return api.get(`/pre-reports/${id}`);
  }

  approveReport(id) {
    return api.patch(`/pre-reports/${id}/approve`);
  }

  rejectReport(id, reason) {
    return api.patch(`/pre-reports/${id}/reject`, {
      reason,
    });
  }

  getReportsByPatient(patientId) {
    return api.get(`/pre-reports/patient/${patientId}`);
  }
}

export default new ReportService();