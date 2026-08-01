import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";

const Select = forwardRef(
  (
    {
      label,
      icon,
      options = [],
      error,
      className = "",
      containerClassName = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col gap-2 ${containerClassName}`}>
        {label && (
          <label className="text-[18px] font-semibold text-slate-800">
            {label}
          </label>
        )}

        <div className="relative">

          {/* Left Dropdown Arrow */}

          <ChevronDown
            size={18}
            className="
              pointer-events-none
              absolute
              left-5
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          {/* Right Icon */}

          {icon && (
            <div
              className="
                pointer-events-none
                absolute
                right-5
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            >
              {icon}
            </div>
          )}

          <select
            ref={ref}
            dir="rtl"
            className={`
              h-14
              w-full
              appearance-none
              rounded-2xl
              border
              border-[#D7E3F4]
              bg-white
              pr-14
              pl-12
              text-base
              text-slate-700
              outline-none
              transition-all
              duration-200
              focus:border-[#35C759]
              focus:ring-4
              focus:ring-[#35C759]/10
              ${className}
            `}
            {...props}
          >
            <option value="">اختر</option>

            {options.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <span className="text-sm text-red-500">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;