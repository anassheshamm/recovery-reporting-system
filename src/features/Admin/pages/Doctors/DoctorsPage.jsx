import PageHeader from "../../../components/PageHeader";
import DoctorsTable from "./DoctorsTable";


const DoctorsPage = () => {
  return (
    <div
    dir="rtl"
     className="mx-auto max-w-[1300px]">

      <PageHeader
        title="لائحة المعالجين"
        description="عرض وإدارة جميع ملفات المعالجين الخاصة بالمركز"
        downloadText="تنزيل لائحة المعالجين"
      />

      <DoctorsTable
      direction="rtl"
       doctors={[]} />

    </div>
    
  );
};

export default DoctorsPage;