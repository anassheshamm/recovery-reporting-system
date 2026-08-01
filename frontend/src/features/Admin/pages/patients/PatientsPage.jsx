import PatientsHeader from "../../../components/PageHeader";

import PatientsTable from "./PatientsTable";

const PatientsPage = () => {
  return (
    <div
      dir="rtl"
      className="mx-auto max-w-[1350px] px-8 py-10"
    >
      <PatientsHeader
      title="لائحه المستفيدين"
        description="عرض وإدارة جميع ملفات المستفيدين الخاصة بالمركز"
        downloadText="تنزيل لائحة المستفيدين" />

      <div className="mt-10 grid grid-cols-[max-w-[1300px]] gap-8">

      

        <PatientsTable patients={[]} />

      </div>
    </div>
  );
};

export default PatientsPage;