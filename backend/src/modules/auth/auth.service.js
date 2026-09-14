import bcrypt from "bcryptjs";

import userService from "../user/user.service.js";
import AppError from "../../shared/errors/AppError.js";

import generateToken from "../../shared/utils/generateToken.js";
import Invitation from "../invitation/invitation.model.js";

class AuthService {
async login(email, password) {
  const user = await userService.findByEmail(email);

  console.log("🔍 LOGIN DEBUG");
  console.log("Email:", email);
  console.log("User found:", !!user);

  if (!user) {
    console.log("❌ User not found");
    throw new AppError("Invalid email or password.", 401);
  }

  console.log("User ID:", user._id);
  console.log("User active:", user.isActive);
  console.log("Password hash exists:", !!user.password);
  console.log("Password hash length:", user.password?.length);

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  console.log("Password valid:", isPasswordValid);

  if (!isPasswordValid) {
    console.log("❌ Password mismatch");
    throw new AppError("Invalid email or password.", 401);
  }

  console.log("✅ LOGIN SUCCESS");

    // Update last login timestamp
    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user);

    const userObject = user.toObject();
    delete userObject.password; // Remove password from the returned object

return {
  token,
  user: userObject,
};

  }
  async register(data) {
    const invitation = await Invitation.findOne({
  token: data.token,
  status: "pending",
});
    if (!invitation) {
  throw new AppError("Invalid invitation token.", 400);
}

    if (invitation.expiresAt < new Date()) {
  throw new AppError("Invitation has expired.", 400);
}

const userData = {
  firstName: data.firstName,
  middleName: data.middleName,
  lastName: data.lastName,

  nationalId: data.nationalId,
  phone: data.phone,
  gender: data.gender,

  password: data.password,

  email: invitation.email,
  role: invitation.role,
};

const user = await userService.create(userData);

invitation.status = "accepted";
invitation.acceptedAt = new Date();

await invitation.save();

return user;

}

  
}

export default new AuthService();
