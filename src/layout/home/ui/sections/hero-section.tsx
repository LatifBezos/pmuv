import { BeerIcon, MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function HeroSection() {
  return (
    <div className="w-full py-20 lg:py-10 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
          <div className="flex gap-4 flex-col">
            <div>
              <Badge variant="outline">We&apos;re live!</Badge>
            </div>
            <div className="flex gap-4 flex-col">

              <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
                Recevez le soutien de votre communauté
              </h1>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                Permettez à vos supporters de vous remercier en vous offrant un
                verre. Une façon simple et conviviale de recevoir leur soutien !
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <Button size="lg" className="gap-4" variant="outline">
                Demander une info <PhoneCall className="w-4 h-4" />
              </Button>
              <Button size="lg" className="gap-4">
                S'inscrire ici <MoveRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-muted rounded-md aspect-square">
              <img
                src="https://images.unsplash.com/photo-1627897495484-229b29feb0d5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hero 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-muted rounded-md row-span-2 ">
            <img
                src="https://images.unsplash.com/photo-1648522168784-067e98df88c0?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hero 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-muted rounded-md aspect-square">
            <img
                src="https://images.unsplash.com/photo-1511945863317-d60e146e9016?q=80&w=2655&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hero 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { HeroSection };
