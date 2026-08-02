import Patient from "./patient.model.js";
import AppError from "../../shared/errors/AppError.js";
import PreReport from "../preReport/preReport.model.js";


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

  
  async getById(patientId, user) {
  let patient;

  if (user.role === "doctor") {
    patient = await Patient.findOne({
      _id: patientId,
      doctor: user._id,
    }).populate(
      "doctor",
      "firstName middleName lastName email role"
    );
  } else {
    patient = await Patient.findById(patientId).populate(
      "doctor",
      "firstName middleName lastName email role"
    );
  }

  if (!patient) {
    throw new AppError("Patient not found.", 404);
  }

  const reports = await PreReport.find({
    patient: patientId,
  })
    .select(
      "reportInformation approval createdAt teamLeader"
    )
    .populate({
      path: "teamLeader",
      select: "firstName middleName lastName",
    })
    .sort({
      createdAt: -1,
    });

  return {
    patient,
    reports,
  };
}
}

export default new PatientService();
