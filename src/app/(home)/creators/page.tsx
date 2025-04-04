"use client";
import { useParams } from "next/navigation";
import { HomeNavbar } from "@/layout/components/home-navbar";
import { Footer } from "@/layout/components/footer";
import { CreatorsAll } from "@/layout/components/creators-listing";

const SearchPage = () => {

  return (
    <div className="container w-full mx-auto">
      <HomeNavbar />
      <CreatorsAll />
      <Footer />
    </div>
  );
};

export default SearchPage;
