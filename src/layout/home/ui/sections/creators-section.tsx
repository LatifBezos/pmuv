"use client";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { getCreators } from "@/utils/supabase/queries";
import { Creators } from "@/types";
import { useState, useEffect } from "react";
import { BeerIcon } from "lucide-react";

export function CreatorsSection() {
  const [creators, setCreators] = useState<Creators[] | null>(null);

  useEffect(() => {
    async function fetchCreators() {
      const data = await getCreators();
      setCreators(data);
    }
    fetchCreators();
  }, []);

  if (!creators) {
    return null;
  }

  console.log("creators", creators);

  return (
    <div className="w-full px-4 py-2">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold mb-5">Nos créateurs</h1>
          <h1 className="text-4xl font-bold mb-5">Tout voir</h1>
        </div>
        {/* Carousel */}
        <Carousel className="mt-10">
          <CarouselContent>
            {creators.map((_, index) => (
              <CarouselItem key={index} className="basis-1/4">
                <Link
                  href={`/creator/${_.slug}`}
                  className="block relative group"
                >
                  <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={`${_.image_url}`}
                      alt="Creator"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <BeerIcon className="size-8 text-white rotate-12 mb-2" />
                      <p className="text-2xl text-white font-bold">{_.slug}</p>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
