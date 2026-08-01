import HeadsHeader from "./HeadsHeader";
import HeadsTable from "./HeadsTable";

const HeadsPage = () => {
  return (
    <div
      dir="rtl"
      className="mx-auto max-w-[1350px] px-8 py-10"
    >
      <HeadsHeader />

      <div className="mt-10">
        <HeadsTable heads={[]} />
      </div>
    </div>
  );
  
};

export default HeadsPage;