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

  async getAll(user) {
  let query = {};

  if (user.role === "doctor") {
    query.doctor = user._id;
  }

  return await Patient.find(query).populate(
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

async getDashboardStats(doctorId) {
    console.log("Doctor ID:", doctorId);

const reports = await PreReport.find({
  doctor: doctorId,
});

console.log(reports);
  const [
    totalPatients,
    totalReports,
    pendingReports,
  ] = await Promise.all([
    Patient.countDocuments({
      doctor: doctorId,
    }),

    PreReport.countDocuments({
      doctor: doctorId,
    }),

    PreReport.countDocuments({
      doctor: doctorId,
      "approval.status": "pending",
    }),
  ]);

  return {
    totalPatients,
    totalReports,
    pendingReports,
  };
}





}

export default new PatientService();
