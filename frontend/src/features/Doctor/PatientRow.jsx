import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const PatientRow = ({ patient }) => {
  return (
    <tr className="bg-white shadow-sm">
      <td className="rounded-r-2xl px-6 py-5 text-right font-medium text-[#2F2F2F]">
        {patient.fullName}
      </td>

      <td className="px-6 py-5 text-right text-gray-600">
        {patient.age}
      </td>

      <td className="px-6 py-5 text-right text-gray-600">
        {patient.nationalId}
      </td>

      <td className="px-6 py-5 text-right text-gray-600">
        {patient.phone}
      </td>

      <td className="px-6 py-5 text-right text-gray-600">
        {patient.joinDate}
      </td>

      <td className="px-6 py-5 text-right text-gray-600">
        {patient.email}
      </td>

      <td className="rounded-l-2xl px-6 py-5">
        <div className="flex justify-center">
          <Link
            to={`/doctor/patients/${patient._id}`}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              px-4
              py-2
              text-[#35C759]
              transition
              hover:bg-[#EDF8F2]
            "
          >
            <Eye size={18} />

            <span className="font-medium">
              Preview
            </span>
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default PatientRow;