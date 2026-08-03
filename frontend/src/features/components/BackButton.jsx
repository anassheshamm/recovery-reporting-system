import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    // The "flex justify-end" wrapper pushes the button to the left in RTL
    <div className="mb-6 flex justify-end print:hidden">
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