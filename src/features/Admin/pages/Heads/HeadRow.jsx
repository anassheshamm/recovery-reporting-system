import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const HeadRow = ({ head }) => {
  return (
    <tr className="bg-white shadow-sm">
      <td className="rounded-r-2xl px-6 py-5 font-medium text-[#2F2F2F]">
        {head.fullName}
      </td>

      <td className="px-6 py-5 text-gray-600">
        {head.nationalId}
      </td>

      <td className="px-6 py-5 text-gray-600">
        {head.phone}
      </td>

      <td className="px-6 py-5 text-gray-600">
        {head.licenseNumber}
      </td>

      <td className="px-6 py-5 text-gray-600">
        {head.email}
      </td>

      <td className="px-6 py-5 font-medium text-[#2F2F2F]">
        {head.department}
      </td>

      <td className="rounded-l-2xl px-6 py-5">
        <div className="flex justify-center">
          <Link
            to={`/admin/heads/${head.id}`}
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

export default HeadRow;