import { Creators } from "@/types";
import { BeerIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

function CreatorSection({ creator }: { creator: Creators }) {
  return (
    <div className="w-full min-h-screen flex items-center px-4 py-5" style={{ backgroundColor:`${creator.color}`}}>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Image (s'affiche en haut sur mobile et à droite sur grand écran) */}
        <div className="order-1 md:order-2">
          <div className="bg-muted rounded-lg overflow-hidden w-full h-[400px] md:h-[600px]">
            <img
              src={creator.image_url || "/default-image.jpg"}
              alt={creator.slug}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Texte (s'affiche en bas sur mobile et à gauche sur grand écran) */}
        <div className="order-2 md:order-1 flex flex-col justify-center">
          <div className="flex flex-col-2 gap-4 items-center mb-4">
            <h2 className="text-5xl font-bold mb-2">{creator.slug}</h2>
            <div className="text-lg font-semibold">
                <Button size="sm" className="gap-4" variant="outline">
                  Paye lui un verre<BeerIcon className="w-4 h-2" />
                </Button>
            </div>
          </div>
          <p className="text-lg leading-relaxed text-black max-w-md">
            {creator.bio || "Aucune description disponible."}
          </p>
        </div>
      </div>
    </div>
  );
}

export { CreatorSection };
