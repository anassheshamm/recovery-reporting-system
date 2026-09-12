import { useState } from "react";
import { Eye, Trash2, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import patientService from "../../services/patient.service";

const PatientRow = ({ patient, onDeleteSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!patient) return null;

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `هل أنت تأكد من حذف ملف المستفيد: ${patient.fullName}؟`
    );

    if (!confirmDelete) return;

    try {
      setIsDeleting(true);
      await patientService.deletePatient(patient._id);
      
      if (onDeleteSuccess) {
        onDeleteSuccess(patient._id);
      }
    } catch (err) {
      console.error("Failed to delete patient:", err);
      alert(
        err.response?.data?.message || "حدث خطأ أثناء محاولة حذف المستفيد"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const renderStatus = (status) => {
    const statusConfig = {
      active: { text: "نشط", className: "bg-green-100 text-green-700" },
      completed: { text: "مكتمل", className: "bg-blue-100 text-blue-700" },
      delayed: { text: "مؤجل", className: "bg-yellow-100 text-yellow-700" },
      discontinued: { text: "منقطع", className: "bg-red-100 text-red-700" },
    };

    const current = statusConfig[status] || statusConfig.active;

    return (
      <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${current.className}`}>
        {current.text}
      </span>
    );
  };

  return (
    <tr className="bg-white text-right shadow-sm transition hover:bg-[#F8FAF9]">
      {/* Full Name */}
      <td className="rounded-r-2xl px-6 py-5 font-medium text-[#2F2F2F]">
        {patient.fullName || "-"}
      </td>

     

      {/* National ID */}
      <td className="px-6 py-5 text-gray-600">
        {patient.nationalId || "-"}
      </td>

      {/* Phone Number */}
      <td className="px-6 py-5 text-gray-600" dir="ltr">
        {patient.phone || "-"}
      </td>

      {/* Join Date */}
      <td className="px-6 py-5 text-gray-600">
        {patient.joinDate || "-"}
      </td>

      {/* Email */}
      <td className="px-6 py-5 text-gray-600">
        {patient.email || "-"}
      </td>

      {/* Status (Read-Only Badge) */}
      <td className="px-6 py-5 text-right">
        {renderStatus(patient.status)}
      </td>

      {/* Actions */}
      <td className="rounded-l-2xl px-6 py-5">
        <div className="flex items-center justify-center gap-2">
          {/* View Details Link */}
          <Link
            to={`/doctor/patient/${patient._id}`}
            className="flex items-center gap-1.5 rounded-xl px-3 py-2 font-medium text-[#35C759] transition hover:bg-[#EDF8F2] active:scale-95"
          >
            <Eye size={18} />
            <span>عرض</span>
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default PatientRow;