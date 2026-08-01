// DoctorLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./DoctorSidebar";

const DoctorLayout = () => {
  return (
    <div className="min-h-screen bg-[#FCFEFD]" dir="rtl">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-10 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;