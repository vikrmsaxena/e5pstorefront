import React from "react";

const Logo = ({ className = '', ...props }) => {
  return (
    <img
      className="h-8 w-auto"
      src="/e5p_logo.png"
      alt=""
    />
  );
}

export default Logo
