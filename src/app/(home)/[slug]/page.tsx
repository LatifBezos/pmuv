"use client";
import { useParams } from "next/navigation";
import { HomeNavbar } from "@/layout/components/home-navbar";
import { Footer } from "@/layout/components/footer";
import { CreatorBio } from "@/layout/components/creators-bio";
import { useEffect, useState } from "react";
import { Creators } from "@/types";
import { slugCreator  } from "@/utils/supabase/queries";
import { CreatorSection} from "@/layout/components/creators-section";



const CreatorPage = () => {
  const params = useParams(); 
  const slug = params?.slug; 
  console.log("slug", slug);
  const [creator, setCreator] = useState<Creators | null>(null);
  
  
  useEffect(() => {
    if (!slug) return;
    async function fetchCreators() {
      const data = await slugCreator(slug as string);
      console.log("data", data);
      setCreator(data[0]);
    }
    fetchCreators();
  }, [slug]);
  
  
  return (
    <div className="container w-full mx-auto">
      <HomeNavbar />
      {creator ? (
        <div>
          <CreatorSection creator={creator} />
        </div>
      ) : (
        <p className="text-center">Chargement...</p>
      )}
      <Footer />
    </div>
  );
};

export default CreatorPage;
