import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2, Printer } from "lucide-react";
import reportService from "../../services/report.service";

const ReportPreviewPage = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const response = await reportService.getPreReport(reportId);
        setReport(response.data.data || response.data);
      } catch (err) {
        setError("Failed to load the report details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [reportId]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#35C759]" />
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="mt-20 text-center text-xl font-semibold text-red-600">
        {error}
      </div>
    );
  }

  // Helper functions to translate backend enum values to Arabic
  const translateMotivation = (val) => {
    const map = { personal: "شخصي", family: "عائلي", legal: "قانوني", other: "أخرى" };
    return map[val] || val;
  };

  const translatePsychological = (val) => {
    const map = { stable: "مستقر", mild_disorder: "يعاني من اضطراب طفيف", severe_disorder: "يعاني من اضطراب شديد" };
    return map[val] || val;
  };

  const translateBehavioral = (val) => {
    const map = { cooperative: "تعاوني ومتجاوب", hesitant: "متردد", aggressive: "عدواني أو مقاوم" };
    return map[val] || val;
  };

  const translateCommitment = (val) => {
    const map = { high: "عالية", medium: "متوسطة", low: "ضعيفة" };
    return map[val] || val;
  };

  const translateStatus = (status) => {
    const map = { pending: "قيد الانتظار", approved: "معتمد", rejected: "مرفوض" };
    return map[status] || status;
  };

  const patientFullName = report.patient 
    ? `${report.patient.firstName || ""} ${report.patient.middleName || ""} ${report.patient.lastName || ""}`
    : "غير متوفر";

  const teamLeaderFullName = report.teamLeader
    ? `${report.teamLeader.firstName || ""} ${report.teamLeader.lastName || ""}`
    : "غير متوفر";

  return (
    <div
      dir="rtl"
      className="min-h-screen font-['Cairo',sans-serif] text-[15px] leading-[1.9] text-[#27343A]"
    >
      <div className="mx-auto my-10 w-full max-w-[1100px] px-5 md:px-10">
        
        {/* Header Actions */}
        <div className="mb-8 flex items-center justify-between print:hidden">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <ArrowRight size={20} />
            رجوع
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-xl bg-[#34C759] px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-[#2FB350]"
          >
            <Printer size={20} />
            طباعة التقرير
          </button>
        </div>

        {/* ================= LETTERHEAD ================= */}
        <header className="rounded-[28px] border border-[#E7F0EB] bg-white/95 p-[28px] shadow-[0_10px_35px_rgba(30,122,90,0.08)]">
          <div className="mb-8 flex flex-wrap items-center justify-center gap-12">
            <img src="/logo.png" alt="Logo" className="h-16 object-contain" />
            <img src="/logo2.png" alt="Logo" className="h-16 object-contain" />
          </div>
          <div className="my-6 h-[2px] w-full bg-gradient-to-r from-transparent via-[#34C759] to-transparent" />
          <div className="flex flex-col justify-between gap-6 md:flex-row">
            <div>
              <h1 className="text-3xl font-bold text-[#1E7A5A]">التقرير القبلي</h1>
              <p className="mt-2 text-gray-500">برنامج التأهيل والتعافي</p>
            </div>
            <div className="rounded-full bg-[#EAF5F0] px-6 py-3 font-bold text-[#1E7A5A]">
              نسخة معاينة
            </div>
          </div>
        </header>

        {/* ================= BASIC INFORMATION ================= */}
        <section className="mt-12">
          <div className="rounded-[22px] border border-[#E7F0EB] bg-white p-8 shadow-[0_10px_35px_rgba(30,122,90,0.08)]">
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-[#1E7A5A]">اسم المستفيد</span>
                <div className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 font-medium">
                  {patientFullName}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-[#1E7A5A]">اسم البرنامج</span>
                <div className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 font-medium">
                  {report.reportInformation?.programName || "-"}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-[#1E7A5A]">تاريخ بداية البرنامج</span>
                <div className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 font-medium">
                  {report.reportInformation?.startDate ? new Date(report.reportInformation.startDate).toLocaleDateString("en-CA") : "-"}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-[#1E7A5A]">رقم الهوية</span>
                <div className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 font-medium">
                  {report.patient?.nationalId || "-"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 01 GENERAL INFORMATION ================= */}
        <section className="mt-12">
          <div className="mb-6 flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF5F0] font-bold text-[#1E7A5A]">01</span>
            <h2 className="text-2xl font-bold text-[#1E7A5A]">معلومات عامة عن الحالة</h2>
          </div>
          <div className="rounded-[22px] border border-[#E7F0EB] bg-white p-8 shadow-[0_10px_35px_rgba(30,122,90,0.08)]">
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-[#1E7A5A]">شدة الإدمان</span>
                <div className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 font-medium">
                  {report.generalCaseInformation?.addictionSeverity || "-"}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-[#1E7A5A]">نوع التعاطي السابق</span>
                <div className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 font-medium">
                  {report.generalCaseInformation?.previousSubstanceType || "-"}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-[#1E7A5A]">مدة التعاطي</span>
                <div className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 font-medium">
                  {report.generalCaseInformation?.addictionDuration || "-"}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-[#1E7A5A]">عدد محاولات التعافي السابقة</span>
                <div className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 font-medium">
                  {report.generalCaseInformation?.previousRecoveryAttempts || "0"}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <span className="mb-4 block font-semibold text-[#1E7A5A]">الدافع للالتحاق بالبرنامج</span>
              <div className="flex flex-wrap gap-4">
                {report.generalCaseInformation?.motivations?.length > 0 ? (
                  report.generalCaseInformation.motivations.map((mot, index) => (
                    <div key={index} className="flex items-center gap-3 rounded-xl border border-[#E7F0EB] bg-[#F8FCFA] px-5 py-3 font-medium">
                      <div className="h-2 w-2 rounded-full bg-[#34C759]"></div>
                      {translateMotivation(mot)}
                    </div>
                  ))
                ) : (
                  <span className="text-gray-500">-</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ================= 02 INITIAL EVALUATIONS ================= */}
        <section className="mt-12">
          <div className="mb-6 flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF5F0] font-bold text-[#1E7A5A]">02</span>
            <h2 className="text-2xl font-bold text-[#1E7A5A]">التقييمات الأولية</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-[22px] border border-[#E7F0EB] bg-white p-7 shadow-[0_10px_30px_rgba(30,122,90,0.08)]">
              <h3 className="mb-6 border-b border-[#E7F0EB] pb-4 text-center text-lg font-bold text-[#1E7A5A]">التقييم النفسي الأولي</h3>
              <div className="rounded-xl border border-[#34C759] bg-[#F5FCF7] px-4 py-4 text-center font-bold text-[#1E7A5A]">
                {translatePsychological(report.initialEvaluations?.psychologicalStatus)}
              </div>
            </div>
            <div className="rounded-[22px] border border-[#E7F0EB] bg-white p-7 shadow-[0_10px_30px_rgba(30,122,90,0.08)]">
              <h3 className="mb-6 border-b border-[#E7F0EB] pb-4 text-center text-lg font-bold text-[#1E7A5A]">التقييم السلوكي</h3>
              <div className="rounded-xl border border-[#34C759] bg-[#F5FCF7] px-4 py-4 text-center font-bold text-[#1E7A5A]">
                {translateBehavioral(report.initialEvaluations?.behavioralStatus)}
              </div>
            </div>
            <div className="rounded-[22px] border border-[#E7F0EB] bg-white p-7 shadow-[0_10px_30px_rgba(30,122,90,0.08)]">
              <h3 className="mb-6 border-b border-[#E7F0EB] pb-4 text-center text-lg font-bold text-[#1E7A5A]">القدرة على الالتزام بالبرنامج</h3>
              <div className="rounded-xl border border-[#34C759] bg-[#F5FCF7] px-4 py-4 text-center font-bold text-[#1E7A5A]">
                {translateCommitment(report.initialEvaluations?.programCommitment)}
              </div>
            </div>
          </div>
        </section>

        {/* ================= 03 RECOMMENDATIONS ================= */}
        <section className="mt-12">
          <div className="mb-6 flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF5F0] font-bold text-[#1E7A5A]">03</span>
            <h2 className="text-2xl font-bold text-[#1E7A5A]">التوصيات الأولية</h2>
          </div>
          <div className="rounded-[22px] border border-[#E7F0EB] bg-white p-8 shadow-[0_10px_35px_rgba(30,122,90,0.08)]">
            <div className="min-h-[150px] w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 font-medium leading-relaxed">
              {report.initialRecommendations?.recommendations || "-"}
            </div>
          </div>
        </section>

        {/* ================= 04 SIGNATURES ================= */}
        <section className="mt-12">
          <div className="mb-6 flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF5F0] font-bold text-[#1E7A5A]">04</span>
            <h2 className="text-2xl font-bold text-[#1E7A5A]">الاعتماد والتوقيعات</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            
            {/* Doctor Info */}
            <div className="rounded-[22px] border border-[#E7F0EB] bg-white p-8 shadow-[0_10px_35px_rgba(30,122,90,0.08)]">
              <h3 className="mb-8 border-b border-[#E7F0EB] pb-4 text-center text-xl font-bold text-[#1E7A5A]">مرشد التعافي (مُنشئ التقرير)</h3>
              <div className="space-y-6">
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="font-semibold text-gray-500">الاسم</span>
                  <span className="font-bold text-[#1E7A5A]">
                    {report.doctor ? `${report.doctor.firstName} ${report.doctor.lastName}` : "-"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="font-semibold text-gray-500">تاريخ الإنشاء</span>
                  <span className="font-bold text-[#1E7A5A]">
                    {new Date(report.createdAt).toLocaleDateString("en-CA")}
                  </span>
                </div>
              </div>
            </div>

            {/* Team Leader / Approval Info */}
            <div className="rounded-[22px] border border-[#E7F0EB] bg-white p-8 shadow-[0_10px_35px_rgba(30,122,90,0.08)]">
              <h3 className="mb-8 border-b border-[#E7F0EB] pb-4 text-center text-xl font-bold text-[#1E7A5A]">رئيس الفريق (الاعتماد)</h3>
              <div className="space-y-6">
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="font-semibold text-gray-500">الاسم</span>
                  <span className="font-bold text-[#1E7A5A]">{teamLeaderFullName}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="font-semibold text-gray-500">حالة الاعتماد</span>
                  <span className={`font-bold ${
                    report.approval?.status === "approved" ? "text-green-600" :
                    report.approval?.status === "rejected" ? "text-red-600" :
                    "text-yellow-600"
                  }`}>
                    {translateStatus(report.approval?.status)}
                  </span>
                </div>
                {report.approval?.approvedAt && (
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="font-semibold text-gray-500">تاريخ الاعتماد</span>
                    <span className="font-bold text-[#1E7A5A]">
                      {new Date(report.approval.approvedAt).toLocaleDateString("en-CA")}
                    </span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default ReportPreviewPage;