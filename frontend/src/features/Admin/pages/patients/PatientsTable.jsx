import PatientRow from "./PatientRow";

const PatientsTable = ({ patients = [] }) => {
  return (
    <div className="overflow-hidden rounded-[28px] bg-white shadow-sm">
      <table dir="rtl" className="w-full border-separate border-spacing-y-4">
        <thead>
          <tr className="bg-[#EDF8F2]">
            <th className="rounded-r-2xl px-6 py-5 text-right font-semibold">
              الاسم
            </th>
            <th className="px-6 py-5 text-right font-semibold">
              رقم الهوية
            </th>
            <th className="px-6 py-5 text-right font-semibold">
              رقم الهاتف
            </th>
            <th className="px-6 py-5 text-right font-semibold">
              البريد الإلكتروني
            </th>
            <th className="px-6 py-5 text-right font-semibold">
              المعالج المشرف
            </th>
            <th className="px-6 py-5 text-right font-semibold">
              الحالة
            </th>
            <th className="rounded-l-2xl px-6 py-5 text-center font-semibold">
              رؤية ملف المستفيد
            </th>
          </tr>
        </thead>

        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td
                colSpan={7} // Updated from 6 to 7 to account for the new Status column
                className="py-16 text-center text-gray-400"
              >
                لا يوجد مستفيدون
              </td>
            </tr>
          ) : (
            patients.map((patient) => (
              <PatientRow key={patient._id} patient={patient} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientsTable;