"use client";
import { useParams } from "next/navigation";
import { HomeNavbar } from "@/layout/components/home-navbar";
import { Footer } from "@/layout/components/footer";
import { useEffect, useState } from "react";
import { Creators } from "@/types";
import { slugCreator  } from "@/utils/supabase/queries";
import { CreatorSection} from "@/layout/components/creators-section";
import { SearchBar } from "@/layout/components/search-bar";
import { ListingCrea } from "@/layout/components/listing-crea";

const SearchPage = () => {

  return (
    <div className="container w-full mx-auto">
      <HomeNavbar />
      <SearchBar />
      <ListingCrea />
      <Footer />
    </div>
  );
};

export default SearchPage;
