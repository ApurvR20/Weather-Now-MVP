import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter city name..."
        className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none w-64 md:w-80"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-white/30 hover:bg-white/40 text-white rounded-lg font-semibold transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
