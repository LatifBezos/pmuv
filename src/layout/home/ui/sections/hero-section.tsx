import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoveRight, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function HeroSection() {
  return (
    <div className="w-full py-10 lg:py-10 px-4">
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
                verre. Une faço n simple et conviviale de recevoir leur soutien !
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="gap-4 cursor-pointer"
                variant="outline"
              >
                <Link href="/#comment-ca-marche">
                  Demander une info <PhoneCall className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" className="gap-4 cursor-pointer">
                <Link href="/signup">
                  S'inscrire ici <MoveRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-muted rounded-md aspect-square">
              <img
                src="/images/groupy.avif"  
                alt="Hero 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-muted rounded-md row-span-2 ">
              <img
                src="/images/omuv-1.avif"
                alt="Hero 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-muted rounded-md aspect-square">
              <img
                src="/images/omuv-2.avif"
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
