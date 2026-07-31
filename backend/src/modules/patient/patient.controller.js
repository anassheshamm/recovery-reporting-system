
import patientService from "./patient.service.js";

class PatientController {
  async create(req, res, next) {
    try {
      const patient = await patientService.create({
        ...req.body,
        doctor: req.user._id,
      });

      res.status(201).json({
        success: true,
        message: "Patient created successfully.",
        data: patient,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const patients = await patientService.getAll();

      res.status(200).json({
        success: true,
        data: patients,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const patient = await patientService.findById(req.params.id);

      res.status(200).json({
        success: true,
        data: patient,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new PatientController();