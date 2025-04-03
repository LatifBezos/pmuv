import { Creators } from "@/types";

function CreatorSection({ creator }: { creator: Creators }) {
  return (
    <div className="w-full min-h-screen flex items-center px-4 py-10">
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
          <h2 className="text-4xl font-bold mb-4">{creator.slug}</h2>
          <h3 className="text-2xl font-semibold mb-4">
            
          </h3>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-md">
            Permettez à vos supporters de vous remercier en vous offrant un
            verre. Une façon simple et conviviale de recevoir leur soutien !
          </p>
        </div>
      </div>
    </div>
  );
}

export { CreatorSection };
