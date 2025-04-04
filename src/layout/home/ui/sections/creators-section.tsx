"use client"
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import {createClient} from '@supabase/supabase-js';
import {getCreators} from "@/utils/supabase/queries";
import { Creators } from "@/types";
import { useState,useEffect } from "react";
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
                <Link href={`/${_.slug}`} className="block relative ">
                  <div className="relative w-full h-64 ">
                    <img
                      src={`${_.image_url}`}
                      alt="Creator"
                      className="w-full h-full object-cover"
                    />
                    <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center bg-black/20">
                      <BeerIcon className="size-8 text-white rotate-12 transition-all duration-200" />
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
