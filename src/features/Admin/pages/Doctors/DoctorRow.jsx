import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const DoctorRow = ({ doctor }) => {
  return (
    <div dir="rtl">
    <tr className="border-t border-[#EDF2EF] transition hover:bg-[#FAFCFB]">
      <td className="px-8 py-6 font-medium text-[#202020]">
        {doctor.name}
      </td>

      <td className="px-8 py-6">
        {doctor.nationalId}
      </td>

      <td className="px-8 py-6">
        {doctor.phone}
      </td>

      <td className="px-8 py-6">
        {doctor.license}
      </td>

      <td className="px-8 py-6">
        {doctor.email}
      </td>

      <td className="px-8 py-6 text-center font-semibold">
        {doctor.patients}
      </td>

      <td className="px-8 py-6">
        <div className="flex justify-center">
          <Link
            to={`/admin/doctors/${doctor.id}`}
            className="flex items-center gap-2 text-[#247C5A] transition hover:opacity-80"
          >
            <Eye size={18} />

            <span className="font-medium">
              Preview
            </span>
          </Link>
        </div>
      </td>
    </tr></div>
  );
};

export default DoctorRow;