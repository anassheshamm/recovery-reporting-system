import "dotenv/config";
import mongoose from "mongoose";

import userService from "../modules/user/user.service.js";
import User from "../modules/user/user.model.js";
import Patient from "../modules/patient/patient.model.js";

const LOCAL_DB_NAME = "recovery_reporting_local";

const createDate = (monthsAgo, day = 15) => {
  const date = new Date();
  date.setMonth(date.getMonth() - monthsAgo);
  date.setDate(day);
  date.setHours(12, 0, 0, 0);
  return date;
};

const seed = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined.");
    }

    // Safety check: NEVER seed production
    if (
      !process.env.MONGO_URI.includes("localhost") &&
      !process.env.MONGO_URI.includes("127.0.0.1")
    ) {
      throw new Error(
        "STOP: Seed can only run against a local MongoDB."
      );
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Connected to local MongoDB.");

    const dbName = mongoose.connection.name;

    if (dbName !== LOCAL_DB_NAME) {
      throw new Error(
        `STOP: Expected database "${LOCAL_DB_NAME}" but connected to "${dbName}".`
      );
    }

    console.log(`🌱 Seeding database: ${dbName}`);

    // ==========================================
    // Clear LOCAL data only
    // ==========================================

    await Promise.all([
      Patient.deleteMany({}),
      User.deleteMany({}),
    ]);

    console.log("🧹 Local users and patients cleared.");

    // ==========================================
    // Users
    // ==========================================

    const admin = await userService.create({
      firstName: "Anas",
      middleName: "Hesham",
      lastName: "Admin",
      email: "admin@recovery.local",
      password: "Admin123456",
      phone: "0500000001",
      nationalId: "1000000001",
      gender: "male",
      role: "admin",
      canInviteUsers: true,
    });

    const teamLeader = await userService.create({
      firstName: "Ahmed",
      middleName: "Mohamed",
      lastName: "Leader",
      email: "leader@recovery.local",
      password: "Leader123456",
      phone: "0500000002",
      nationalId: "1000000002",
      gender: "male",
      role: "teamLeader",
    });

    const doctor1 = await userService.create({
      firstName: "Mohamed",
      middleName: "Ali",
      lastName: "Doctor",
      email: "doctor1@recovery.local",
      password: "Doctor123456",
      phone: "0500000003",
      nationalId: "1000000003",
      gender: "male",
      role: "doctor",
      teamLeader: teamLeader._id,
    });

    const doctor2 = await userService.create({
      firstName: "Sara",
      middleName: "Ahmed",
      lastName: "Doctor",
      email: "doctor2@recovery.local",
      password: "Doctor123456",
      phone: "0500000004",
      nationalId: "1000000004",
      gender: "female",
      role: "doctor",
      teamLeader: teamLeader._id,
    });

    console.log("👥 Users created.");

    // ==========================================
    // Patients
    // ==========================================

    const statuses = [
      "active",
      "active",
      "active",
      "active",
      "active",

      "completed",
      "completed",
      "completed",
      "completed",
      "completed",

      "delayed",
      "delayed",
      "delayed",

      "discontinued",
      "discontinued",

      "active",
      "completed",
      "delayed",
      "active",
    ];

    const patients = [];

    for (let i = 0; i < 20; i++) {
      const doctor = i % 2 === 0 ? doctor1 : doctor2;

      const patient = await Patient.create({
        firstName: `Patient${i + 1}`,
        middleName: "Test",
        lastName: "Local",

        nationalId: `20000000${String(i + 1).padStart(2, "0")}`,

        gender: i % 2 === 0 ? "male" : "female",

        nationality: "Saudi",

        occupation: "Employee",

        maritalStatus:
          i % 3 === 0
            ? "married"
            : "single",

        dateOfBirth: new Date(
          1985 + (i % 15),
          i % 12,
          10
        ),

        phone: `05100000${String(i + 1).padStart(2, "0")}`,

        email: `patient${i + 1}@local.test`,

        emergencyContactPhone:
          `05200000${String(i + 1).padStart(2, "0")}`,

        emergencyContactRelation: "Family",

        address: "Tabuk",

        doctor: doctor._id,

        status: statuses[i],

        isActive: statuses[i] === "active",

        createdAt: createDate(
          (i % 12) + 1,
          5
        ),
      });

      patients.push(patient);
    }

    console.log("🧑‍⚕️ 20 patients created.");

    // ==========================================
    // Done
    // ==========================================

    console.log("\n=================================");
    console.log("🌱 LOCAL SEED COMPLETED");
    console.log("=================================\n");

    console.log("Admin:");
    console.log("  Email: admin@recovery.local");
    console.log("  Password: Admin123456");

    console.log("\nTeam Leader:");
    console.log("  Email: leader@recovery.local");
    console.log("  Password: Leader123456");

    console.log("\nDoctor 1:");
    console.log("  Email: doctor1@recovery.local");
    console.log("  Password: Doctor123456");

    console.log("\nDoctor 2:");
    console.log("  Email: doctor2@recovery.local");
    console.log("  Password: Doctor123456");

    console.log("\nPatients: 20");
    console.log("PreReports: 0");
    console.log("PostReports: 0");

    await mongoose.disconnect();

    console.log("\n🔌 Disconnected from MongoDB.");
  } catch (error) {
    console.error("\n❌ SEED ERROR:");
    console.error(error);

    await mongoose.disconnect();

    process.exit(1);
  }
};

seed();