import mongoose from "mongoose";
import dotenv from "dotenv";

import Patient from "../modules/patient/patient.model.js";
import User from "../modules/user/user.model.js";
import PreReport from "../modules/preReport/preReport.model.js";
import PostReport from "../modules/postReport/postReport.model.js";

dotenv.config();

const seedArabicReports = async () => {
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
      .limit(2);

    if (patients.length < 2) {
      throw new Error("Need at least 2 patients.");
    }

    // ==========================================
    // Remove previous Arabic test reports
    // ==========================================

    await PreReport.deleteMany({
      "reportInformation.programName":
        "برنامج التعافي والتمكين",
    });

    await PostReport.deleteMany({
      "beneficiaryInformation.programName":
        "برنامج التعافي والتمكين",
    });

    // ==========================================
    // Arabic Pre Report
    // ==========================================

    await PreReport.create({
      patient: patients[0]._id,
      doctor: patients[0].doctor,
      teamLeader: teamLeader._id,

      reportInformation: {
        programName: "برنامج التعافي والتمكين",
        startDate: new Date("2026-08-10"),
      },

      generalCaseInformation: {
        addictionSeverity: "moderate",

        previousSubstanceType:
          "الحشيش والمواد المخدرة",

        addictionDuration:
          "ثلاث سنوات تقريبًا",

        previousRecoveryAttempts: 2,

        motivations: [
          "personal",
          "family",
        ],
      },

      initialEvaluations: {
        psychologicalStatus: "stable",

        behavioralStatus: "cooperative",

        programCommitment: "high",
      },

      initialRecommendations: {
        recommendations:
          "الاستمرار في البرنامج العلاجي مع تكثيف الدعم النفسي والأسري، والمتابعة الدورية لحالة المستفيد.",
      },

      approval: {
        status: "approved",

        submittedAt:
          new Date("2026-08-11"),

        approvedAt:
          new Date("2026-08-12"),
      },

      createdAt: new Date("2026-08-11"),
      updatedAt: new Date("2026-08-12"),
    });

    // ==========================================
    // Arabic Post Report
    // ==========================================

    await PostReport.create({
      patient: patients[0]._id,
      doctor: patients[0].doctor,
      teamLeader: teamLeader._id,

      beneficiaryInformation: {
        programName:
          "برنامج التعافي والتمكين",

        counselorName:
          "أحمد محمد",

        startDate:
          new Date("2026-08-10"),

        graduationDate:
          new Date("2026-08-25"),
      },

      caseSummary: {
        summary:
          "أظهر المستفيد تحسنًا واضحًا في حالته النفسية والسلوكية، كما تحسن تفاعله مع المحيطين به وأصبح أكثر التزامًا بالبرنامج.",

        addictionSeverity: "moderate",
      },

      progressAssessment: {
        psychologicalStatus:
          "significant_improvement",

        behavioralStatus:
          "high_commitment",

        socialStatus:
          "positive_interaction",
      },

      programProgress: {
        overallImprovement:
          "excellent",

        treatmentCommitment:
          "fully_committed",

        activityParticipation:
          "active",

        emotionalStability:
          "stable",

        familyRelationship:
          "improved",

        communityReadiness:
          "ready",
      },

      recoveryStability:
        "very_good",

      personalPlanReadiness:
        "ready",

      familyNotification: {
        notes:
          "تم التواصل مع الأسرة وإطلاعهم على مستوى التقدم وخطة المتابعة بعد انتهاء البرنامج.",
      },

      recommendations:
        "الاستمرار في المتابعة بعد التخرج، والالتزام بالخطة الشخصية، والمحافظة على الدعم الأسري والاجتماعي.",

      additionalNotes:
        "المستفيد أظهر تعاونًا جيدًا والتزامًا واضحًا خلال فترة البرنامج.",

      approval: {
        status: "approved",

        approvedAt:
          new Date("2026-08-26"),
      },

      createdAt: new Date("2026-08-26"),
      updatedAt: new Date("2026-08-26"),
    });

    // ==========================================
    // Second Arabic Pre Report
    // ==========================================

    await PreReport.create({
      patient: patients[1]._id,
      doctor: patients[1].doctor,
      teamLeader: teamLeader._id,

      reportInformation: {
        programName:
          "برنامج الدعم والتأهيل",

        startDate:
          new Date("2026-08-15"),
      },

      generalCaseInformation: {
        addictionSeverity: "severe",

        previousSubstanceType:
          "مواد مخدرة متعددة",

        addictionDuration:
          "خمس سنوات",

        previousRecoveryAttempts: 3,

        motivations: [
          "family",
          "legal",
        ],
      },

      initialEvaluations: {
        psychologicalStatus:
          "mild_disorder",

        behavioralStatus:
          "hesitant",

        programCommitment:
          "medium",
      },

      initialRecommendations: {
        recommendations:
          "يحتاج المستفيد إلى دعم نفسي مستمر ومتابعة دقيقة خلال المراحل الأولى من البرنامج.",
      },

      approval: {
        status: "pending",

        submittedAt:
          new Date("2026-08-16"),
      },

      createdAt: new Date("2026-08-16"),
      updatedAt: new Date("2026-08-16"),
    });

    // ==========================================
    // Second Arabic Post Report
    // ==========================================

    await PostReport.create({
      patient: patients[1]._id,
      doctor: patients[1].doctor,
      teamLeader: teamLeader._id,

      beneficiaryInformation: {
        programName:
          "برنامج الدعم والتأهيل",

        counselorName:
          "سارة أحمد",

        startDate:
          new Date("2026-08-15"),

        graduationDate:
          new Date("2026-08-27"),
      },

      caseSummary: {
        summary:
          "حقق المستفيد تقدمًا متوسطًا خلال فترة البرنامج، إلا أنه ما زال بحاجة إلى دعم ومتابعة مستمرة.",

        addictionSeverity: "severe",
      },

      progressAssessment: {
        psychologicalStatus:
          "moderate_improvement",

        behavioralStatus:
          "medium_commitment",

        socialStatus:
          "limited_interaction",
      },

      programProgress: {
        overallImprovement:
          "good",

        treatmentCommitment:
          "partially_committed",

        activityParticipation:
          "average",

        emotionalStability:
          "fluctuating",

        familyRelationship:
          "unchanged",

        communityReadiness:
          "needs_support",
      },

      recoveryStability:
        "acceptable",

      personalPlanReadiness:
        "under_development",

      familyNotification: {
        notes:
          "تم إبلاغ الأسرة بالحالة الحالية والتوصيات اللازمة لاستمرار الدعم.",
      },

      recommendations:
        "الاستمرار في جلسات المتابعة والدعم النفسي، مع تعزيز المشاركة في الأنشطة العلاجية.",

      additionalNotes:
        "يحتاج المستفيد إلى مزيد من الوقت والدعم للوصول إلى الاستقرار المطلوب.",

      approval: {
        status: "pending",
      },

      createdAt: new Date("2026-08-27"),
      updatedAt: new Date("2026-08-27"),
    });

    console.log("");
    console.log("=================================");
    console.log("🇸🇦 ARABIC TEST REPORTS CREATED");
    console.log("=================================");
    console.log("PreReports: 2");
    console.log("PostReports: 2");
    console.log("=================================");
  } catch (error) {
    console.error("❌ Seed error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB.");
  }
};

seedArabicReports();