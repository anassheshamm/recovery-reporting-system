import { useState } from "react";
import axios from "axios";
import { X, Loader2 } from "lucide-react";

const InviteMemberModal = ({ open, onClose, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !role) return;

    try {
      setSubmitting(true);
      setError("");

      const token = localStorage.getItem("token"); // Retrieve JWT auth token

      const response = await axios.post(
        `${API_BASE_URL}/users/invite`,
        { email, role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success || response.status === 200 || response.status === 201) {
        setEmail("");
        setRole("");
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "حدث خطأ أثناء إرسال الدعوة، يرجى المحاولة لاحقاً"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (submitting) return;
    setEmail("");
    setRole("");
    setError("");
    onClose();
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <button
            onClick={handleClose}
            disabled={submitting}
            className="rounded-lg p-2 transition hover:bg-gray-100 disabled:opacity-50"
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-bold text-[#1F2937]">
            دعوة عضو جديد
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-center text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              البريد الإلكتروني
            </label>

            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              className="
                h-12
                w-full
                rounded-xl
                border
                border-gray-300
                px-4
                text-right
                outline-none
                transition
                focus:border-[#247C5A]
                focus:ring-2
                focus:ring-[#247C5A]/10
                disabled:bg-gray-100
              "
            />
          </div>

          {/* Role */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              نوع الحساب
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={submitting}
              className="
                h-12
                w-full
                rounded-xl
                border
                border-gray-300
                bg-white
                px-4
                text-right
                outline-none
                transition
                focus:border-[#247C5A]
                focus:ring-2
                focus:ring-[#247C5A]/10
                disabled:bg-gray-100
              "
            >
              <option value="">اختر نوع الحساب</option>
              <option value="doctor">معالج</option>
              <option value="head_of_department">رئيس قسم</option>
              <option value="admin">مدير</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={submitting}
              className="
                flex-1
                rounded-xl
                border
                border-gray-300
                py-3
                font-medium
                transition
                hover:bg-gray-100
                disabled:opacity-50
              "
            >
              إلغاء
            </button>

            <button
              type="submit"
              disabled={!email || !role || submitting}
              className="
                flex
                flex-1
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#35C759]
                py-3
                font-medium
                text-white
                transition
                hover:bg-[#2FB350]
                disabled:cursor-not-allowed
                disabled:bg-gray-300
              "
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>جاري الإرسال...</span>
                </>
              ) : (
                "إرسال الدعوة"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteMemberModal;