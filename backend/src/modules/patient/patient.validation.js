import { body } from "express-validator";

export const createPatientValidation = [
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .trim(),

  body("middleName")
    .notEmpty()
    .withMessage("Middle name is required")
    .trim(),

  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .trim(),

  body("nationalId")
    .isLength({ min: 14, max: 14 })
    .withMessage("National ID must be 14 digits"),

  body("gender")
    .isIn(["male", "female"])
    .withMessage("Invalid gender"),

  body("nationality")
    .notEmpty()
    .withMessage("Nationality is required"),

  body("occupation").optional(),

  body("maritalStatus")
    .optional()
    .isIn(["single", "married", "divorced", "widowed"]),

  body("dateOfBirth")
    .isISO8601()
    .withMessage("Invalid date"),

  body("phone")
    .notEmpty()
    .withMessage("Phone is required"),

  body("alternativePhone").optional(),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email"),

  body("emergencyContactPhone").optional(),

  body("emergencyContactRelation").optional(),

  body("address").optional(),
];