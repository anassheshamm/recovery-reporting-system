import { useState } from "react";
import { X } from "lucide-react";

const InviteMemberModal = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !role) return;

    // TODO:
    // await inviteMember({ email, role });

    console.log({
      email,
      role,
    });

    setEmail("");
    setRole("");
    onClose();
  };

  const handleClose = () => {
    setEmail("");
    setRole("");
    onClose();
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
    >
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

          <button
            onClick={handleClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-bold text-[#1F2937]">
            دعوة عضو جديد
          </h2>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >

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
              "
            >
              <option value="">اختر نوع الحساب</option>
              <option value="doctor">معالج</option>
              <option value="head_of_department">
                رئيس قسم
              </option>
              <option value="admin">مدير</option>
            </select>
          </div>

          {/* Buttons */}

          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={handleClose}
              className="
                flex-1
                rounded-xl
                border
                border-gray-300
                py-3
                font-medium
                transition
                hover:bg-gray-100
              "
            >
              إلغاء
            </button>

            <button
              type="submit"
              disabled={!email || !role}
              className="
                flex-1
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
              إرسال الدعوة
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default InviteMemberModal;