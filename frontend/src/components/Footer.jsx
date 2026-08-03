import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      dir="rtl" 
      className="mt-auto w-full border-t border-[#E7F0EB] bg-[#FCFEFD] py-8"
    >
      {/* flex-col stacks the items vertically, items-center centers them horizontally */}
      <div className="mx-auto flex w-full max-w-[1300px] flex-col items-center justify-center gap-5 px-8">
        
        {/* Logos (Top) */}
        <div className="flex items-center justify-center gap-8">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-20 object-contain " 
          />
          <img 
            src="/logo2.png" 
            alt="Recovery Logo" 
            className="h-20 object-contain " 
          />
        </div>

        {/* Copyright Text (Bottom) */}
        <div className="text-center text-sm font-semibold text-gray-400">
         

  جميع الحقوق محفوظة لجمعية إرشاد لتأهيل وتوعية المتعافين من الإدمان © {currentYear}
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;