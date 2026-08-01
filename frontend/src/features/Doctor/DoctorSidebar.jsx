import { useState } from "react";
import { Plus, Search, FileText } from "lucide-react";
import { Link } from "react-router-dom";
const DoctorSidebar = () => {
  const [search, setSearch] = useState("");

  return (
    <aside
      dir="rtl"
      className="
        sticky
        top-0
        h-screen
        w-[320px]
        shrink-0
        rounded-l-[32px]
        border-l
        border-[#E6F2EC]
        bg-[#F7FFF9]
        px-6
        py-8
        shadow-sm
      "
    >
      <div className="flex h-full flex-col">

        {/* Logo */}

        <div className="mb-10 flex justify-center">
          <img
            src="/logo2.png"
            alt="Recovery"
            className="w-36 object-contain"
          />
        </div>

        {/* Create Patient */}

      <Link to="/doctor/new"
  className="
    mb-6
    flex
    h-14
    w-full
    items-center
    justify-center
    gap-2
    rounded-2xl
    bg-[#35C759]
    text-lg
    font-semibold
    text-white
    transition-all
    duration-200
    hover:bg-[#2FB350]
    active:scale-[0.98]
  "
>
  <Plus size={22} />
  <span>إنشاء ملف مستفيد جديد</span>
</Link>

        {/* Search */}

        <div className="relative mb-6">

          <Search
            size={20}
            className="
              absolute
              right-5
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث بالاسم أو رقم الهوية"
            className="
              h-14
              w-full
              rounded-2xl
              bg-[#EDF8F2]
              pr-14
              pl-4
              text-right
              outline-none
              placeholder:text-gray-500
              focus:ring-2
              focus:ring-[#247C5A]/10
            "
          />

        </div>

        {/* Fill Report */}

        <button
          className="
            mb-10
            flex
            h-12
            w-full
            items-center
            justify-between
            rounded-xl
            border
            border-[#E5E7EB]
            bg-white
            px-4
            transition
            hover:bg-[#F8FAF9]
          "
        >
          <Plus
            size={18}
            className="rounded-md border border-[#35C759] p-0.5 text-[#35C759]"
          />

          <span className="font-medium text-[#2F2F2F]">
            ملء تقرير جديد
          </span>

          <FileText
            size={18}
            className="text-transparent"
          />
        </button>

        {/* Statistics */}

        <div className="space-y-6">

          <div className="flex items-center justify-between text-base">
            <span>عدد المستفيدين</span>

            <span className="font-bold">
              0
            </span>
          </div>

          <div className="flex items-center justify-between text-base">
            <span>عدد التقارير</span>

            <span className="font-bold">
              0
            </span>
          </div>

          <div className="flex items-center justify-between text-base">
            <span>تقارير غير مكتملة</span>

            <span className="font-bold">
              0
            </span>
          </div>

        </div>

        <div className="flex-1" />

      </div>
    </aside>
  );
};

export default DoctorSidebar;