import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostReportPage = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  // State mapping for all form fields
  const [formData, setFormData] = useState({
    // Section 1
    beneficiaryName: "",
    advisorName: "",
    programName: "",
    startDate: "",
    graduationDate: "",

    // Section 2
    caseSummary: "",
    addictionSeverity: "",

    // Section 3
    psychological: "",
    behavioral: "",
    social: "",

    // Section 4
    overallImprovement: "",
    treatmentPlan: "",
    activitiesParticipation: "",
    emotionalState: "",
    familyRelationship: "",
    communityReadiness: "",

    // Section 5 & 6
    stability: "",
    futurePlan: "",

    // Section 7, 8, 9
    familyEmployerNotice: "",
    advisorRecommendations: "",
    additionalNotes: "",

    // Section 10
    advisorSignatureName: "",
    advisorSignature: "",
    advisorDate: "",
    teamLeaderName: "",
    
    teamLeaderSignature: "",
    teamLeaderDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Placeholder for API Call
    console.log("Submitting Post Report:", formData);
    
    setTimeout(() => {
      alert("تم حفظ التقرير بنجاح");
      setSaving(false);
    }, 1000);
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#F6FCF9] to-white font-['Cairo',sans-serif] text-[15px] leading-[1.9] text-[#27343A]"
    >
      <div className="mx-auto my-10 w-full max-w-[1100px] px-5 md:px-10">
        
        {/* ================= LETTERHEAD ================= */}
        <header className="rounded-[28px] border border-[#E7F0EB] bg-white/95 p-[28px] shadow-[0_10px_35px_rgba(30,122,90,0.08)]">
          <div className="mb-8 flex flex-wrap items-center justify-center gap-12">
            <img src="/logo.png" alt="Logo" className="h-16 object-contain" />
            <img src="/logo2.png" alt="Logo" className="h-16 object-contain" />
          </div>

          <div className="my-6 h-[2px] w-full bg-gradient-to-r from-transparent via-[#34C759] to-transparent" />

          <div className="flex flex-col justify-between gap-6 md:flex-row">
            <div>
              <h1 className="text-3xl font-bold text-[#1E7A5A]">
                التقرير الخاص بالمستفيد
              </h1>
              <p className="mt-2 text-gray-500">
                تقرير متابعة وتقييم المتعافي
              </p>
            </div>

            <div className="rounded-full bg-[#EAF5F0] border border-[#1E7A5A]/10 px-8 py-3 font-bold text-[#1E7A5A]">
              بعدي
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="mt-10">
          
          {/* ================= 1. PATIENT INFO ================= */}
          <section className="mt-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF5F0] font-bold text-[#1E7A5A]">
                1
              </span>
              <h2 className="text-2xl font-bold text-[#1E7A5A]">
                بيانات المستفيد
              </h2>
            </div>

            <div className="rounded-[22px] border border-[#E7F0EB] bg-white p-8 shadow-[0_10px_35px_rgba(30,122,90,0.08)]">
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="flex flex-col gap-3">
                    <label className="font-semibold text-[#1E7A5A]">اسم المستفيد</label>
                    <input
                      type="text"
                      name="beneficiaryName"
                      value={formData.beneficiaryName}
                      onChange={handleInputChange}
                      placeholder="أدخل اسم المستفيد"
                      className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 outline-none focus:border-[#34C759]"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="font-semibold text-[#1E7A5A]">اسم المرشد</label>
                    <input
                      type="text"
                      name="advisorName"
                      value={formData.advisorName}
                      onChange={handleInputChange}
                      placeholder="اسم المرشد"
                      className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 outline-none focus:border-[#34C759]"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col gap-3">
                    <label className="font-semibold text-[#1E7A5A]">اسم البرنامج</label>
                    <input
                      type="text"
                      name="programName"
                      value={formData.programName}
                      onChange={handleInputChange}
                      placeholder="اسم البرنامج"
                      className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 outline-none focus:border-[#34C759]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3">
                      <label className="font-semibold text-[#1E7A5A]">تاريخ البدء</label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 outline-none focus:border-[#34C759]"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="font-semibold text-[#1E7A5A]">تاريخ التخرج</label>
                      <input
                        type="date"
                        name="graduationDate"
                        value={formData.graduationDate}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 outline-none focus:border-[#34C759]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================= 2. CASE SUMMARY ================= */}
          <section className="mt-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF5F0] font-bold text-[#1E7A5A]">
                2
              </span>
              <h2 className="text-2xl font-bold text-[#1E7A5A]">
                ملخص الحالة المتعلق بتعديل الوضع
              </h2>
            </div>

            <div className="rounded-[22px] border border-[#E7F0EB] bg-white p-8 shadow-[0_10px_35px_rgba(30,122,90,0.08)]">
              <div className="flex flex-col gap-3">
                <label className="font-semibold text-[#1E7A5A]">ملخص الحالة</label>
                <textarea
                  name="caseSummary"
                  value={formData.caseSummary}
                  onChange={handleInputChange}
                  placeholder="اكتب ملخص الحالة..."
                  className="min-h-[170px] w-full resize-y rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 outline-none focus:border-[#34C759]"
                />
              </div>

              <div className="my-8 h-[1px] w-full bg-[#E7F0EB]"></div>

              <div className="flex flex-col gap-3">
                <label className="font-semibold text-[#1E7A5A]">شدة الإدمان</label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {["خفيفة", "متوسطة", "شديدة"].map((option) => (
                    <label key={option} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#E7F0EB] bg-[#F8FCFA] px-5 py-3 transition hover:bg-[#F2FBF5] hover:border-[#34C759]">
                      <input
                        type="radio"
                        name="addictionSeverity"
                        value={option}
                        checked={formData.addictionSeverity === option}
                        onChange={handleInputChange}
                        className="accent-[#34C759] h-5 w-5"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ================= 3. PROGRESS ASSESSMENT ================= */}
          <section className="mt-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF5F0] font-bold text-[#1E7A5A]">
                3
              </span>
              <h2 className="text-2xl font-bold text-[#1E7A5A]">
                قياس التقدم في الجوانب التالية
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Psychological */}
              <div className="rounded-[20px] border border-[#E7F0EB] bg-white p-7 shadow-[0_8px_24px_rgba(30,122,90,0.05)] transition hover:-translate-y-1 hover:border-[#34C759]/30 hover:shadow-[0_18px_40px_rgba(30,122,90,0.12)]">
                <h3 className="mb-6 border-b border-[#E7F0EB] pb-4 text-center text-lg font-bold text-[#1E7A5A]">
                  1- الجانب النفسي
                </h3>
                {["تحسن ملحوظ", "تحسن متوسط", "لا يوجد تحسن"].map((option) => (
                  <label key={option} className="mb-3 flex w-full cursor-pointer items-center gap-3 rounded-xl border border-[#E7F0EB] bg-white px-4 py-3 transition hover:bg-[#F4FCF7] hover:border-[#34C759]">
                    <input type="radio" name="psychological" value={option} checked={formData.psychological === option} onChange={handleInputChange} className="accent-[#34C759] h-[18px] w-[18px]" />
                    <span>{option}</span>
                  </label>
                ))}
              </div>

              {/* Behavioral */}
              <div className="rounded-[20px] border border-[#E7F0EB] bg-white p-7 shadow-[0_8px_24px_rgba(30,122,90,0.05)] transition hover:-translate-y-1 hover:border-[#34C759]/30 hover:shadow-[0_18px_40px_rgba(30,122,90,0.12)]">
                <h3 className="mb-6 border-b border-[#E7F0EB] pb-4 text-center text-lg font-bold text-[#1E7A5A]">
                  2- الجانب السلوكي
                </h3>
                {["التزام عالي", "التزام متوسط", "صعوبة في الالتزام"].map((option) => (
                  <label key={option} className="mb-3 flex w-full cursor-pointer items-center gap-3 rounded-xl border border-[#E7F0EB] bg-white px-4 py-3 transition hover:bg-[#F4FCF7] hover:border-[#34C759]">
                    <input type="radio" name="behavioral" value={option} checked={formData.behavioral === option} onChange={handleInputChange} className="accent-[#34C759] h-[18px] w-[18px]" />
                    <span>{option}</span>
                  </label>
                ))}
              </div>

              {/* Social */}
              <div className="rounded-[20px] border border-[#E7F0EB] bg-white p-7 shadow-[0_8px_24px_rgba(30,122,90,0.05)] transition hover:-translate-y-1 hover:border-[#34C759]/30 hover:shadow-[0_18px_40px_rgba(30,122,90,0.12)]">
                <h3 className="mb-6 border-b border-[#E7F0EB] pb-4 text-center text-lg font-bold text-[#1E7A5A]">
                  3- الجانب الاجتماعي
                </h3>
                {["تفاعل إيجابي", "تفاعل محدود", "عزلة اجتماعية"].map((option) => (
                  <label key={option} className="mb-3 flex w-full cursor-pointer items-center gap-3 rounded-xl border border-[#E7F0EB] bg-white px-4 py-3 transition hover:bg-[#F4FCF7] hover:border-[#34C759]">
                    <input type="radio" name="social" value={option} checked={formData.social === option} onChange={handleInputChange} className="accent-[#34C759] h-[18px] w-[18px]" />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* ================= 4. PROGRAM PROGRESS ================= */}
          <section className="mt-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF5F0] font-bold text-[#1E7A5A]">
                4
              </span>
              <h2 className="text-2xl font-bold text-[#1E7A5A]">
                مدى تقدم المتعافي في البرنامج
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {[
                { name: "overallImprovement", title: "1- التحسن العام", options: ["ملحوظ جداً", "جيد", "محدود"] },
                { name: "treatmentPlan", title: "2- مدى الالتزام بالخطة العلاجية", options: ["ملتزم تماماً", "ملتزم جزئياً", "غير ملتزم"] },
                { name: "activitiesParticipation", title: "3- المشاركة في الأنشطة", options: ["نشط", "متوسط", "ضعيف"] },
                { name: "emotionalState", title: "4- الحالة النفسية والعاطفية", options: ["مستقرة", "متقلبة", "مضطربة"] },
                { name: "familyRelationship", title: "5- العلاقة مع الأسرة", options: ["تحسنت", "لا تتغير", "لا تزال متوترة"] },
                { name: "communityReadiness", title: "6- الاستعداد للاندماج بالمجتمع", options: ["جاهز", "يحتاج دعم إضافي", "غير مستعد حالياً"] },
              ].map((card) => (
                <div key={card.name} className="rounded-[20px] border border-[#E7F0EB] bg-white p-7 shadow-[0_8px_24px_rgba(30,122,90,0.05)] transition hover:-translate-y-1 hover:border-[#34C759]/30 hover:shadow-[0_18px_40px_rgba(30,122,90,0.12)]">
                  <h3 className="mb-6 border-b border-[#E7F0EB] pb-4 text-center text-lg font-bold text-[#1E7A5A]">
                    {card.title}
                  </h3>
                  {card.options.map((option) => (
                    <label key={option} className="mb-3 flex w-full cursor-pointer items-center gap-3 rounded-xl border border-[#E7F0EB] bg-white px-4 py-3 transition hover:bg-[#F4FCF7] hover:border-[#34C759]">
                      <input type="radio" name={card.name} value={option} checked={formData[card.name] === option} onChange={handleInputChange} className="accent-[#34C759] h-[18px] w-[18px]" />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* ================= 5. STABILITY ================= */}
          <section className="mt-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF5F0] font-bold text-[#1E7A5A]">
                5
              </span>
              <h2 className="text-2xl font-bold text-[#1E7A5A]">
                مدى قدرة المتعافي على الاستقرار بدون انتكاسة
              </h2>
            </div>
            <div className="rounded-[22px] border border-[#E7F0EB] bg-white p-8 shadow-[0_10px_35px_rgba(30,122,90,0.08)]">
              <div className="flex flex-wrap gap-4">
                {["جيد جداً", "مقبول", "ضعيف"].map((option) => (
                  <label key={option} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#E7F0EB] bg-[#F8FCFA] px-5 py-3 transition hover:bg-[#F2FBF5] hover:border-[#34C759]">
                    <input type="radio" name="stability" value={option} checked={formData.stability === option} onChange={handleInputChange} className="accent-[#34C759] h-5 w-5" />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* ================= 6. FUTURE PLAN ================= */}
          <section className="mt-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF5F0] font-bold text-[#1E7A5A]">
                6
              </span>
              <h2 className="text-2xl font-bold text-[#1E7A5A]">
                استعداد المتعافي لوضع خطة شخصية لما بعد البرنامج
              </h2>
            </div>
            <div className="rounded-[22px] border border-[#E7F0EB] bg-white p-8 shadow-[0_10px_35px_rgba(30,122,90,0.08)]">
              <div className="flex flex-wrap gap-4">
                {["جاهز", "قيد التطوير", "غير مستعد"].map((option) => (
                  <label key={option} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#E7F0EB] bg-[#F8FCFA] px-5 py-3 transition hover:bg-[#F2FBF5] hover:border-[#34C759]">
                    <input type="radio" name="futurePlan" value={option} checked={formData.futurePlan === option} onChange={handleInputChange} className="accent-[#34C759] h-5 w-5" />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* ================= 7. FAMILY NOTIFICATION ================= */}
          <section className="mt-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF5F0] font-bold text-[#1E7A5A]">
                7
              </span>
              <h2 className="text-2xl font-bold text-[#1E7A5A]">
                إشعار الأسرة والعمل خلال فترة التعافي
              </h2>
            </div>
            <div className="rounded-[22px] border border-[#E7F0EB] bg-white p-8 shadow-[0_10px_35px_rgba(30,122,90,0.08)]">
              <div className="flex flex-col gap-3">
                <label className="font-semibold text-[#1E7A5A]">ملاحظات</label>
                <textarea
                  name="familyEmployerNotice"
                  value={formData.familyEmployerNotice}
                  onChange={handleInputChange}
                  placeholder="اكتب الملاحظات المتعلقة بإشعار الأسرة أو جهة العمل..."
                  className="min-h-[170px] w-full resize-y rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 outline-none focus:border-[#34C759]"
                />
              </div>
            </div>
          </section>

          {/* ================= 8. RECOMMENDATIONS ================= */}
          <section className="mt-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF5F0] font-bold text-[#1E7A5A]">
                8
              </span>
              <h2 className="text-2xl font-bold text-[#1E7A5A]">
                توصيات المرشد
              </h2>
            </div>
            <div className="rounded-[22px] border border-[#E7F0EB] bg-white p-8 shadow-[0_10px_35px_rgba(30,122,90,0.08)]">
              <div className="flex flex-col gap-3">
                <label className="font-semibold text-[#1E7A5A]">التوصيات</label>
                <textarea
                  name="advisorRecommendations"
                  value={formData.advisorRecommendations}
                  onChange={handleInputChange}
                  placeholder="اكتب توصيات المرشد..."
                  className="min-h-[170px] w-full resize-y rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 outline-none focus:border-[#34C759]"
                />
              </div>
            </div>
          </section>

          {/* ================= 9. ADDITIONAL NOTES ================= */}
          <section className="mt-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF5F0] font-bold text-[#1E7A5A]">
                9
              </span>
              <h2 className="text-2xl font-bold text-[#1E7A5A]">
                ملاحظات إضافية
              </h2>
            </div>
            <div className="rounded-[22px] border border-[#E7F0EB] bg-white p-8 shadow-[0_10px_35px_rgba(30,122,90,0.08)]">
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                placeholder="أي ملاحظات إضافية..."
                className="min-h-[170px] w-full resize-y rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 outline-none focus:border-[#34C759]"
              />
            </div>
          </section>

          {/* ================= 10. SIGNATURES ================= */}
          <section className="mt-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF5F0] font-bold text-[#1E7A5A]">
                10
              </span>
              <h2 className="text-2xl font-bold text-[#1E7A5A]">
                اعتماد التقرير
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Advisor */}
              <div className="rounded-[22px] border border-[#E7F0EB] bg-white p-8 shadow-[0_10px_35px_rgba(30,122,90,0.08)]">
                <h3 className="mb-8 border-b border-[#E7F0EB] pb-4 text-center text-xl font-bold text-[#1E7A5A]">
                  مرشد التعافي
                </h3>
                <div className="space-y-6">
                  <div className="flex flex-col gap-3">
                    <label className="font-semibold text-[#1E7A5A]">الاسم</label>
                    <input
                      type="text"
                      name="advisorSignatureName"
                      value={formData.advisorSignatureName}
                      onChange={handleInputChange}
                      placeholder="الاسم"
                      className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 outline-none focus:border-[#34C759]"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="font-semibold text-[#1E7A5A]">التوقيع</label>
                    <input
                      type="text"
                      name="advisorSignature"
                      value={formData.advisorSignature}
                      onChange={handleInputChange}
                      placeholder="التوقيع"
                      className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 outline-none focus:border-[#34C759]"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="font-semibold text-[#1E7A5A]">التاريخ</label>
                    <input
                      type="date"
                      name="advisorDate"
                      value={formData.advisorDate}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 outline-none focus:border-[#34C759]"
                    />
                  </div>
                </div>
              </div>

              {/* Team Leader */}
              <div className="rounded-[22px] border border-[#E7F0EB] bg-white p-8 shadow-[0_10px_35px_rgba(30,122,90,0.08)]">
                <h3 className="mb-8 border-b border-[#E7F0EB] pb-4 text-center text-xl font-bold text-[#1E7A5A]">
                  رئيس الفريق
                </h3>
                <div className="space-y-6">
                  <div className="flex flex-col gap-3">
                    <label className="font-semibold text-[#1E7A5A]">الاسم</label>
                    <input
                      type="text"
                      name="teamLeaderName"
                      value={formData.teamLeaderName}
                      onChange={handleInputChange}
                      placeholder="الاسم"
                      className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 outline-none focus:border-[#34C759]"
                    />
                  </div>
               
                  <div className="flex flex-col gap-3">
                    <label className="font-semibold text-[#1E7A5A]">التوقيع</label>
                    <input
                      type="text"
                      name="teamLeaderSignature"
                      value={formData.teamLeaderSignature}
                      onChange={handleInputChange}
                      placeholder="التوقيع"
                      className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 outline-none focus:border-[#34C759]"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="font-semibold text-[#1E7A5A]">التاريخ</label>
                    <input
                      type="date"
                      name="teamLeaderDate"
                      value={formData.teamLeaderDate}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-[#E7F0EB] bg-[#FAFDFC] px-5 py-4 outline-none focus:border-[#34C759]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================= ACTIONS ================= */}
          <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row print:hidden">
            <button
              type="submit"
              disabled={saving}
              className="h-[58px] w-full max-w-[900px] rounded-2xl bg-[#34C759] text-[18px] font-bold text-white transition hover:-translate-y-[1px] hover:bg-[#2EB84E] focus:outline-none focus:ring-4 focus:ring-[#34C759]/20 active:scale-[0.99] disabled:opacity-60 sm:flex-1"
            >
              {saving ? "جاري الحفظ..." : "حفظ التقرير"}
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="h-[58px] w-full max-w-[900px] rounded-2xl border-2 border-[#34C759] bg-white text-[18px] font-bold text-[#1E7A5A] transition hover:-translate-y-[1px] hover:bg-[#34C759] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#34C759]/20 active:scale-[0.99] sm:flex-1"
            >
              طباعة التقرير
            </button>
          </div>
        </form>

        {/* ================= FOOTER ================= */}
        <footer className="mt-16 pb-8 text-center text-[13px] text-[#6D7A82] print:block">
          <strong className="text-[#1E7A5A]">نظام إدارة برنامج التعافي</strong>
          <br />
          جميع الحقوق محفوظة © 2026
        </footer>

      </div>
    </div>
  );
};

export default PostReportPage;