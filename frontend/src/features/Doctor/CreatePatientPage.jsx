import { useState } from "react";
import {
  Calendar,
  Globe,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreatePatientPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",

    nationalId: "",
    birthDate: "",

    gender: "",
    nationality: "",
    profession: "",
    maritalStatus: "",

    phone: "",
    anotherPhone: "",
    guardianPhone: "",
    relation: "",

    email: "",

    country: "",
    city: "",
    street: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend later
    console.log(form);
  };

  const handleSaveAndAddReport = () => {
    // Backend later
    console.log(form);
    navigate(`/doctor/patients/${form.nationalId}`);
  };

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

          المستفيدين

          <span className="mx-2 text-[#35C759]">/</span>

          إضافة مستفيد جديد
        </div>

        {/* Title */}

        <div className="mb-14">

          <h1 className="text-5xl font-bold text-[#111827]">
            إضافة مستفيد جديد
          </h1>

          <p className="mt-3 text-lg text-gray-500">
            يرجى إدخال البيانات الأساسية للمستفيد
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          {/* ========================= */}
          {/* Personal Information */}
          {/* ========================= */}

          <div className="mb-16">

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
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="الاسم الأول"
                  className="
                    h-14
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    px-4
                    text-right
                    outline-none
                    focus:border-[#35C759]
                  "
                />

              </div>

              {/* Middle Name */}

              <div>

                <label className="mb-2 block font-medium">
                  الاسم الثاني
                </label>

                <input
                  type="text"
                  name="middleName"
                  value={form.middleName}
                  onChange={handleChange}
                  placeholder="الاسم الثاني"
                  className="
                    h-14
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    px-4
                    text-right
                    outline-none
                    focus:border-[#35C759]
                  "
                />

              </div>

              {/* Last Name */}

              <div>

                <label className="mb-2 block font-medium">
                  اسم العائلة
                </label>

                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="اسم العائلة"
                  className="
                    h-14
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    px-4
                    text-right
                    outline-none
                    focus:border-[#35C759]
                  "
                />

              </div>

              {/* National ID */}

              <div>

                <label className="mb-2 block font-medium">
                  رقم الهوية
                </label>

                <input
                  type="text"
                  name="nationalId"
                  value={form.nationalId}
                  onChange={handleChange}
                  placeholder="1234567890123"
                  className="
                    h-14
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    px-4
                    text-right
                    outline-none
                    focus:border-[#35C759]
                  "
                />

              </div>

              {/* Gender */}

              <div>

                <label className="mb-2 block font-medium">
                  الجنس
                </label>

                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="
                    h-14
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    text-right
                    outline-none
                    focus:border-[#35C759]
                  "
                >
                  <option value="">
                    اختر
                  </option>

                  <option value="male">
                    ذكر
                  </option>

                  <option value="female">
                    أنثى
                  </option>

                </select>

              </div>

              {/* Nationality */}

              <div>

                <label className="mb-2 block font-medium">
                  الجنسية
                </label>

                <div className="relative">

                  <Globe
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
                    type="text"
                    name="nationality"
                    value={form.nationality}
                    onChange={handleChange}
                    placeholder="السعودية"
                    className="
                      h-14
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      pr-4
                      pl-12
                      text-right
                      outline-none
                      focus:border-[#35C759]
                    "
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
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                  />

                  <input
                    type="date"
                    name="birthDate"
                    value={form.birthDate}
                    onChange={handleChange}
                    className="
                      h-14
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      pr-4
                      pl-12
                      text-right
                      outline-none
                      focus:border-[#35C759]
                    "
                  />

                </div>

              </div>

              {/* Profession */}

              <div>

                <label className="mb-2 block font-medium">
                  المهنة
                </label>

                <input
                  type="text"
                  name="profession"
                  value={form.profession}
                  onChange={handleChange}
                  placeholder="المهنة"
                  className="
                    h-14
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    px-4
                    text-right
                    outline-none
                    focus:border-[#35C759]
                  "
                />

              </div>

              {/* Marital Status */}

              <div>

                <label className="mb-2 block font-medium">
                  الحالة الاجتماعية
                </label>

                <select
                  name="maritalStatus"
                  value={form.maritalStatus}
                  onChange={handleChange}
                  className="
                    h-14
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    text-right
                    outline-none
                    focus:border-[#35C759]
                  "
                >
                  <option value="">
                    اختر
                  </option>

                  <option value="single">
                    أعزب
                  </option>

                  <option value="married">
                    متزوج
                  </option>

                  <option value="divorced">
                    مطلق
                  </option>

                  <option value="widowed">
                    أرمل
                  </option>

                </select>

              </div>

            </div>

          </div>
                    {/* ========================= */}
          {/* Contact Information */}
          {/* ========================= */}

          <div className="mb-16">

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
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+966 5XXXXXXXX"
                  className="
                    h-14
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    px-4
                    text-right
                    outline-none
                    focus:border-[#35C759]
                  "
                />

              </div>

              {/* Another Phone */}

              <div>

                <label className="mb-2 block font-medium">
                  رقم الهاتف الآخر
                </label>

                <input
                  type="tel"
                  name="anotherPhone"
                  value={form.anotherPhone}
                  onChange={handleChange}
                  placeholder="+966 5XXXXXXXX"
                  className="
                    h-14
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    px-4
                    text-right
                    outline-none
                    focus:border-[#35C759]
                  "
                />

              </div>

              {/* Guardian Phone */}

              <div>

                <label className="mb-2 block font-medium">
                  رقم هاتف الكفيل
                </label>

                <input
                  type="tel"
                  name="guardianPhone"
                  value={form.guardianPhone}
                  onChange={handleChange}
                  placeholder="+966 5XXXXXXXX"
                  className="
                    h-14
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    px-4
                    text-right
                    outline-none
                    focus:border-[#35C759]
                  "
                />

              </div>
                 <div >

                  <label className="mb-2 block font-medium">
                    الدولة
                  </label>

                  <input
                    type="text"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="الدولة"
                    className="
                      h-14
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      pr-4
                      pl-12
                      text-right
                      outline-none
                      focus:border-[#35C759]
                    "
                  />

                </div>

              {/* Relation */}

              <div>

                <label className="mb-2 block font-medium">
                  صلة القرابة
                </label>

                <select
                  name="relation"
                  value={form.relation}
                  onChange={handleChange}
                  className="
                    h-14
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    text-right
                    outline-none
                    focus:border-[#35C759]
                  "
                >
                  <option value="">
                    اختر
                  </option>

                  <option value="father">
                    الأب
                  </option>

                  <option value="mother">
                    الأم
                  </option>

                  <option value="brother">
                    الأخ
                  </option>

                  <option value="sister">
                    الأخت
                  </option>

                  <option value="husband">
                    الزوج
                  </option>

                  <option value="wife">
                    الزوجة
                  </option>

                  <option value="relative">
                    قريب
                  </option>

                </select>

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
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="
                      h-14
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      pr-4
                      pl-12
                      text-right
                      outline-none
                      focus:border-[#35C759]
                    "
                  />
                  

                </div>
              


              </div>

            </div>

            

          </div>
                    {/* ========================= */}
          {/* Buttons */}
          {/* ========================= */}

          <div className="mt-16 flex items-center justify-center gap-4">

            <button
              type="submit"
              className="
                rounded-xl
                bg-[#35C759]
                px-8
                py-4
                text-lg
                font-semibold
                text-white
                transition
                hover:bg-[#2FB350]
              "
            >
              حفظ المعلومات
            </button>

            <button
              type="button"
              onClick={handleSaveAndAddReport}
              className="
                rounded-xl
                border
                border-[#35C759]
                px-8
                py-4
                text-lg
                font-semibold
                text-[#247C5A]
                transition
                hover:bg-[#EDF8F2]
              "
            >
              إضافة تقرير للملف
            </button>

          </div>

        </form>

      </div>
    </main>
  );
};

export default CreatePatientPage;
