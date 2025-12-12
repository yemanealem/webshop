import React, { useEffect, useState } from "react";
type ToastProps = {
  message: string;
  show: boolean;
  duration?: number;
};

export default function Toast({ message, show, duration = 3000 }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!show) return;

    const showTimer = setTimeout(() => setVisible(true), 0);

    const hideTimer = setTimeout(() => setVisible(false), duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [show, duration]);

  if (!visible) return null;

  return (
    <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500 opacity-100">
      {message}
    </div>
  );
}
