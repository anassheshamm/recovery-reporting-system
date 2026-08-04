import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, House } from "lucide-react";

const BackButton = ({ showHome = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. List all the "Main" pages where the back button SHOULD NOT appear
  const hideOnPages = [
    "/",
    "/admin",
    "/admin/doctors",
    "/admin/patients",
    "/admin/heads",
    "/doctor",
    "/team-leader",
    "/team-leader/doctors",
    "/team-leader/patients",
  ];

  // 2. If the current URL is in the list above, don't render anything!
  if (hideOnPages.includes(location.pathname)) {
    return null;
  }

  const handleHome = () => {
    if (location.pathname.startsWith("/doctor")) {
      navigate("/doctor");
    } else if (
      location.pathname.startsWith("/team-leader")
    ) {
      navigate("/team-leader");
    } else if (
      location.pathname.startsWith("/admin")
    ) {
      navigate("/admin");
    }
  };

  // 3. Otherwise, show the button(s)
  return (
    <div className="mb-6 flex justify-between print:hidden">
      {showHome ? (
        <button
          onClick={handleHome}
          type="button"
          className="flex w-fit items-center gap-2 rounded-xl bg-[#35C759] px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-[#2FB350] active:scale-95"
        >
          <House size={20} />
          <span>الرئيسية</span>
        </button>
      ) : (
        <div />
      )}

      <button
        onClick={() => navigate(-1)}
        type="button"
        className="flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-95"
      >
        <ArrowRight size={20} className="text-[#35C759]" />
        <span>رجوع</span>
      </button>
    </div>
  );
};

export default BackButton;