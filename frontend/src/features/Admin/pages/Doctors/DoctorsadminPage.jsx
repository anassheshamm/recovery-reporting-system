import { useEffect, useState } from "react";
import PageHeader from "../../../components/PageHeader";
import DoctorsTable from "./DoctorsTable";
import api from "../../../../services/api"; // Import centralized API

const DoctorsadminPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        
        // Use api instance and point to /users with role filter
        const response = await api.get("/users", {
          params: { role: "doctor" } 
        });

        if (response.data.success) {
          setDoctors(response.data.data || []);
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load doctors."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // ... rest of your component remains the same

  return (
    <div dir="rtl" className="mx-auto max-w-[1300px]">
      <PageHeader
        title="لائحة المعالجين"
        description="عرض وإدارة جميع ملفات المعالجين الخاصة بالمركز"
        downloadText="تنزيل لائحة المعالجين"
      />

      {loading ? (
        <div className="py-20 text-center text-gray-500">جاري التحميل...</div>
      ) : error ? (
        <div className="py-10 text-center text-red-500">{error}</div>
      ) : (
        <DoctorsTable doctors={doctors} />
      )}
    </div>
  );
};

export default DoctorsadminPage;