import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
    return (
    <div className="w-auto flex items-center input-wrapper rounded-md border border-gray-300 p-1 mx-2">
        <FaSearch className="search-icon mx-1"/>
        <input placeholder="Type to search..." className="w-full"/>
    </div>
  );
}