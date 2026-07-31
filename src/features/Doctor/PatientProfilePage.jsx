import { useEffect } from "react";
import {
  Calendar,
  Globe,
  User,
  Trash2,
  Pencil,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const PatientProfilePage = () => {
  const navigate = useNavigate();
  const { state: patient } = useLocation();

  useEffect(() => {
    if (!patient) {
      navigate("/doctor/patients");
    }
  }, [patient, navigate]);

  if (!patient) return null;

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#FCFEFD] px-10 py-10"
    >
      <div className="mx-auto max-w-[1500px]">

        {/* Breadcrumb */}

        <div className="mb-8 text-lg text-gray-400">
          الرئيسية
          <span className="mx-2 text-[#35C759]">/</span>
          المستفيد
          <span className="mx-2 text-[#35C759]">/</span>
          ملف المستفيد
        </div>

        {/* Header */}

        <div className="mb-12 flex items-start justify-between">

          <div>
            <h1 className="text-5xl font-bold text-[#111827]">
              ملف المستفيد
            </h1>

            <p className="mt-3 text-lg text-gray-500">
              قاعدة البيانات الخاصة بالمستفيد
            </p>
          </div>

          <div className="flex gap-4">

            <button
              onClick={() =>
                navigate("/doctor/edit-patient", {
                  state: patient,
                })
              }
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-[#35C759]
                px-7
                py-4
                font-semibold
                text-white
                transition
                hover:bg-[#2FB350]
              "
            >
              <Pencil size={18} />
              تعديل معلومات المستفيد
            </button>

            <button
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-[#35C759]
                px-7
                py-4
                font-semibold
                text-[#247C5A]
                transition
                hover:bg-[#EDF8F2]
              "
            >
              <Trash2 size={18} />
              حذف المستفيد
            </button>

          </div>

        </div>

        {/* ========================= */}
        {/* Personal Information */}
        {/* ========================= */}

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

            {/* First Name */}

            <div>

              <label className="mb-2 block font-medium">
                الاسم الأول
              </label>

              <input
                readOnly
                value={patient.firstName}
                className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4"
              />

            </div>

            {/* Middle Name */}

            <div>

              <label className="mb-2 block font-medium">
                الاسم الثاني
              </label>

              <input
                readOnly
                value={patient.middleName}
                className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4"
              />

            </div>

            {/* Last Name */}

            <div>

              <label className="mb-2 block font-medium">
                اسم العائلة
              </label>

              <input
                readOnly
                value={patient.lastName}
                className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4"
              />

            </div>

            {/* National ID */}

            <div>

              <label className="mb-2 block font-medium">
                رقم الهوية
              </label>

              <input
                readOnly
                value={patient.nationalId}
                className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4"
              />

            </div>

            {/* Gender */}

            <div>

              <label className="mb-2 block font-medium">
                الجنس
              </label>

              <input
                readOnly
                value={patient.gender}
                className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4"
              />

            </div>

            {/* Nationality */}

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
                  value={patient.nationality}
                  className="h-14 w-full rounded-xl border border-gray-300 bg-white pr-4 pl-12"
                />

              </div>

            </div>

            {/* Birth Date */}

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
                  value={patient.birthDate}
                  className="h-14 w-full rounded-xl border border-gray-300 bg-white pr-4 pl-12"
                />

              </div>

            </div>
                        {/* Profession */}

            <div>

              <label className="mb-2 block font-medium">
                المهنة
              </label>

              <input
                readOnly
                value={patient.profession}
                className="
                  h-14
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                "
              />

            </div>

            {/* Marital Status */}

            <div>

              <label className="mb-2 block font-medium">
                الحالة الاجتماعية
              </label>

              <input
                readOnly
                value={patient.maritalStatus}
                className="
                  h-14
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                "
              />

            </div>

          </div>

        </section>

        {/* ========================= */}
        {/* Contact Information */}
        {/* ========================= */}

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

            {/* Phone */}

            <div>

              <label className="mb-2 block font-medium">
                رقم الهاتف
              </label>

              <input
                readOnly
                value={patient.phone}
                className="
                  h-14
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                "
              />

            </div>

            {/* Another Phone */}

            <div>

              <label className="mb-2 block font-medium">
                رقم الهاتف الآخر
              </label>

              <input
                readOnly
                value={patient.anotherPhone}
                className="
                  h-14
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                "
              />

            </div>

            {/* Guardian Phone */}

            <div>

              <label className="mb-2 block font-medium">
                رقم هاتف الكفيل
              </label>

              <input
                readOnly
                value={patient.guardianPhone}
                className="
                  h-14
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                "
              />

            </div>

            {/* Country */}

            <div>

              <label className="mb-2 block font-medium">
                الدولة
              </label>

              <input
                readOnly
                value={patient.country}
                className="
                  h-14
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                "
              />

            </div>

            {/* City */}

            <div>

              <label className="mb-2 block font-medium">
                المدينة
              </label>

              <input
                readOnly
                value={patient.city}
                className="
                  h-14
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                "
              />

            </div>

            {/* Street */}

            <div>

              <label className="mb-2 block font-medium">
                العنوان
              </label>

              <input
                readOnly
                value={patient.street}
                className="
                  h-14
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                "
              />

            </div>

            {/* Relation */}

            <div>

              <label className="mb-2 block font-medium">
                صلة القرابة
              </label>

              <input
                readOnly
                value={patient.relation}
                className="
                  h-14
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                "
              />

            </div>

            {/* Email */}

            <div className="col-span-2">

              <label className="mb-2 block font-medium">
                البريد الإلكتروني
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  readOnly
                  value={patient.email}
                  className="
                    h-14
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    pr-4
                    pl-12
                  "
                />

              </div>

            </div>

          </div>

        </section>
                {/* ========================= */}
        {/* Reports */}
        {/* ========================= */}

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
                  التقارير الخاصة بالمستفيد
                </h2>

                <p className="mt-1 text-gray-500">
                  جميع التقارير المرتبطة بالمستفيد
                </p>

              </div>

            </div>

            <button
              onClick={() =>
                navigate(`/doctor/add-report/${patient.nationalId}`)
              }
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-[#35C759]
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:bg-[#2FB350]
              "
            >
              <Plus size={18} />
              إضافة تقرير جديد
            </button>

          </div>

          {/* Table */}

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

            <table className="w-full">

              <thead className="bg-[#F8FAFC]">

                <tr className="text-right text-gray-600">

                  <th className="px-8 py-5 font-semibold">
                    عنوان التقرير
                  </th>

                  <th className="px-8 py-5 font-semibold">
                    البرنامج المسجل به
                  </th>

                  <th className="px-8 py-5 font-semibold">
                    المشرف
                  </th>

                  <th className="px-8 py-5 font-semibold">
                    تاريخ الإنشاء
                  </th>

                  <th className="px-8 py-5 font-semibold text-center">
                    الإجراءات
                  </th>

                </tr>

              </thead>

              <tbody>

                {patient.reports?.length ? (

                  patient.reports.map((report) => (

                    <tr
                      key={report.id}
                      className="border-t border-gray-200 hover:bg-[#FAFAFA]"
                    >

                      <td className="px-8 py-6 font-medium">
                        {report.title}
                      </td>

                      <td className="px-8 py-6">
                        {report.program}
                      </td>

                      <td className="px-8 py-6">
                        {report.supervisor}
                      </td>

                      <td className="px-8 py-6">
                        {report.createdAt}
                      </td>

                      <td className="px-8 py-6">

                        <div className="flex items-center justify-center gap-3">

                          <button
                            className="
                              rounded-lg
                              bg-[#EDF8F2]
                              p-2
                              transition
                              hover:bg-[#DDF4E5]
                            "
                          >
                            <Eye
                              size={18}
                              className="text-[#247C5A]"
                            />
                          </button>

                          <button
                            className="
                              rounded-lg
                              bg-[#EDF8F2]
                              p-2
                              transition
                              hover:bg-[#DDF4E5]
                            "
                          >
                            <Download
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
                      className="
                        py-16
                        text-center
                        text-lg
                        text-gray-400
                      "
                    >
                      لا توجد تقارير لهذا المستفيد
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </section>

      </div>

    </main>

  );
};

export default PatientProfilePage;