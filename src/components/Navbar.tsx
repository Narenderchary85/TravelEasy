import React, { useState } from "react";

interface NavbarProps {
  onSearch: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow bg-white sticky top-0 z-10">
     <img src="/HDlogo.png" className="w-25 h-13 ml-0 md:ml-15" alt="" />

      <form
        onSubmit={handleSubmit}
        className="flex items-center rounded-lg overflow-hidden"
      >
      <div className="flex justify-between items-center gap-5">
      <input
          type="text"
          placeholder="Search Experiences..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onSearch(e.target.value);
          }}
          className="px-4 py-2 w-lg outline-none  bg-gray-100 rounded-lg"
        />
        <button
          type="submit"
          className="bg-yellow-400 text-black px-4 py-2 font-semibold hover:bg-yellow-500 transition rounded-lg"
        >
          Search
        </button>
      </div>
      </form>
    </nav>
  );
};

export default Navbar;
