
import React from "react";
import Link from "next/link";
const BooksBdButton = ({ children, className, color, onClick, to, icon}: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "10px 0px",
      }}
    >
      <Link
        href={to}
        onClick={onClick}
        className={`text-white py-2 px-3 rounded shadow-md hover:shadow-lg hover:bg-[#006d75] bg-[#08979c] cursor-pointer focus:outline-none font-medium text-sm text-center border-none ${color} ${className}`}
      >
        
        <div className="flex items-center">
          {icon && <span className="flex items-center" style={{ marginRight: "5px" }}>{icon}</span>}
          <p>{children}</p>
        </div>
      </Link>
    </div>
  );
};

export default BooksBdButton;
