import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import userService from "../user/user.service.js";
import AppError from "../../shared/errors/AppError.js";

import generateToken from "../../shared/utils/generateToken.js";
class AuthService {
  async login(email, password) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw new AppError("Invalid email or password.", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid email or password.", 401);
    }

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
}

export default new AuthService();
