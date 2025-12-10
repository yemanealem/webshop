import React from "react";

type LoadingButtonProps = {
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function LoadingButton({
  loading = false,
  children,
  onClick,
  className = "",
  type = "button",
}: LoadingButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`flex items-center justify-center gap-2 px-6 py-3 rounded text-white font-semibold transition ${className} ${
        loading ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
}
