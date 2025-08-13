// src/components/SearchInput.tsx
import React from "react";

interface SearchInputProps {
  city: string;
  setCity: (city: string) => void;
  onSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  city,
  setCity,
  onSearch,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="search-box flex flex-col sm:flex-row mb-6 items-stretch">
      <input
        type="text"
        className="search-input flex-grow py-3 px-4 border-none rounded-full text-base outline-none bg-white text-gray-800 mr-0 sm:mr-3 mb-3 sm:mb-0 placeholder-gray-400 focus:ring-2 focus:ring-pink-500 transition-all duration-300"
        placeholder="Ange stad..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        onClick={onSearch}
        className="search-btn bg-pink-500 text-white border-none py-3 px-5 rounded-full cursor-pointer text-base font-bold transition duration-300 ease-in-out hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        Sök 🔎
      </button>
    </div>
  );
};

export default SearchInput;
