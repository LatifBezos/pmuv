import { BestSection } from "@/layout/home/ui/sections/best-section";
import { CreatorsSection } from "@/layout/home/ui/sections/creators-section";
import { FeaturesSection } from "@/layout/home/ui/sections/features-section";
import { HeroSection } from "@/layout/home/ui/sections/hero-section";
import { ProjectsSection } from "@/layout/home/ui/sections/projects-section";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center ">
      <HeroSection />
      <FeaturesSection />
      <CreatorsSection />
      <ProjectsSection />
      <BestSection />
    </main>
  );
}
