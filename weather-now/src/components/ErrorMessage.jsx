import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-500/20 text-red-300 border border-red-500/50 px-4 py-3 rounded-xl mt-4 max-w-md">
      ⚠️ {message}
    </div>
  );
};

export default ErrorMessage;
