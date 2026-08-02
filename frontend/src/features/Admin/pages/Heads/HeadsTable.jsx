import HeadRow from "./HeadRow";

const HeadsTable = ({ heads = [] }) => {
  return (
    <div className="overflow-hidden rounded-[28px] bg-white shadow-sm">
      <table
        dir="rtl"
        className="w-full border-separate border-spacing-y-4"
      >
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
              رقم الرخصة
            </th>

            <th className="px-6 py-5 text-right font-semibold">
              البريد الإلكتروني
            </th>

            <th className="px-6 py-5 text-right font-semibold">
              مسؤول عن قسم
            </th>

            <th className="rounded-l-2xl px-6 py-5 text-center font-semibold">
              رؤية الملف
            </th>
          </tr>
        </thead>

        <tbody>
          {heads.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="py-16 text-center text-gray-400"
              >
                لا يوجد رؤساء أقسام
              </td>
            </tr>
          ) : (
            heads.map((head) => (
              <HeadRow
                key={head.id}
                head={head}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HeadsTable;