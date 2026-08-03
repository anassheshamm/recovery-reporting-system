import api from "./api";

const userService = {
  getTeamLeaders() {
    return api.get("/users/team-leaders");
  },
  getMyTeam() {
    return api.get("/users/my-team"); // NEW
  }
};

export default userService;