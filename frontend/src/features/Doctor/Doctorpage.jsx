import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import PatientsTable from "./PatientsTable";
import patientService from "../../services/patient.service";
import { useSearch } from "../../context/SearchContext";

const DoctorsPage = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { searchTerm } = useSearch();

  // Reset to first page when searching
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  // Load patients when search or page changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadPatients();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, page]);

  const calculateAge = (birthDate) => {
    if (!birthDate) return "-";

    const today = new Date();
    const birth = new Date(birthDate);

    let age = today.getFullYear() - birth.getFullYear();

    const month = today.getMonth() - birth.getMonth();

    if (
      month < 0 ||
      (month === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const loadPatients = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await patientService.getAllPatients(
        searchTerm,
        page,
        15
      );

      const rawPatients = response.data || [];

      setTotalPages(
        response.pagination?.totalPages || 1
      );

      const mappedPatients = rawPatients.map((patient) => ({
        _id: patient._id,

        fullName: [
          patient.firstName,
          patient.middleName,
          patient.lastName,
        ]
          .filter(Boolean)
          .join(" "),

        age: calculateAge(patient.dateOfBirth),

        nationalId: patient.nationalId || "-",

        phone: patient.phone || "-",

        email: patient.email || "-",

        status: patient.status || "active",

        joinDate: patient.createdAt
          ? new Date(patient.createdAt).toLocaleDateString(
              "en-GB"
            )
          : "-",
      }));

      setPatients(mappedPatients);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "حدث خطأ أثناء تحميل المستفيدين"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!patients.length) return;
    
    const headers = ["الاسم", "رقم الهوية", "الهاتف", "البريد الإلكتروني"];
    const rows = patients.map((p) => [
      `${p.firstName || ""} ${p.lastName || ""}`.trim(),
      p.nationalId || "",
      p.phone || "",
      p.email || "",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "patients_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="mx-auto max-w-[1300px]">
      <PageHeader
        title="لائحة المستفيدين"
        description="عرض وإدارة جميع ملفات المستفيدين الخاصة بالمركز"
        downloadText="تنزيل لائحة المستفيدين"
        onDownload={handleDownload}
      />

      {loading ? (
        <div className="rounded-3xl bg-white py-24 text-center text-lg">
          جاري تحميل المستفيدين...
        </div>
      ) : error ? (
        <div className="rounded-3xl bg-red-50 py-24 text-center text-red-600">
          {error}
        </div>
      ) : (
        <>
          <PatientsTable patients={patients} />

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              disabled={page === 1}
              onClick={() =>
                setPage((prev) => prev - 1)
              }
              className="rounded-lg border px-4 py-2 disabled:opacity-50"
            >
              السابق
            </button>

            <span>
              الصفحة {page} من {totalPages}
            </span>

            <button
              disabled={page >= totalPages}
              onClick={() =>
                setPage((prev) => prev + 1)
              }
              className="rounded-lg border px-4 py-2 disabled:opacity-50"
            >
              التالي
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DoctorsPage;