import { useEffect, useState } from "react";
import HeadsHeader from "./HeadsHeader";
import HeadsTable from "./HeadsTable";
import api from "../../../../services/api"; // Import centralized API

const HeadsPage = () => {
  const [heads, setHeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHeads = async () => {
      try {
        setLoading(true);
        
        // Use api instance
        const response = await api.get("/users", {
          params: { role: "head" } 
        });

        if (response.data.success) {
          const allUsers = response.data.data || [];
          const headsList = allUsers.filter(
            (u) => u.role === "head" || u.role === "teamLeader" // Adjusted backend role name
          );
          setHeads(headsList.length ? headsList : allUsers);
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load heads of department."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHeads();
  }, []);

  // ... rest of your component remains the same

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