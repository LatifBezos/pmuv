"use client";
import { useState } from "react";


const SearchBox = () => {
  const [query, setQuery] = useState("");


  return (
    <div className="w-full flex mx-auto justify-center">
        <input type="text" placeholder="Recherche..." className="w-md p-4 border text-3xl text-white font-bold border-2 font-EB+Garamond" value={query} onChange={(e) => setQuery(e.target.value)} />
    </div>
  )
};

export default SearchBox;