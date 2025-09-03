"use client";
import { useState } from "react";


const SearchBox = () => {
  const [query, setQuery] = useState("");


  return (
    <div className="w-full max-w-md mx-auto align-center">
        <input type="text" placeholder="Recherche..." className="w-lg p-4 border text-3xl text-white font-bold border-2 font-EB+Garamond" value={query} onChange={(e) => setQuery(e.target.value)} />
    </div>
  )
};

export default SearchBox;