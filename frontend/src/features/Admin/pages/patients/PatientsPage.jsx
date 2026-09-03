import { useEffect, useState } from "react";
import api from "../../../../services/api";
import PatientsHeader from "../../../components/PageHeader";
import PatientsTable from "./PatientsTable";
import { useSearch } from "../../../../context/SearchContext";
import ExportModal from "../../../components/ExportModal"; 

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // 2. Get global search term
  const { searchTerm } = useSearch();

  // 3. Re-fetch whenever searchTerm changes (with debounce)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPatients();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError("");

      // 4. Pass the search query parameter to the backend API route
      const queryString = searchTerm ? `?search=${searchTerm}` : "";
      const response = await api.get(`/patients${queryString}`);

      if (response.data.success) {
        setPatients(response.data.data || []);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "حدث خطأ أثناء تحميل بيانات المستفيدين"
      );
    } finally {
      setLoading(false);
    }
  };

  // Open the Export Modal instead of manual CSV creation
  const handleDownload = () => {
    setIsExportModalOpen(true);
  };

  return (
    <div dir="rtl" className="mx-auto max-w-[1350px] px-8 py-10">
      <PatientsHeader
        title="لائحة المستفيدين"
        description="عرض وإدارة جميع ملفات المستفيدين الخاصة بالمركز"
        downloadText="تصدير تقرير المستفيدين"
        onDownload={handleDownload}
      />

      <div className="mt-10">
        {loading ? (
          <div className="py-20 text-center text-gray-500">جاري التحميل...</div>
        ) : error ? (
          <div className="py-10 text-center text-red-500">{error}</div>
        ) : (
          <PatientsTable patients={patients} />
        )}
      </div>

      <ExportModal 
        isOpen={isExportModalOpen} 
        onClose={() => setIsExportModalOpen(false)} 
      />
    </div>
  );
};

export default PatientsPage;