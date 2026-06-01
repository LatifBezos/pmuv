"use client";

import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Projects } from "@/types";
import { getProjects } from "@/utils/supabase/queries";
import { BeerIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function ProjectsSection() {
  const [projects, setProjects] = useState<Projects[] | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      const data = await getProjects();
      setProjects(data);
    }

    fetchProjects();
  }, []);

  return (
    <div className="w-full px-4 py-2 mt-20">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-4 mb-10">
          <h1 className="text-4xl font-bold">Tous les projets</h1>
          <Badge variant="secondary">Projets créateurs</Badge>
        </div>

        {!projects && (
          <p className="text-sm text-muted-foreground">
            Chargement des projets...
          </p>
        )}

        {projects?.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Aucun projet n'est encore disponible.
          </p>
        )}

        {projects && projects.length > 0 && (
          <Carousel>
            <CarouselContent>
              {projects.map((project) => (
                <CarouselItem
                  key={project.id}
                  className="basis-2/3 md:basis-1/3 lg:basis-1/4"
                >
                  <article className="relative block overflow-hidden rounded-lg shadow-md group">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 px-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <BeerIcon className="mb-2 size-8 rotate-12 text-white" />
                      <p className="text-2xl font-bold text-white">
                        {project.title}
                      </p>
                      <p className="text-sm text-white/80">
                        Page projet bientôt disponible
                      </p>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </div>
  );
}
