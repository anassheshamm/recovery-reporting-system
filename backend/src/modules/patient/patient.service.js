import Patient from "./patient.model.js";
import AppError from "../../shared/errors/AppError.js";

class PatientService {
  async create(data) {
    const existingPatient = await Patient.findOne({
      nationalId: data.nationalId,
    });

    if (existingPatient) {
      throw new AppError("Patient already exists.", 409);
    }

    return await Patient.create(data);
  }

  async findById(id) {
    return await Patient.findById(id).populate(
      "doctor",
      "firstName middleName lastName email role"
    );
  }

  async getAll() {
    return await Patient.find().populate(
      "doctor",
      "firstName middleName lastName"
    );
  }
}

export default new PatientService();
