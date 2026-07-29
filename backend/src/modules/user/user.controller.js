import userService from "./user.service.js";

class UserController {
  async create(req, res, next) {
    try {
      const user = await userService.create(req.body);

      return res.status(201).json({
        success: true,
        message: "User created successfully.",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();