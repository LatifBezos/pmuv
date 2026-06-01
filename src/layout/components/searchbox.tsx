"use client";
import { useState } from "react";

import { Creators } from "@/types";
import { CreatorsAll } from "@/layout/components/creators-listing";

type SearchBoxProps = {
  creators: Creators[];
};

const SearchBox = ({ creators }: SearchBoxProps) => {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredCreators = normalizedQuery
    ? creators.filter((creator) =>
        [creator.slug, creator.bio]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(normalizedQuery))
      )
    : creators;


  return (
    <>
      <div className="w-full flex flex-row items-center bg-[#40916c] py-8">
        <div className="w-full flex mx-auto justify-center">
          <input
            type="text"
            placeholder="Recherche..."
            className="w-md p-4 border text-3xl text-white font-bold border-2 font-eb-serif"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="container w-full mx-auto">
        {filteredCreators.length > 0 ? (
          <CreatorsAll creators={filteredCreators} />
        ) : (
          <p className="py-10 text-center text-muted-foreground">
            Aucun créateur ne correspond à votre recherche.
          </p>
        )}
      </div>
    </>
  )
};

export default SearchBox;