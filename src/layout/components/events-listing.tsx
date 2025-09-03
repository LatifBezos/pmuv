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
        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {events.map((events, index) => (
            <Link
              key={index}
              href={`/creator/${events.slug}`}
              className="block relative group"
            >
              <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md">
                <img
                  src={events.image_url}
                  alt={events.slug}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <BeerIcon className="size-8 text-white rotate-12 mb-2" />
                  <p className="text-2xl text-white font-bold">
                    {events.slug}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
