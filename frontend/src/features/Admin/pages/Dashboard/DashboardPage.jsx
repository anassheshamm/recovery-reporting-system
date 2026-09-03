import React, { useState, useEffect } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Cell 
} from "recharts";
import analyticsService from "../../../../services/analytics.service";
import { Loader2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; // <-- imported useNavigate

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // <-- initialized useNavigate
  
  // Track which preset button is active (default 365)
  const [activePreset, setActivePreset] = useState(365);
  
  // Default to the last year
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchDashboardData();
  }, [dateRange]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await analyticsService.getDashboardSummary(dateRange.from, dateRange.to);
      setData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePresetChange = (days) => {
    setActivePreset(days); // Update active button state
    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - days);
    setDateRange({
      from: from.toISOString().split('T')[0],
      to: to.toISOString().split('T')[0]
    });
  };

  if (loading && !data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#31778b]" />
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#F9FBFC] p-8 font-['Cairo']">
      
      {/* Header Actions */}
      <div className="mb-6 flex items-center print:hidden">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 border border-gray-200">
          <ArrowRight size={20} />
          رجوع
        </button>
      </div>

      {/* Date Filters & Presets */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          <input 
            type="date" 
            value={dateRange.from} 
            onChange={(e) => {
              setActivePreset(null); // Clear preset if user picks custom date
              setDateRange(prev => ({ ...prev, from: e.target.value }));
            }}
            className="rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#31778b]"
          />
          <input 
            type="date" 
            value={dateRange.to} 
            onChange={(e) => {
              setActivePreset(null); // Clear preset if user picks custom date
              setDateRange(prev => ({ ...prev, to: e.target.value }));
            }}
            className="rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#31778b]"
          />
        </div>
        <div className="flex gap-2 rounded-xl bg-white p-1 shadow-sm">
          <button 
            onClick={() => handlePresetChange(365)} 
            className={`rounded-lg px-4 py-2 transition ${activePreset === 365 ? 'bg-[#E6F3FA] font-bold text-[#31778b]' : 'hover:bg-gray-100'}`}
          >
            اخر سنه
          </button>
          <button 
            onClick={() => handlePresetChange(90)} 
            className={`rounded-lg px-4 py-2 transition ${activePreset === 90 ? 'bg-[#E6F3FA] font-bold text-[#31778b]' : 'hover:bg-gray-100'}`}
          >
            اخر ٩٠ يوم
          </button>
          <button 
            onClick={() => handlePresetChange(60)} 
            className={`rounded-lg px-4 py-2 transition ${activePreset === 60 ? 'bg-[#E6F3FA] font-bold text-[#31778b]' : 'hover:bg-gray-100'}`}
          >
            اخر ٦٠ يوم
          </button>
          <button 
            onClick={() => handlePresetChange(30)} 
            className={`rounded-lg px-4 py-2 transition ${activePreset === 30 ? 'bg-[#E6F3FA] font-bold text-[#31778b]' : 'hover:bg-gray-100'}`}
          >
            اخر ٣٠ يوم
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-6">
        <StatCard 
          title="اجمالي المستفيدين" 
          value={data?.totalPatients} 
          trend="+12%" 
          type="blue" 
        />
        <StatCard 
          title="المستفيدين النشيطين" 
          value={data?.activePatients} 
          trend="+8%" 
          type="blue" 
        />
        <StatCard 
          title="المستفيدين المتخرجين من البرنامج" 
          value={data?.completedPatients} 
          trend="+15%" 
          type="green" 
        />
        <StatCard 
          title="الحالات المتعثره" 
          value={data?.delayedPatients} 
          trend="+3%" 
          type="orange" 
          subtext="Relapsed or >6mo duration" 
        />
        <StatCard 
          title="تركو البرنامج" 
          value={data?.discontinuedPatients} 
          trend="-5%" 
          type="red" 
        />
        <StatCard 
          title="متوسط مده التشافي" 
          value={data?.averageRecoveryDuration !== undefined ? `${data?.averageRecoveryDuration} mo` : null} 
          trend="-0.3 mo" 
          type="gray" 
        />
      </div>

      {/* Middle Row Charts */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
        
        {/* Left Column - Monthly Reports */}
        <div className="flex flex-col rounded-[20px] border border-gray-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] lg:col-span-8 lg:p-8">
          <div className="mb-8 text-right">
            <h3 className="text-[20px] font-bold text-[#111827]">التقارير الشهريه</h3>
            <p className="mt-1 text-[13px] text-[#8B98A5]">لتقارير التشخيصية الشهرية للحالات النشطة (من يناير إلى ديسمبر)</p>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.monthlyReports} margin={{ top: 10, right: 0, left: -25, bottom: 10 }}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#F3F4F6" />
                <XAxis 
                  dataKey="month" 
                  reversed={true}
                  tick={{ fill: '#8B98A5', fontSize: 13, fontFamily: 'Cairo' }} 
                  axisLine={false} 
                  tickLine={false} 
                  dy={15}
                />
                <YAxis 
                  orientation="right" 
                  tick={{ fill: '#8B98A5', fontSize: 13, fontFamily: 'Cairo' }} 
                  axisLine={false} 
                  tickLine={false} 
                  dx={15}
                />
                <Tooltip 
                  cursor={{ fill: '#F9FAFB' }} 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontFamily: 'Cairo' }}
                />
                <Bar 
                  dataKey="count" 
                  fill="#35C759" 
                  radius={[4, 4, 0, 0]} 
                  barSize={32} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column - Patients per Doctor */}
        <div className="flex flex-col rounded-[20px] border border-gray-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] lg:col-span-4 lg:p-8">
          <div className="mb-8 text-right">
            <h3 className="text-[20px] font-bold text-[#111827]">عدد المرضى لكل معالج</h3>
            <p className="mt-1 text-[13px] text-[#8B98A5]">حجم الحالات السريرية النشطة مرتباً تنازلياً</p>
          </div>
          <div className="flex flex-col gap-5">
            {data?.patientsByDoctor?.map((doc, idx) => {
              const maxCount = data.patientsByDoctor[0]?.count || 1;
              const widthPct = `${(doc.count / maxCount) * 100}%`;
              
              return (
                <div key={idx} className="flex items-center gap-4 text-[15px]">
                  {/* Doctor Name - Anchored Right */}
                  <span className="w-28 truncate text-right text-[14px] font-medium text-[#4B5563]" title={doc.doctorName}>
                    {doc.doctorName}
                  </span>
                  
                  {/* Progress Bar - Anchors Right, grows Left */}
                  <div className="flex h-[18px] flex-1 justify-start bg-transparent">
                    <div 
                      className="h-full rounded-[4px] bg-[#35C759] transition-all duration-500" 
                      style={{ width: widthPct }} 
                    />
                  </div>
                  
                  {/* Count - Anchored Left */}
                  <span className="w-8 text-left text-[15px] font-bold text-[#111827]">
                    {doc.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Bottom Chart - Recovery Distribution */}
      <div className="flex flex-col rounded-[20px] border border-gray-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] lg:p-8">
        <div className="mb-8 text-right">
          <h3 className="text-[20px] font-bold text-[#111827]">توزيع مدة التعافي</h3>
          <p className="mt-1 text-[13px] text-[#8B98A5]">عدد المرضى مصنفاً حسب مدة التعافي النشط (بالأشهر)</p>
        </div>
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.recoveryDurationDistribution} margin={{ top: 10, right: 0, left: -25, bottom: 10 }}>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#F3F4F6" />
              <XAxis 
                dataKey="month" 
                reversed={true}
                tickFormatter={(val) => val === 12 ? '12+mo' : `${val}mo`} 
                tick={{ fill: '#8B98A5', fontSize: 13, fontFamily: 'Cairo' }} 
                axisLine={false} 
                tickLine={false} 
                dy={15}
              />
              <YAxis 
                orientation="right" 
                tick={{ fill: '#8B98A5', fontSize: 13, fontFamily: 'Cairo' }} 
                axisLine={false} 
                tickLine={false} 
                dx={15}
              />
              <Tooltip 
                cursor={{ fill: '#F9FAFB' }} 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontFamily: 'Cairo' }}
                labelFormatter={(label) => label === 12 ? '12+ شهور' : `${label} شهور`}
                formatter={(value) => [value, 'العدد']}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={45}>
                {data?.recoveryDurationDistribution?.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.month === 12 ? '#DE7815' : '#19B076'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ title, value, trend, type = "blue", subtext }) => {
  const theme = {
    blue: { bg: "bg-[#EBF2FE]", text: "text-[#1B64F2]", icon: "↗" },
    green: { bg: "bg-[#E3F9E5]", text: "text-[#35C759]", icon: "↗" },
    orange: { bg: "bg-[#FEF0D4]", text: "text-[#F5A623]", icon: "↗" },
    red: { bg: "bg-[#FCE8E8]", text: "text-[#E02424]", icon: "↘" },
    gray: { bg: "bg-[#F3F4F6]", text: "text-[#4B5563]", icon: "↘" },
  };

  const activeTheme = theme[type];

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
      <h4 className="mb-4 text-center text-[14px] font-semibold text-[#8B98A5]">{title}</h4>
      
      <span className="mb-3 text-[38px] font-extrabold tracking-tight text-[#111827]">
        {value !== undefined && value !== null ? value.toLocaleString() : "0"}
      </span>
      
      {subtext && (
        <span className="mb-3 text-[11px] text-[#8B98A5]">{subtext}</span>
      )}
      
      <div className="flex items-center justify-center gap-2">
        <span className={`flex items-center gap-1 rounded-[4px] px-2 py-0.5 text-[12px] font-bold ${activeTheme.bg} ${activeTheme.text}`}>
          <span className="text-[14px] font-black leading-none">{activeTheme.icon}</span> 
          <span dir="ltr">{trend}</span>
        </span>
        <span className="text-[12px] font-medium text-[#A0ABB8]">vs prior period</span>
      </div>
    </div>
  );
};

export default DashboardPage;