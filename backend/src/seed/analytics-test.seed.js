import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "../modules/user/user.model.js";
import Patient from "../modules/patient/patient.model.js";
import PreReport from "../modules/preReport/preReport.model.js";
import PostReport from "../modules/postReport/postReport.model.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://localhost:27017/recovery_reporting_local";

const TEST_PREFIX = "analytics-test-";

const daysFromNow = (days) => {
  const date = new Date("2026-08-29T12:00:00.000Z");
  date.setUTCDate(date.getUTCDate() + days);
  return date;
};

const monthsBefore = (date, months) => {
  const result = new Date(date);
  result.setUTCMonth(result.getUTCMonth() - months);
  return result;
};

const createPreReportData = ({
  patientId,
  doctorId,
  teamLeaderId,
  createdAt,
}) => ({
  patient: patientId,
  doctor: doctorId,
  teamLeader: teamLeaderId,

  reportInformation: {
    programName: "برنامج التعافي",
    startDate: createdAt,
  },

  generalCaseInformation: {
    addictionSeverity: "moderate",
    previousSubstanceType: "اختبار",
    addictionDuration: "سنتان",
    previousRecoveryAttempts: 1,
    motivations: ["personal", "family"],
  },

  initialEvaluations: {
    psychologicalStatus: "stable",
    behavioralStatus: "cooperative",
    programCommitment: "high",
  },

  initialRecommendations: {
    recommendations: "بيانات اختبارية للتحليلات",
  },

  approval: {
    status: "approved",
    submittedAt: createdAt,
    approvedAt: createdAt,
  },

  createdAt,
  updatedAt: createdAt,
});

