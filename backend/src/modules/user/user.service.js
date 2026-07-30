import User from "./user.model.js";
import bcrypt from "bcryptjs";
import AppError from "../../shared/errors/AppError.js";

class UserService {
  async create(data) {
    // Check if email already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new AppError("Email already exists.", 400);
    }
    
    // Check if national ID already exists
    const existingNationalId = await User.findOne({ nationalId: data.nationalId });
    if (existingNationalId) {
      throw new AppError("National ID already exists.", 409);
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    const user = await User.create(data);
    const userObject = user.toObject();
    delete userObject.password; // Remove password from the returned object

    
    return userObject;
  }

  async findByEmail(email) {
    return await User.findOne({ email }).select("+password");
  }

  async findByNationalId(nationalId) {}

  async findById(id) {
    return await User.findById(id);
  }

  async getAll(filters = {}) {}

  async deactivate(id) {}
}

export default new UserService();