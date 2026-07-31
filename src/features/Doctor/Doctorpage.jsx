import PatientsTable from "./PatientsTable";
import PageHeader from "../components/PageHeader";

const DoctorsPage = () => {
  return (
    <div className="mx-auto max-w-[1300px]">
      <PageHeader
        title="لائحة المستفيدين"
        description="عرض وإدارة جميع ملفات المستفيدين الخاصة بالمركز"
        downloadText="تنزيل لائحة المستفيدين"
      />

      <PatientsTable
        direction="rtl"
        patients={[]}
      />
    </div>
  );
};

export default DoctorsPage;