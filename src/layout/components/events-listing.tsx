import Link from "next/link";

import { Events } from "@/types";
import { BeerIcon } from "lucide-react";

interface EventsAllProps {
  events: Events[];
}

export function EventsAll({ events }: EventsAllProps) {
  if (!events) {
    return null;
  }

  return (
    <div className="w-full px-4 py-10">
  <div className="container mx-auto">
    {/* Grille avec 12 colonnes et lignes automatiques */}
    <div className="grid grid-cols-12 auto-rows-[16rem] gap-6 mt-6">
      {events.map((event, index) => (
        <Link
          key={index}
          href={`/creator/${event.slug}`}
          className={`block relative group ${
            index === 0 ? "col-span-6 row-span-2 h-[32rem]" : "col-span-3 h-[16rem]"
          }`}
        >
          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-md">
            <img
              src={event.image_url}
              alt={event.slug}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <BeerIcon className="size-8 text-white rotate-12 mb-2" />
              <p className="text-2xl text-white font-bold">{event.slug}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</div>

  );
}
