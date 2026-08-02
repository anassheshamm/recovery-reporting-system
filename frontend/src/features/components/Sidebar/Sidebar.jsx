import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Plus, Search } from "lucide-react";

import InviteMemberModal from "../InviteMemberModal";
import logo2 from "/logo2.png";

const Sidebar = ({ menu = [], onSearchChange }) => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleMemberAdded = () => {
    // Triggers refresh or parent callback if supplied
    setIsInviteModalOpen(false);
  };

  return (
    <>
      <aside
        dir="rtl"
        className="
          sticky
          top-0
          h-screen
          w-[310px]
          shrink-0
          rounded-l-[32px]
          border-l
          border-[#E6F2EC]
          bg-[#F5FFF9]
          px-6
          py-8
          shadow-sm
        "
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="mb-10 flex justify-center">
            <img
              src={logo2}
              alt="Logo"
              className="w-40 object-contain"
            />
          </div>

          {/* Invite Member */}
          <button
            type="button"
            onClick={() => setIsInviteModalOpen(true)}
            className="
              mb-8
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
            <span>إضافة عضو جديد</span>
          </button>

          {/* Search */}
          <div className="relative mb-8">
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
              onChange={handleSearchChange}
              placeholder="ابحث بالاسم أو رقم الهوية"
              className="
                h-14
                w-full
                rounded-2xl
                bg-[#EDF8F2]
                pr-14
                pl-4
                text-right
                text-base
                outline-none
                transition
                placeholder:text-gray-500
                focus:ring-2
                focus:ring-[#247C5A]/10
              "
            />
          </div>

          {/* Navigation */}
          <nav className="space-y-4">
            {menu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `
                    flex
                    h-14
                    items-center
                    justify-center
                    rounded-2xl
                    text-lg
                    font-semibold
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "bg-[#247C5A] text-white shadow-sm"
                        : "bg-[#EDF8F2] text-[#2F2F2F] hover:bg-[#E6F4EC]"
                    }
                  `
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Footer */}
          <div className="pt-6 text-center text-sm text-gray-400">
            Recovery System
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