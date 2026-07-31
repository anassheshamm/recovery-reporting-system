import crypto from "crypto";

import Invitation from "./invitation.model.js";
import User from "../user/user.model.js";

import AppError from "../../shared/errors/AppError.js";

class InvitationService {
  async create(data, createdBy) {
    // Check if user already exists
    const existingUser = await User.findOne({
      email: data.email,
    });

    if (existingUser) {
      throw new AppError("User already exists.", 409);
    }

    // Check pending invitation
    const existingInvitation = await Invitation.findOne({
      email: data.email,
      status: "pending",
    });

    if (existingInvitation) {
      throw new AppError(
        "Pending invitation already exists.",
        409
      );
    }

    const token = crypto.randomBytes(32).toString("hex");

    const expiresAt = new Date();

    expiresAt.setDate(expiresAt.getDate() + 7);

    const invitation = await Invitation.create({
      email: data.email,
      role: data.role,
      token,
      expiresAt,
      createdBy,
    });

    return invitation;
  }
}

export default new InvitationService();