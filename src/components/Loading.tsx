import React from "react";

const Loading: React.FC<{ message?: string }> = ({ message = "Fetching Products..." }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">

      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
    
      <p className="text-gray-700 text-lg">{message}</p>
    </div>
  );
};

export default Loading;
