import { BeerIcon, MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function HeroSection() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
          <div className="flex gap-4 flex-col">
            <div>
              <Badge variant="outline">We&apos;re live!</Badge>
            </div>
            <div className="flex gap-4 flex-col">
              <BeerIcon className="size-40 rotate-12 transition-all duration-200 ml-4" />

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
                Jump on a call <PhoneCall className="w-4 h-4" />
              </Button>
              <Button size="lg" className="gap-4">
                Sign up here <MoveRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-muted rounded-md aspect-square animate-pulse"></div>
            <div className="bg-muted rounded-md row-span-2 animate-pulse"></div>
            <div className="bg-muted rounded-md aspect-square animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { HeroSection };
