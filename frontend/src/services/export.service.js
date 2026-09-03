import api from "./api";

const exportService = {
  async exportExcel(from, to) {
    const response = await api.get("/export/excel", {
      params: { from, to },
      responseType: "blob",
    });
    return response.data;
  },
};

export default exportService;