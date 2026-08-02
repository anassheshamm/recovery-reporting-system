import { useEffect, useState } from "react";
import axios from "axios";
import HeadsHeader from "./HeadsHeader";
import HeadsTable from "./HeadsTable";

const HeadsPage = () => {
  const [heads, setHeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

  useEffect(() => {
    const fetchHeads = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // Retrieve stored JWT auth token

        const response = await axios.get(`${API_BASE_URL}/users`, {
          params: { role: "head" }, // Optional query filtering if supported by endpoint
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          // Filter client-side if backend returns all users
          const allUsers = response.data.data || [];
          const headsList = allUsers.filter(
            (u) => u.role === "head" || u.role === "head_of_department"
          );

          setHeads(headsList.length ? headsList : allUsers);
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "حدث خطأ أثناء تحميل بيانات رؤساء الأقسام"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHeads();
  }, [API_BASE_URL]);

  const handleDownload = () => {
    if (!heads.length) return;

    const headers = ["الاسم", "رقم الهوية", "الهاتف", "البريد الإلكتروني"];
    const rows = heads.map((h) => [
      `${h.firstName || ""} ${h.lastName || ""}`.trim(),
      h.nationalId || "",
      h.phone || "",
      h.email || "",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "heads_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div dir="rtl" className="mx-auto max-w-[1350px] px-8 py-10">
      <HeadsHeader onDownload={handleDownload} />

      <div className="mt-10">
        {loading ? (
          <div className="py-20 text-center text-gray-500">جاري التحميل...</div>
        ) : error ? (
          <div className="py-10 text-center text-red-500">{error}</div>
        ) : (
          <HeadsTable heads={heads} />
        )}
      </div>
    </div>
  );
};

export default HeadsPage;