import React from "react";
import "../styles/loading.css";

const Loading: React.FC<{ message?: string }> = ({ message = "Fetching Products..." }) => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default Loading;
