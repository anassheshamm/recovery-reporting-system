const SidebarItem = ({
  item,
  active,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full rounded-xl py-3 text-sm font-medium transition

        ${
          active
            ? "bg-primary text-white"
            : "bg-white text-gray-600 hover:bg-primary hover:text-white"
        }
      `}
    >
      {item.label}
    </button>
  );
};

export default SidebarItem;