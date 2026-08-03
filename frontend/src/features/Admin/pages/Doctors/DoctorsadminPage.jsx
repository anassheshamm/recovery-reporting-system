import { useEffect, useState } from "react";
import PageHeader from "../../../components/PageHeader";
import DoctorsTable from "./DoctorsTable";
import api from "../../../../services/api";

const DoctorsadminPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError("");
        
        // Fetch users and filter by the 'doctor' role
        const response = await api.get("/users", {
          params: { role: "doctor" }
        });

        if (response.data.success) {
          setDoctors(response.data.data || []);
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "فشل في تحميل قائمة الأطباء."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div dir="rtl" className="mx-auto max-w-[1300px]">
      <PageHeader
        title="إدارة الأطباء"
        description="عرض وإدارة حسابات الأطباء ومرشدي التعافي"
        downloadText="تصدير القائمة"
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