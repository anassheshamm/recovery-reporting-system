import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import PatientsTable from "./PatientsTable";
import patientService from "../../services/patient.service";

const DoctorsPage = ({ searchQuery = "" }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPatients();
  }, []);

  const calculateAge = (birthDate) => {
    if (!birthDate) return "-";
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

 const loadPatients = async () => {
  try {
    setLoading(true);
    setError("");

    const response = await patientService.getAllPatients();

    console.log("Response:", response);
    console.log("Response.data:", response.data);
    console.log("Is Array:", Array.isArray(response.data));

    const rawPatients = response.data || [];

    const mappedPatients = rawPatients.map((patient) => ({
      _id: patient._id,
      fullName: [patient.firstName, patient.middleName, patient.lastName]
        .filter(Boolean)
        .join(" "),
      age: calculateAge(patient.dateOfBirth),
      nationalId: patient.nationalId || "-",
      phone: patient.phone || "-",
      email: patient.email || "-",
      joinDate: patient.createdAt
        ? new Date(patient.createdAt).toLocaleDateString("en-GB")
        : "-",
    }));

    setPatients(mappedPatients);
  } catch (err) {
    console.error("ERROR:", err);
    console.error("RESPONSE:", err.response);

    setError(
      err.response?.data?.message || "حدث خطأ أثناء تحميل المستفيدين"
    );
  } finally {
    setLoading(false);
  }
};

  const filteredPatients = patients.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.fullName.toLowerCase().includes(q) ||
      (p.nationalId && p.nationalId.includes(q))
    );
  });

  return (
    <div className="mx-auto max-w-[1300px]">
      <PageHeader
        title="لائحة المستفيدين"
        description="عرض وإدارة جميع ملفات المستفيدين الخاصة بالمركز"
        downloadText="تنزيل لائحة المستفيدين"
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
        <PatientsTable patients={filteredPatients} />
      )}
    </div>
  );
};

export default DoctorsPage;