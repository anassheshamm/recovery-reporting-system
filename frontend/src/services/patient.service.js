import api from "./api";

const patientService = {
  // ===========================
  // Get All Patients
  // ===========================
  async getAllPatients() {
    const response = await api.get("/patients");
    return response.data;
  },

  // ===========================
  // Get Patient By ID
  // ===========================
  async getPatientById(id) {
    const response = await api.get(`/patients/${id}`);
    return response.data;
  },

  // ===========================
  // Create Patient
  // ===========================
  async createPatient(form) {
    const payload = {
      firstName: form.firstName,
      middleName: form.middleName,
      lastName: form.lastName,

      nationalId: form.nationalId,

      gender: form.gender,
      nationality: form.nationality,

      occupation: form.profession,

      maritalStatus: form.maritalStatus,

      dateOfBirth: form.birthDate,

      phone: form.phone,

      alternativePhone: form.anotherPhone,

      emergencyContactPhone: form.guardianPhone,

      emergencyContactRelation: form.relation,

      email: form.email,

      address: form.street,

           
    };

    const response = await api.post("/patients", payload);

    return response.data;
  },

  // ===========================
  // Update Patient
  // (Backend doesn't exist yet)
  // ===========================
  async updatePatient(id, form) {
    const payload = {
      firstName: form.firstName,
      middleName: form.middleName,
      lastName: form.lastName,

      nationalId: form.nationalId,

      gender: form.gender,
      nationality: form.nationality,

      occupation: form.profession,

      maritalStatus: form.maritalStatus,

      dateOfBirth: form.birthDate,

      phone: form.phone,

      alternativePhone: form.anotherPhone,

      emergencyContactPhone: form.guardianPhone,

      emergencyContactRelation: form.relation,

      email: form.email,

      address: [
        form.country,
        form.city,
        form.street,
      ]
        .filter(Boolean)
        .join(", "),
    };

    const response = await api.put(`/patients/${id}`, payload);

    return response.data;
  },

  // ===========================
  // Delete Patient
  // (Backend doesn't exist yet)
  // ===========================
  async deletePatient(id) {
    const response = await api.delete(`/patients/${id}`);
    return response.data;
  },
};

export default patientService;