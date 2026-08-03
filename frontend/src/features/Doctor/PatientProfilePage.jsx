import { useEffect, useState } from "react";
import {
  Calendar,
  Globe,
  User,
  Trash2,
  Pencil,
  Phone,
  Mail,
  FileText,
  Plus,
  Eye,
  Loader2,
  X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import patientService from "../../services/patient.service";
import reportService from "../../services/report.service";

const PatientProfilePage = () => {
  const navigate = useNavigate();
  const { patientId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [patient, setPatient] = useState(null);
  const [reports, setReports] = useState([]);

  const [isReportModalOpen, setIsReportModalOpen] =
    useState(false);

  useEffect(() => {
    loadPatient();
  }, [patientId]);

 const loadPatient = async () => {
    try {
      setLoading(true);
      setError("");

     const response =
       await patientService.getPatientById(patientId);
       console.log(response);
console.log(response.data);
console.log(response.data.patient);
console.log(response.data.reports);
setPatient(response.data.patient);
setReports(response.data.reports);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to load patient data."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePatient = () => {
    alert(
      "حذف المستفيد غير متوفر حالياً لأن الـ Backend لا يحتوي على Delete Patient API."
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FCFEFD]">
        <div className="flex flex-col items-center gap-4 text-[#247C5A]">
          <Loader2 className="h-10 w-10 animate-spin" />
          <p className="text-lg font-semibold">
            جاري تحميل بيانات المستفيد...
          </p>
        </div>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FCFEFD]">

        <p className="mb-6 text-xl font-semibold text-red-600">
          {error}
        </p>

        <button
          onClick={() =>
            navigate("/doctor/patients")
          }
          className="rounded-xl bg-[#35C759] px-6 py-3 font-semibold text-white"
        >
          العودة للمستفيدين
        </button>

      </div>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#FCFEFD] px-10 py-10"
    >
      <div className="mx-auto max-w-[1500px]">
<BackButton />
        {/* Breadcrumb */}

      

        {/* Header */}

        <div className="mb-12 flex items-start justify-between">

          <div>

            <h1 className="text-5xl font-bold text-[#111827]">
              ملف المستفيد
            </h1>

            <p className="mt-3 text-lg text-gray-500">
              البيانات الكاملة الخاصة بالمستفيد
            </p>

          </div>

          <div className="flex gap-4">

            <button
              onClick={() =>
                navigate(
                  `/doctor/edit-patient/${patient._id}`
                )
              }
              className="flex items-center gap-2 rounded-xl bg-[#35C759] px-7 py-4 font-semibold text-white transition hover:bg-[#2FB350]"
            >
              <Pencil size={18} />
              تعديل المعلومات
            </button>

            <button
              onClick={handleDeletePatient}
              className="flex items-center gap-2 rounded-xl border border-[#35C759] px-7 py-4 font-semibold text-[#247C5A] transition hover:bg-[#EDF8F2]"
            >
              <Trash2 size={18} />
              حذف المستفيد
            </button>

          </div>

        </div>

        {/* ====================== */}
        {/* Personal Information */}
        {/* ====================== */}

        <section className="mb-16">

          <div className="mb-8 flex items-center gap-3">

            <div className="rounded-xl bg-[#EAF8F1] p-3">
              <User
                size={24}
                className="text-[#247C5A]"
              />
            </div>

            <h2 className="text-3xl font-bold">
              المعلومات الشخصية
            </h2>

          </div>

          <div className="grid grid-cols-3 gap-6">

            <div>

              <label className="mb-2 block font-medium">
                الاسم الأول
              </label>

              <input
                readOnly
                value={patient.firstName || ""}
                className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                الاسم الثاني
              </label>

              <input
                readOnly
                value={patient.middleName || ""}
                className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                اسم العائلة
              </label>

              <input
                readOnly
                value={patient.lastName || ""}
                className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                رقم الهوية
              </label>

              <input
                readOnly
                value={patient.nationalId || ""}
                className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                الجنس
              </label>

              <input
                readOnly
                value={
                  patient.gender === "male"
                    ? "ذكر"
                    : "أنثى"
                }
                className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                الجنسية
              </label>

              <div className="relative">

                <Globe
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  readOnly
                  value={patient.nationality || ""}
                  className="h-14 w-full rounded-xl border border-gray-300 bg-white pl-12 pr-4"
                />

              </div>

            </div>

            <div>

              <label className="mb-2 block font-medium">
                تاريخ الميلاد
              </label>

              <div className="relative">

                <Calendar
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  readOnly
                  value={
                    patient.dateOfBirth
                      ? new Date(
                          patient.dateOfBirth
                        ).toLocaleDateString("en-CA")
                      : ""
                  }
                  className="h-14 w-full rounded-xl border border-gray-300 bg-white pl-12 pr-4"
                />

              </div>

            </div>

            <div>

              <label className="mb-2 block font-medium">
                المهنة
              </label>

              <input
                readOnly
                value={patient.occupation || ""}
                className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                الحالة الاجتماعية
              </label>

              <input
                readOnly
                value={patient.maritalStatus || ""}
                className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4"
              />

            </div>

          </div>

        </section>        {/* ====================== */}
        {/* Contact Information */}
        {/* ====================== */}

        <section className="mb-16">

          <div className="mb-8 flex items-center gap-3">

            <div className="rounded-xl bg-[#EAF8F1] p-3">
              <Phone
                size={24}
                className="text-[#247C5A]"
              />
            </div>

            <h2 className="text-3xl font-bold">
              معلومات التواصل
            </h2>

          </div>

          <div className="grid grid-cols-3 gap-6">

            <div>

              <label className="mb-2 block font-medium">
                رقم الهاتف
              </label>

              <input
                readOnly
                value={patient.phone || ""}
                className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                رقم هاتف بديل
              </label>

              <input
                readOnly
                value={patient.alternativePhone || ""}
                className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                رقم هاتف الطوارئ
              </label>

              <input
                readOnly
                value={
                  patient.emergencyContactPhone || ""
                }
                className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                صلة القرابة
              </label>

              <input
                readOnly
                value={
                  patient.emergencyContactRelation ||
                  ""
                }
                className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4"
              />

            </div>

            <div className="col-span-2">

              <label className="mb-2 block font-medium">
                البريد الإلكتروني
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  readOnly
                  value={patient.email || ""}
                  className="h-14 w-full rounded-xl border border-gray-300 bg-white pl-12 pr-4"
                />

              </div>

            </div>

            <div className="col-span-3">

              <label className="mb-2 block font-medium">
                العنوان
              </label>

              <input
                readOnly
                value={patient.address || ""}
                className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4"
              />

            </div>

          </div>

        </section>

        {/* ====================== */}
        {/* Reports */}
        {/* ====================== */}

        <section className="mb-20">

          <div className="mb-8 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-[#EAF8F1] p-3">
                <FileText
                  size={24}
                  className="text-[#247C5A]"
                />
              </div>

              <div>

                <h2 className="text-3xl font-bold">
                  التقارير
                </h2>

                <p className="mt-1 text-gray-500">
                  جميع تقارير المستفيد
                </p>

              </div>

            </div>

            <button
              onClick={() =>
                setIsReportModalOpen(true)
              }
              className="flex items-center gap-2 rounded-xl bg-[#35C759] px-6 py-3 font-semibold text-white transition hover:bg-[#2FB350]"
            >
              <Plus size={18} />
              إضافة تقرير
            </button>

          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

            <table className="w-full">

              <thead className="bg-[#F8FAFC]">

                <tr className="text-right">

                  <th className="px-8 py-5">
                    اسم البرنامج
                  </th>

                  <th className="px-8 py-5">
                    قائد الفريق
                  </th>

                  <th className="px-8 py-5">
                    الحالة
                  </th>

                  <th className="px-8 py-5">
                    تاريخ الإنشاء
                  </th>

                  <th className="px-8 py-5 text-center">
                    الإجراءات
                  </th>

                </tr>

              </thead>

              <tbody>

                {reports.length > 0 ? (

                  reports.map((report) => (

                    <tr
                      key={report._id}
                      className="border-t"
                    >

                      <td className="px-8 py-6">
                        {
                          report.reportInformation
                            ?.programName
                        }
                      </td>

                      <td className="px-8 py-6">
                        {report.teamLeader
                          ? `${report.teamLeader.firstName} ${report.teamLeader.lastName}`
                          : "-"}
                      </td>

                      <td className="px-8 py-6">

                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            report.approval
                              ?.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : report.approval
                                  ?.status ===
                                "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {report.approval
                            ?.status === "approved"
                            ? "تمت الموافقة"
                            : report.approval
                                ?.status ===
                              "rejected"
                            ? "مرفوض"
                            : "قيد المراجعة"}
                        </span>

                      </td>

                      <td className="px-8 py-6">
                        {new Date(
                          report.createdAt
                        ).toLocaleDateString(
                          "en-CA"
                        )}
                      </td>

                      <td className="px-8 py-6">

                        <div className="flex justify-center">

                          <button
                            onClick={() =>
                              navigate(
                                `/doctor/pre-reports/${report._id}`
                              )
                            }
                            className="rounded-lg bg-[#EDF8F2] p-2 transition hover:bg-[#DDF4E5]"
                          >
                            <Eye
                              size={18}
                              className="text-[#247C5A]"
                            />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan={5}
                      className="py-16 text-center text-gray-400"
                    >
                      لا توجد تقارير لهذا المستفيد
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </section>
              {/* ====================== */}
      {/* Report Type Modal */}
      {/* ====================== */}

      {isReportModalOpen && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

          <div className="relative w-full max-w-xl rounded-3xl bg-white p-10 shadow-2xl">

            {/* Close */}

            <button
              onClick={() =>
                setIsReportModalOpen(false)
              }
              className="absolute left-5 top-5 rounded-full p-2 text-gray-400 transition hover:bg-gray-100"
            >
              <X size={20} />
            </button>

            <h2 className="mb-3 text-center text-3xl font-bold text-[#111827]">
              إضافة تقرير جديد
            </h2>

            <p className="mb-10 text-center text-gray-500">
              اختر نوع التقرير الذي تريد إضافته
            </p>

            <div className="grid grid-cols-2 gap-6">

              {/* Pre Report */}
<button
  onClick={() => {
    setIsReportModalOpen(false);

    navigate(
      `/doctor/reports/beneficiary/${patient._id}`
    );
  }}
  className="
    flex
    h-40
    flex-col
    items-center
    justify-center
    rounded-2xl
    border
    border-[#35C759]
    bg-[#EDF8F2]
    transition
    hover:scale-105
  "
>
  <FileText
    size={40}
    className="mb-4 text-[#247C5A]"
  />

  <span className="text-xl font-bold text-[#247C5A]">
    التقرير القبلي
  </span>
</button>

              {/* Post Report */}

              <button
                onClick={() => {
                  setIsReportModalOpen(false);

                  navigate(
                    `/doctor/reports/secondary/${patient._id}`
                  );
                }}
                className="
                  flex
                  h-40
                  flex-col
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-[#35C759]
                  bg-[#EDF8F2]
                  transition
                  hover:scale-105
                "
              >

                <FileText
                  size={40}
                  className="mb-4 text-[#247C5A]"
                />

                <span className="text-xl font-bold text-[#247C5A]">
                  التقرير البعدي
                </span>

              </button>

            </div>

          </div>

        </div>

      )}

      </div>
    </main>
  );
};

export default PatientProfilePage;