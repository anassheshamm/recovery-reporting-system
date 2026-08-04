import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Plus, Search, LogOut } from "lucide-react"; // <-- FIX: Added LogOut import
import { useAuth } from "../../../context/AuthContext";
import InviteMemberModal from "../InviteMemberModal";

const Sidebar = ({ menu = [], onSearchChange }) => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const handleMemberAdded = () => {
    // Triggers refresh or parent callback if supplied
    setIsInviteModalOpen(false);
  };

  return (
    <>
      <aside
        dir="rtl"
        className="sticky top-0 h-screen w-[320px] shrink-0 border-l border-[#E6F2EC] bg-[#F7FFF9] px-6 py-8 shadow-sm"
      >
        <div className="flex h-full flex-col">
          
          {/* ================= Logos ================= */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
            <img
              src="/logo.png"
              alt="Recovery Logo 1"
              className="w-24 object-contain"
            />
            <img
              src="/logo2.png"
              alt="Recovery Logo 2"
              className="w-24 object-contain"
            />
          </div>

          {/* ================= Invite Member ================= */}
          <button
            type="button"
            onClick={() => setIsInviteModalOpen(true)}
            className="mb-8 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#35C759] text-lg font-semibold text-white transition-all duration-200 hover:bg-[#2FB350] active:scale-[0.98]"
          >
            <Plus size={22} />
            <span>إضافة عضو جديد</span>
          </button>

          {/* ================= Search ================= */}
          <div className="relative mb-8">
            <Search
              size={20}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="ابحث بالاسم أو رقم الهوية"
              className="h-14 w-full rounded-2xl bg-[#EDF8F2] pr-14 pl-4 text-right text-base outline-none transition placeholder:text-gray-500 focus:ring-2 focus:ring-[#247C5A]/10"
            />
          </div>

          {/* ================= Navigation ================= */}
          <nav className="space-y-4">
            {menu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex h-14 items-center justify-center rounded-2xl text-lg font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[#247C5A] text-white shadow-sm"
                      : "bg-[#EDF8F2] text-[#2F2F2F] hover:bg-[#E6F4EC]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Spacer to push everything below to the bottom */}
          <div className="flex-1" />

          {/* ================= Logout ================= */}
          <button
            onClick={handleLogout}
            className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-xl border-2 border-red-100 bg-white text-red-600 transition-all hover:border-red-200 hover:bg-red-50 active:scale-[0.98]"
          >
            <LogOut size={20} />
            <span className="font-semibold">تسجيل الخروج</span>
          </button>

          {/* ================= Footer ================= */}
          <div className="pt-6 text-center text-sm text-gray-400">
            Recovery System © 2026
          </div>
        </div>
      </aside>

      <InviteMemberModal
        open={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onSuccess={handleMemberAdded}
      />
    </>
  );
};

export default Sidebar;