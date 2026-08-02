import { useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "../../../components/PageHeader";
import DoctorsTable from "./DoctorsTable";

const DoctorsadminPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // Retrieve JWT stored upon login

        // Fetch user/doctor list with Bearer token
        const response = await axios.get(`${API_BASE_URL}/Patients`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setDoctors(response.data.data || []);
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "حدث خطأ أثناء تحميل بيانات المعالجين"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [API_BASE_URL]);

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