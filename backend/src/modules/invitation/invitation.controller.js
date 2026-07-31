import invitationService from "./invitation.service.js";

class InvitationController {
  async create(req, res, next) {
    try {
      const invitation = await invitationService.create(
        req.body,
        req.user._id
      );

      return res.status(201).json({
        success: true,
        message: "Invitation created successfully.",
        data: {
          invitation,
          registrationLink:
            `http://localhost:5173/register?token=${invitation.token}`,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new InvitationController();