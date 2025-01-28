import React from "react";
import SearchIcon from "@/assets/Search.svg";
type SearchProps = {
  placeholder?: string;
  onSearch?: (query: string) => void;
};

const Search: React.FC<SearchProps> = ({
  placeholder = "Search here...",
  onSearch,
}) => {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.searchInput.value;
    if (onSearch) {
      onSearch(input);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center w-full max-w-lg bg-[#FFFFFF0A] rounded-md p-2 border border-[#62A4AB] shadow-lg"
    >
      <input
        type="text"
        name="searchInput"
        className="flex-grow bg-transparent text-white placeholder-gray-300 outline-none px-4"
        placeholder={placeholder}
      />
      <button
        type="submit"
        className="text-[#62A4AB] hover:text-white transition-all focus:outline-none flex items-center"
      >
        <img src={SearchIcon} alt="Search Icon" className="h-5 w-5" />
      </button>
    </form>
  );
};

export default Search;
