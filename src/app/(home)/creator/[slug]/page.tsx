"use client";
import { CreatorSection } from "@/layout/components/creators-section";
import { Creators } from "@/types";
import { slugCreator } from "@/utils/supabase/queries";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
      {creator ? (
        <div>
          <CreatorSection creator={creator} />
        </div>
      ) : (
        <p className="text-center">Chargement...</p>
      )}
    </div>
  );
};

export default CreatorPage;
