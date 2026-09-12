import mongoose from "mongoose";
import dotenv from "dotenv";

import Patient from "../modules/patient/patient.model.js";
import User from "../modules/user/user.model.js";
import PreReport from "../modules/preReport/preReport.model.js";
import PostReport from "../modules/postReport/postReport.model.js";

dotenv.config();

const seedTestReports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Connected to local MongoDB.");

    // ==========================================
    // Get users
    // ==========================================

    const doctors = await User.find({
      role: "doctor",
      isActive: true,
    }).limit(2);

    const teamLeader = await User.findOne({
      role: "teamLeader",
      isActive: true,
    });

    if (doctors.length < 2) {
      throw new Error("Need at least 2 doctors.");
    }

    if (!teamLeader) {
      throw new Error("Team Leader not found.");
    }

    // ==========================================
    // Get patients
    // ==========================================

    const patients = await Patient.find({
      doctor: {
        $in: doctors.map((doctor) => doctor._id),
      },
    })
      .sort({ createdAt: 1 })
      .limit(3);

    if (patients.length < 3) {
      throw new Error("Need at least 3 patients.");
    }

    // ==========================================
    // Remove previous test reports
    // ==========================================

    await PreReport.deleteMany({
      "reportInformation.programName": "TEST PROGRAM",
    });

    await PostReport.deleteMany({
      "beneficiaryInformation.programName": "TEST PROGRAM",
    });

    // ==========================================
    // PRE REPORT 1
    // Inside date range
    // ==========================================

    await PreReport.create({
      patient: patients[0]._id,
      doctor: patients[0].doctor,
      teamLeader: teamLeader._id,

      reportInformation: {
        programName: "TEST PROGRAM",
        startDate: new Date("2026-08-03"),
      },

      generalCaseInformation: {
        addictionSeverity: "moderate",
        previousSubstanceType: "Test Substance",
        addictionDuration: "3 years",
        previousRecoveryAttempts: 2,
        motivations: ["personal", "family"],
      },

      initialEvaluations: {
        psychologicalStatus: "stable",
        behavioralStatus: "cooperative",
        programCommitment: "high",
      },

      initialRecommendations: {
        recommendations:
          "Test recommendation for Excel export.",
      },

      approval: {
        status: "approved",
        submittedAt: new Date("2026-08-04"),
        approvedAt: new Date("2026-08-05"),
      },

      createdAt: new Date("2026-08-04"),
      updatedAt: new Date("2026-08-05"),
    });

    // ==========================================
    // PRE REPORT 2
    // Inside date range
    // ==========================================

    await PreReport.create({
      patient: patients[1]._id,
      doctor: patients[1].doctor,
      teamLeader: teamLeader._id,

      reportInformation: {
        programName: "TEST PROGRAM",
        startDate: new Date("2026-08-07"),
      },

      generalCaseInformation: {
        addictionSeverity: "severe",
        previousSubstanceType: "Test Substance 2",
        addictionDuration: "5 years",
        previousRecoveryAttempts: 3,
        motivations: ["family", "legal"],
      },

      initialEvaluations: {
        psychologicalStatus: "mild_disorder",
        behavioralStatus: "hesitant",
        programCommitment: "medium",
      },

      initialRecommendations: {
        recommendations:
          "Second test recommendation.",
      },

      approval: {
        status: "pending",
        submittedAt: new Date("2026-08-08"),
      },

      createdAt: new Date("2026-08-08"),
      updatedAt: new Date("2026-08-08"),
    });

    // ==========================================
    // PRE REPORT 3
    // OUTSIDE date range
    // ==========================================

    await PreReport.create({
      patient: patients[2]._id,
      doctor: patients[2].doctor,
      teamLeader: teamLeader._id,

      reportInformation: {
        programName: "TEST PROGRAM",
        startDate: new Date("2026-07-10"),
      },

      generalCaseInformation: {
        addictionSeverity: "mild",
        previousSubstanceType: "Test Substance 3",
        addictionDuration: "1 year",
        previousRecoveryAttempts: 1,
        motivations: ["personal"],
      },

      initialEvaluations: {
        psychologicalStatus: "stable",
        behavioralStatus: "cooperative",
        programCommitment: "high",
      },

      initialRecommendations: {
        recommendations:
          "Outside date range test report.",
      },

      approval: {
        status: "approved",
        submittedAt: new Date("2026-07-11"),
        approvedAt: new Date("2026-07-12"),
      },

      createdAt: new Date("2026-07-11"),
      updatedAt: new Date("2026-07-12"),
    });

    // ==========================================
    // POST REPORT 1
    // Inside date range
    // ==========================================

    await PostReport.create({
      patient: patients[0]._id,
      doctor: patients[0].doctor,
      teamLeader: teamLeader._id,

      beneficiaryInformation: {
        programName: "TEST PROGRAM",
        counselorName: "Test Counselor",
        startDate: new Date("2026-08-03"),
        graduationDate: new Date("2026-08-20"),
      },

      caseSummary: {
        summary: "Test post report summary.",
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
        notes: "Test family notification.",
      },

      recommendations:
        "Continue follow-up after graduation.",

      additionalNotes:
        "Test additional notes.",

      approval: {
        status: "approved",
        approvedAt: new Date("2026-08-21"),
      },

      createdAt: new Date("2026-08-21"),
      updatedAt: new Date("2026-08-21"),
    });

    // ==========================================
    // POST REPORT 2
    // Inside date range
    // ==========================================

    await PostReport.create({
      patient: patients[1]._id,
      doctor: patients[1].doctor,
      teamLeader: teamLeader._id,

      beneficiaryInformation: {
        programName: "TEST PROGRAM",
        counselorName: "Test Counselor 2",
        startDate: new Date("2026-08-07"),
        graduationDate: new Date("2026-08-24"),
      },

      caseSummary: {
        summary: "Second test post report.",
        addictionSeverity: "severe",
      },

      progressAssessment: {
        psychologicalStatus: "moderate_improvement",
        behavioralStatus: "medium_commitment",
        socialStatus: "limited_interaction",
      },

      programProgress: {
        overallImprovement: "good",
        treatmentCommitment: "partially_committed",
        activityParticipation: "average",
        emotionalStability: "fluctuating",
        familyRelationship: "unchanged",
        communityReadiness: "needs_support",
      },

      recoveryStability: "acceptable",

      personalPlanReadiness: "under_development",

      familyNotification: {
        notes: "Second test notification.",
      },

      recommendations:
        "Continue treatment and monitoring.",

      additionalNotes:
        "Second test notes.",

      approval: {
        status: "pending",
      },

      createdAt: new Date("2026-08-24"),
      updatedAt: new Date("2026-08-24"),
    });

    // ==========================================
    // POST REPORT 3
    // OUTSIDE date range
    // ==========================================

    await PostReport.create({
      patient: patients[2]._id,
      doctor: patients[2].doctor,
      teamLeader: teamLeader._id,

      beneficiaryInformation: {
        programName: "TEST PROGRAM",
        counselorName: "Test Counselor 3",
        startDate: new Date("2026-07-01"),
        graduationDate: new Date("2026-07-25"),
      },

      caseSummary: {
        summary: "Outside range test report.",
        addictionSeverity: "mild",
      },

      progressAssessment: {
        psychologicalStatus: "no_improvement",
        behavioralStatus: "difficulty_commitment",
        socialStatus: "social_isolation",
      },

      programProgress: {
        overallImprovement: "limited",
        treatmentCommitment: "not_committed",
        activityParticipation: "weak",
        emotionalStability: "disturbed",
        familyRelationship: "still_tense",
        communityReadiness: "not_ready",
      },

      recoveryStability: "weak",

      personalPlanReadiness: "not_ready",

      familyNotification: {
        notes: "Outside range test.",
      },

      recommendations:
        "Additional support required.",

      additionalNotes:
        "Outside range report.",

      approval: {
        status: "rejected",
        rejectedAt: new Date("2026-07-27"),
        rejectionReason: "Test rejection.",
      },

      createdAt: new Date("2026-07-26"),
      updatedAt: new Date("2026-07-27"),
    });

    console.log("");
    console.log("=================================");
    console.log("🧪 TEST REPORTS CREATED");
    console.log("=================================");
    console.log("PreReports: 3");
    console.log("PostReports: 3");
    console.log("Inside range: 4");
    console.log("Outside range: 2");
    console.log("=================================");

  } catch (error) {
    console.error("❌ Seed error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB.");
  }
};

seedTestReports();