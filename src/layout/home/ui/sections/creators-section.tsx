import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function CreatorsSection() {
  return (
    <div className="w-full px-4 py-2">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-10">All creators</h1>

        {/* Carousel */}
        <Carousel>
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/3">
                <div className="bg-muted rounded-md w-full aspect-video h-full flex-1"></div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <Carousel className="mt-10">
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/4">
                <div className="bg-muted rounded-md w-full aspect-video h-full flex-1"></div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
