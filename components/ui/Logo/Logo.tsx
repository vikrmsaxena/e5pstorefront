import React from "react";

const Logo = ({ className = '', ...props }) => {
  return (
    <img
      src="/e5p_logo.png"
      alt="everything5pounds"
      width={297}
      height={27}
    />
  );
}

export default Logo
