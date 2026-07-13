import React from 'react';

const FlourishElement = ({ position = "top-left", className = "" }) => {
  const rotation = {
    "top-left": "rotate(0)",
    "top-right": "rotate(90)",
    "bottom-right": "rotate(180)",
    "bottom-left": "rotate(270)"
  };

  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute ${position === "top-left" ? "top-0 left-0" : ""} ${position === "top-right" ? "top-0 right-0" : ""} ${position === "bottom-right" ? "bottom-0 right-0" : ""} ${position === "bottom-left" ? "bottom-0 left-0" : ""} pointer-events-none z-0 opacity-40 text-[#D4AF37] ${className}`}
      style={{ transform: rotation[position] }}
    >
      <path
        d="M10 10C10 35 35 60 60 60"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <path
        d="M10 10C35 10 60 35 60 60"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="10" cy="10" r="3" fill="currentColor" />
    </svg>
  );
};

export default FlourishElement;