// @ts-nocheck
import React from "React";

export const Spinner = () => {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: "48px", // Tailwind w-12 equivalent
        height: "48px", // Tailwind h-12 equivalent
        borderWidth: "4px", // Tailwind border-4 equivalent
        borderColor: "rgba(59, 130, 246, 1) transparent", // Tailwind border-blue-500 equivalent
        borderStyle: "dashed", // Tailwind border-dashed equivalent
        borderRadius: "9999px", // Tailwind rounded-full equivalent
        animation: "spin 1s linear infinite", // Tailwind animate-spin equivalent
      }}
    ></div>
  );
};
