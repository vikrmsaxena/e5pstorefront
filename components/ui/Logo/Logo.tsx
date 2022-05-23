import React from "react";

const Logo = ({ className = '', ...props }) => {
  return (
    <img
      className="sm:h-8 w-auto"
      src="/e5p_logo.png"
      alt="everything5pounds"
      width={401}
      height={37}
    />
  );
}

export default Logo
