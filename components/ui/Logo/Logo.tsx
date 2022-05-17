import React from "react";

const Logo = ({ className = '', ...props }) => {
  return (
    <img
      className="sm:h-8 w-auto"
      src="/e5p_logo.png"
      alt=""
    />
  );
}

export default Logo