const createPostReportData = ({
  patientId,
  doctorId,
  teamLeaderId,
  createdAt,
  startDate,
}) => ({
  patient: patientId,
  doctor: doctorId,
  teamLeader: teamLeaderId,

  beneficiaryInformation: {
    programName: "برنامج التعافي",
    counselorName: "المستشار التجريبي",
    startDate,
    graduationDate: createdAt,
  },

  caseSummary: {
    summary: "حالة اختبارية مكتملة لأغراض اختبار التحليلات",
    addictionSeverity: "moderate",
  },

  progressAssessment: {
    psychologicalStatus: "significant_improvement",
    behavioralStatus: "high_commitment",
    socialStatus: "positive_interaction",
  },

  programProgress: {
    overallImprovement: "excellent",
    treatmentCommitment: "fully_committed",
    activityParticipation: "active",
    emotionalStability: "stable",
    familyRelationship: "improved",
    communityReadiness: "ready",
  },

  recoveryStability: "very_good",

  personalPlanReadiness: "ready",

  familyNotification: {
    notes: "تم الاختبار",
  },

  recommendations: "استمرار المتابعة",

  additionalNotes: "Analytics test data",

  approval: {
    status: "approved",
    approvedAt: createdAt,
  },

  createdAt,
  updatedAt: createdAt,
});

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("✅ Connected to local MongoDB.");

    // ==========================================
    // GET TEST USERS
    // ==========================================

    const doctor1 = await User.findOne({
      email: "doctor1@recovery.local",
    });

    const doctor2 = await User.findOne({
      email: "doctor2@recovery.local",
    });

    const teamLeader = await User.findOne({
      email: "leader@recovery.local",
    });

    if (!doctor1 || !doctor2 || !teamLeader) {
      throw new Error(
        "Test users not found. Run development.seed.js first."
      );
    }

    // ==========================================
    // CLEAN ONLY OUR ANALYTICS TEST DATA
    // ==========================================

    const oldPatients = await Patient.find({
      nationalId: {
        $regex: `^${TEST_PREFIX}`,
      },
    }).select("_id");

    const oldPatientIds = oldPatients.map(
      (patient) => patient._id
    );

    if (oldPatientIds.length > 0) {
      await PreReport.deleteMany({
        patient: { $in: oldPatientIds },
      });

      await PostReport.deleteMany({
        patient: { $in: oldPatientIds },
      });

      await Patient.deleteMany({
        _id: { $in: oldPatientIds },
      });
    }

    console.log("🧹 Previous analytics test data cleared.");

    // ==========================================
    // PATIENT DEFINITIONS
    // ==========================================

    const patientDefinitions = [
      // ------------------------------------------
      // Completed recovery cases
      // ------------------------------------------

      {
        number: 1,
        status: "completed",
        doctor: doctor1,
        recoveryMonths: 1,
        postMonth: 8,
        postDay: 5,
      },

      {
        number: 2,
        status: "completed",
        doctor: doctor1,
        recoveryMonths: 2,
        postMonth: 8,
        postDay: 7,
      },

      {
        number: 3,
        status: "completed",
        doctor: doctor1,
        recoveryMonths: 3,
        postMonth: 8,
        postDay: 10,
      },

      {
        number: 4,
        status: "completed",
        doctor: doctor1,
        recoveryMonths: 4,
        postMonth: 8,
        postDay: 12,
      },

      {
        number: 5,
        status: "completed",
        doctor: doctor2,
        recoveryMonths: 5,
        postMonth: 8,
        postDay: 15,
      },

      {
        number: 6,
        status: "completed",
        doctor: doctor2,
        recoveryMonths: 6,
        postMonth: 8,
        postDay: 18,
      },

      {
        number: 7,
        status: "completed",
        doctor: doctor2,
        recoveryMonths: 12,
        postMonth: 8,
        postDay: 20,
      },

      // ------------------------------------------
      // Patient with Pre only
      // ------------------------------------------

      {
        number: 8,
        status: "active",
        doctor: doctor1,
        preOnly: true,
      },

      // ------------------------------------------
      // Patient without reports
      // ------------------------------------------

      {
        number: 9,
        status: "active",
        doctor: doctor2,
        noReports: true,
      },

      // ------------------------------------------
      // Different statuses
      // ------------------------------------------

      {
        number: 10,
        status: "active",
        doctor: doctor1,
        noReports: true,
      },

      {
        number: 11,
        status: "delayed",
        doctor: doctor2,
        noReports: true,
      },

      {
        number: 12,
        status: "discontinued",
        doctor: doctor2,
        noReports: true,
      },

      // ------------------------------------------
      // Additional cases for monthly reports
      // ------------------------------------------

      {
        number: 13,
        status: "completed",
        doctor: doctor1,
        recoveryMonths: 2,
        postMonth: 7,
        postDay: 10,
      },

      {
        number: 14,
        status: "completed",
        doctor: doctor2,
        recoveryMonths: 4,
        postMonth: 6,
        postDay: 15,
      },

      // ------------------------------------------
      // Old patient before the test period
      // ------------------------------------------

      {
        number: 15,
        status: "active",
        doctor: doctor1,
        oldPatient: true,
        noReports: true,
      },
    ];

    // ==========================================
    // CREATE PATIENTS + REPORTS
    // ==========================================

    const createdPatients = [];

    for (const definition of patientDefinitions) {
      let patientCreatedAt;

      if (definition.oldPatient) {
        patientCreatedAt = new Date(
          "2025-01-15T12:00:00.000Z"
        );
      } else {
        patientCreatedAt = new Date(
          "2026-08-01T12:00:00.000Z"
        );
      }

      const patient = await Patient.create({
        firstName: "مستفيد",
        middleName: "اختبار",
        lastName: `${definition.number}`,

        nationalId: `${TEST_PREFIX}${String(
          definition.number
        ).padStart(3, "0")}`,

        gender:
          definition.number % 2 === 0
            ? "female"
            : "male",

        nationality: "سعودي",

        occupation: "موظف",

        maritalStatus:
          definition.number % 2 === 0
            ? "married"
            : "single",

        dateOfBirth: new Date(
          "1990-01-01T00:00:00.000Z"
        ),

        phone: `050000${String(
          definition.number
        ).padStart(4, "0")}`,

        email: `${TEST_PREFIX}${definition.number}@example.com`,

        address: "بيانات اختبارية",

        doctor: definition.doctor._id,

        isActive: true,

        status: definition.status,

        createdAt: patientCreatedAt,
        updatedAt: patientCreatedAt,
      });

      createdPatients.push(patient);

      if (definition.noReports) {
        continue;
      }

      // ========================================
      // PRE REPORT
      // ========================================

      let preCreatedAt;

      if (definition.recoveryMonths) {
        const postDate = new Date(
          `2026-${String(
            definition.postMonth
          ).padStart(2, "0")}-${String(
            definition.postDay
          ).padStart(2, "0")}T12:00:00.000Z`
        );

        preCreatedAt = monthsBefore(
          postDate,
          definition.recoveryMonths
        );

        await PreReport.create(
          createPreReportData({
            patientId: patient._id,
            doctorId: definition.doctor._id,
            teamLeaderId: teamLeader._id,
            createdAt: preCreatedAt,
          })
        );

        // ======================================
        // POST REPORT
        // ======================================

        await PostReport.create(
          createPostReportData({
            patientId: patient._id,
            doctorId: definition.doctor._id,
            teamLeaderId: teamLeader._id,
            createdAt: postDate,
            startDate: preCreatedAt,
          })
        );
      } else if (definition.preOnly) {
        preCreatedAt = new Date(
          "2026-08-10T12:00:00.000Z"
        );

        await PreReport.create(
          createPreReportData({
            patientId: patient._id,
            doctorId: definition.doctor._id,
            teamLeaderId: teamLeader._id,
            createdAt: preCreatedAt,
          })
        );
      }
    }

    // ==========================================
    // SUMMARY
    // ==========================================

    const totalPatients =
      await Patient.countDocuments({
        nationalId: {
          $regex: `^${TEST_PREFIX}`,
        },
      });

    const totalPreReports =
      await PreReport.countDocuments({
        patient: {
          $in: createdPatients.map(
            (patient) => patient._id
          ),
        },
      });

    const totalPostReports =
      await PostReport.countDocuments({
        patient: {
          $in: createdPatients.map(
            (patient) => patient._id
          ),
        },
      });

    console.log("");
    console.log("=================================");
    console.log("🧪 ANALYTICS TEST DATA CREATED");
    console.log("=================================");
    console.log(`Patients: ${totalPatients}`);
    console.log(`PreReports: ${totalPreReports}`);
    console.log(`PostReports: ${totalPostReports}`);
    console.log("");
    console.log("Expected status distribution:");
    console.log("  Active: 4");
    console.log("  Completed: 9");
    console.log("  Delayed: 1");
    console.log("  Discontinued: 1");
    console.log("");
    console.log("Recovery duration buckets:");
    console.log("  1 month");
    console.log("  2 months");
    console.log("  3 months");
    console.log("  4 months");
    console.log("  5 months");
    console.log("  6 months");
    console.log("  12+ months");
    console.log("");
    console.log("Monthly PostReports:");
    console.log("  June:  1");
    console.log("  July:  1");
    console.log("  August: 7");
    console.log("=================================");

    await mongoose.disconnect();

    console.log("🔌 Disconnected from MongoDB.");
  } catch (error) {
    console.error("❌ Analytics seed failed:");
    console.error(error);

    await mongoose.disconnect();

    process.exit(1);
  }
};

run();