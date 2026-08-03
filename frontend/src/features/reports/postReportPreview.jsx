import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2, Printer } from "lucide-react";
import api from "../../services/api";

const PostReportPreview = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        // Using api directly to hit the new post-reports endpoint
        const response = await api.get(`/post-reports/${reportId}`);
        setReport(response.data.data || response.data);
      } catch (err) {
        setError("فشل في تحميل تفاصيل التقرير البعدي.");
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

  // ==========================================
  // Translation Dictionaries (Backend Enums -> Arabic)
  // ==========================================
  const translateSeverity = (val) => {
    const map = { mild: "خفيفة", moderate: "متوسطة", severe: "شديدة" };
    return map[val] || val;
  };

  const translatePsychological = (val) => {
    const map = { significant_improvement: "تحسن ملحوظ", moderate_improvement: "تحسن متوسط", no_improvement: "لا يوجد تحسن" };
    return map[val] || val;
  };

  const translateBehavioral = (val) => {
    const map = { high_commitment: "التزام عالي", medium_commitment: "التزام متوسط", difficulty_commitment: "صعوبة في الالتزام" };
    return map[val] || val;
  };

  const translateSocial = (val) => {
    const map = { positive_interaction: "تفاعل إيجابي", limited_interaction: "تفاعل محدود", social_isolation: "عزلة اجتماعية" };
    return map[val] || val;
  };

  const translateOverall = (val) => {
    const map = { excellent: "ملحوظ جداً", good: "جيد", limited: "محدود" };
    return map[val] || val;
  };

  const translateTreatment = (val) => {
    const map = { fully_committed: "ملتزم تماماً", partially_committed: "ملتزم جزئياً", not_committed: "غير ملتزم" };
    return map[val] || val;
  };

  const translateActivity = (val) => {
    const map = { active: "نشط", average: "متوسط", weak: "ضعيف" };
    return map[val] || val;
  };

  const translateEmotional = (val) => {
    const map = { stable: "مستقرة", fluctuating: "متقلبة", disturbed: "مضطربة" };
    return map[val] || val;
  };

  const translateFamily = (val) => {
    const map = { improved: "تحسنت", unchanged: "لا تتغير", still_tense: "لا تزال متوترة" };
    return map[val] || val;
  };

  const translateCommunity = (val) => {
    const map = { ready: "جاهز", needs_support: "يحتاج دعم إضافي", not_ready: "غير مستعد حالياً" };
    return map[val] || val;
  };

  const translateStability = (val) => {
    const map = { very_good: "جيد جداً", acceptable: "مقبول", weak: "ضعيف" };
    return map[val] || val;
  };

  const translateReadiness = (val) => {
    const map = { ready: "جاهز", under_development: "قيد التطوير", not_ready: "غير مستعد" };
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
    <div dir="rtl" className="min-h-screen font-['Cairo',sans-serif] text-[15px] leading-[1.9] text-[#27343A]">
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
              <h1 className="text-3xl font-bold text-[#1E7A5A]">التقرير الخاص بالمستفيد</h1>
              <p className="mt-2 text-gray-500">تقرير متابعة وتقييم المتعافي</p>
            </div>
            <div className="rounded-full bg-[#EAF5F0] border border-[#1E7A5A]/10 px-8 py-3 font-bold text-[#1E7A5A]">
              بعدي (نسخة معاينة)
            </div>
          </div>
        </header>

        {/* ================= 1. PATIENT INFO ================= */}
        <section className="mt-12">
          <div className="mb-6 flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF5F0] font-bold text-[#1E7A5A]">1</span>
            <h2 className="text-2xl font-bold text-[#1E7A5A]">بيانات المستفيد</h2>
          </div>
          <div className="rounded-[22px] border border-[#E7F0EB] bg-white p-8 shadow-[0_10px_35px_rgba(30,122,90,0.08)]">
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-[#1E7A5A]">اسم المستفيد</span>
                <div className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 font-medium">{patientFullName}</div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-[#1E7A5A]">اسم البرنامج</span>
                <div className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 font-medium">{report.beneficiaryInformation?.programName || "-"}</div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-[#1E7A5A]">تاريخ البدء</span>
                <div className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 font-medium">
                  {report.beneficiaryInformation?.startDate ? new Date(report.beneficiaryInformation.startDate).toLocaleDateString("en-CA") : "-"}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-[#1E7A5A]">تاريخ التخرج</span>
                <div className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 font-medium">
                  {report.beneficiaryInformation?.graduationDate ? new Date(report.beneficiaryInformation.graduationDate).toLocaleDateString("en-CA") : "-"}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-[#1E7A5A]">رقم الهوية</span>
                <div className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 font-medium">{report.patient?.nationalId || "-"}</div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-[#1E7A5A]">اسم المرشد</span>
                <div className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 font-medium">{report.beneficiaryInformation?.counselorName || "-"}</div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 2. CASE SUMMARY ================= */}
        <section className="mt-12">
          <div className="mb-6 flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF5F0] font-bold text-[#1E7A5A]">2</span>
            <h2 className="text-2xl font-bold text-[#1E7A5A]">ملخص الحالة المتعلق بتعديل الوضع</h2>
          </div>
          <div className="rounded-[22px] border border-[#E7F0EB] bg-white p-8 shadow-[0_10px_35px_rgba(30,122,90,0.08)]">
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-[#1E7A5A]">ملخص الحالة</span>
              <div className="min-h-[120px] w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 font-medium leading-relaxed">
                {report.caseSummary?.summary || "-"}
              </div>
            </div>
            <div className="my-8 h-[1px] w-full bg-[#E7F0EB]"></div>
            <div className="flex items-center gap-4">
              <span className="font-semibold text-[#1E7A5A]">شدة الإدمان:</span>
              <div className="rounded-xl bg-[#F8FCFA] border border-[#E7F0EB] px-6 py-2 font-bold text-[#1E7A5A]">
                {translateSeverity(report.caseSummary?.addictionSeverity)}
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3. PROGRESS ASSESSMENT ================= */}
        <section className="mt-12">
          <div className="mb-6 flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF5F0] font-bold text-[#1E7A5A]">3</span>
            <h2 className="text-2xl font-bold text-[#1E7A5A]">قياس التقدم في الجوانب التالية</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-[20px] border border-[#E7F0EB] bg-white p-7 shadow-[0_8px_24px_rgba(30,122,90,0.05)]">
              <h3 className="mb-6 border-b border-[#E7F0EB] pb-4 text-center text-lg font-bold text-[#1E7A5A]">الجانب النفسي</h3>
              <div className="rounded-xl border border-[#34C759] bg-[#F5FCF7] px-4 py-4 text-center font-bold text-[#1E7A5A]">
                {translatePsychological(report.progressAssessment?.psychologicalStatus)}
              </div>
            </div>
            <div className="rounded-[20px] border border-[#E7F0EB] bg-white p-7 shadow-[0_8px_24px_rgba(30,122,90,0.05)]">
              <h3 className="mb-6 border-b border-[#E7F0EB] pb-4 text-center text-lg font-bold text-[#1E7A5A]">الجانب السلوكي</h3>
              <div className="rounded-xl border border-[#34C759] bg-[#F5FCF7] px-4 py-4 text-center font-bold text-[#1E7A5A]">
                {translateBehavioral(report.progressAssessment?.behavioralStatus)}
              </div>
            </div>
            <div className="rounded-[20px] border border-[#E7F0EB] bg-white p-7 shadow-[0_8px_24px_rgba(30,122,90,0.05)]">
              <h3 className="mb-6 border-b border-[#E7F0EB] pb-4 text-center text-lg font-bold text-[#1E7A5A]">الجانب الاجتماعي</h3>
              <div className="rounded-xl border border-[#34C759] bg-[#F5FCF7] px-4 py-4 text-center font-bold text-[#1E7A5A]">
                {translateSocial(report.progressAssessment?.socialStatus)}
              </div>
            </div>
          </div>
        </section>

        {/* ================= 4. PROGRAM PROGRESS ================= */}
        <section className="mt-12">
          <div className="mb-6 flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF5F0] font-bold text-[#1E7A5A]">4</span>
            <h2 className="text-2xl font-bold text-[#1E7A5A]">مدى تقدم المتعافي في البرنامج</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[
              { title: "التحسن العام", val: translateOverall(report.programProgress?.overallImprovement) },
              { title: "الالتزام بالخطة العلاجية", val: translateTreatment(report.programProgress?.treatmentCommitment) },
              { title: "المشاركة في الأنشطة", val: translateActivity(report.programProgress?.activityParticipation) },
              { title: "الحالة النفسية والعاطفية", val: translateEmotional(report.programProgress?.emotionalStability) },
              { title: "العلاقة مع الأسرة", val: translateFamily(report.programProgress?.familyRelationship) },
              { title: "الاستعداد للاندماج بالمجتمع", val: translateCommunity(report.programProgress?.communityReadiness) },
            ].map((item, idx) => (
              <div key={idx} className="rounded-[20px] border border-[#E7F0EB] bg-white p-6 shadow-[0_8px_24px_rgba(30,122,90,0.05)]">
                <span className="text-gray-500 font-semibold mb-2 block">{item.title}</span>
                <div className="text-lg font-bold text-[#1E7A5A]">{item.val || "-"}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 5 & 6. STABILITY AND FUTURE ================= */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-[22px] border border-[#E7F0EB] bg-white p-8 shadow-[0_10px_35px_rgba(30,122,90,0.08)]">
             <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF5F0] font-bold text-[#1E7A5A]">5</span>
              <h3 className="text-xl font-bold text-[#1E7A5A]">الاستقرار بدون انتكاسة</h3>
            </div>
            <div className="rounded-xl bg-[#F8FCFA] border border-[#E7F0EB] px-6 py-4 font-bold text-[#1E7A5A] text-center">
              {translateStability(report.recoveryStability)}
            </div>
          </div>

          <div className="rounded-[22px] border border-[#E7F0EB] bg-white p-8 shadow-[0_10px_35px_rgba(30,122,90,0.08)]">
             <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF5F0] font-bold text-[#1E7A5A]">6</span>
              <h3 className="text-xl font-bold text-[#1E7A5A]">خطة ما بعد البرنامج</h3>
            </div>
            <div className="rounded-xl bg-[#F8FCFA] border border-[#E7F0EB] px-6 py-4 font-bold text-[#1E7A5A] text-center">
              {translateReadiness(report.personalPlanReadiness)}
            </div>
          </div>
        </section>

        {/* ================= 7, 8, 9. NOTES AND RECOMMENDATIONS ================= */}
        <section className="mt-12 grid grid-cols-1 gap-6">
          {/* Section 7 */}
          <div className="rounded-[22px] border border-[#E7F0EB] bg-white p-8 shadow-[0_10px_35px_rgba(30,122,90,0.08)]">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF5F0] font-bold text-[#1E7A5A]">7</span>
              <h3 className="text-xl font-bold text-[#1E7A5A]">إشعار الأسرة والعمل خلال فترة التعافي</h3>
            </div>
            <div className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 font-medium leading-relaxed min-h-[100px]">
              {report.familyNotification?.notes || "لا توجد ملاحظات"}
            </div>
          </div>

          {/* Section 8 */}
          <div className="rounded-[22px] border border-[#E7F0EB] bg-white p-8 shadow-[0_10px_35px_rgba(30,122,90,0.08)]">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF5F0] font-bold text-[#1E7A5A]">8</span>
              <h3 className="text-xl font-bold text-[#1E7A5A]">توصيات المرشد</h3>
            </div>
            <div className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 font-medium leading-relaxed min-h-[100px]">
              {report.recommendations || "لا توجد توصيات"}
            </div>
          </div>

          {/* Section 9 */}
          <div className="rounded-[22px] border border-[#E7F0EB] bg-white p-8 shadow-[0_10px_35px_rgba(30,122,90,0.08)]">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF5F0] font-bold text-[#1E7A5A]">9</span>
              <h3 className="text-xl font-bold text-[#1E7A5A]">ملاحظات إضافية</h3>
            </div>
            <div className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 font-medium leading-relaxed min-h-[100px]">
              {report.additionalNotes || "لا توجد ملاحظات"}
            </div>
          </div>
        </section>

        {/* ================= 10. SIGNATURES ================= */}
        <section className="mt-12">
          <div className="mb-6 flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF5F0] font-bold text-[#1E7A5A]">10</span>
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

export default PostReportPreview;