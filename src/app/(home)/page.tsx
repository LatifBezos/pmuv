import { HomeNavbar } from "@/layout/components/home-navbar";
import { HeroSection } from "@/layout/home/ui/sections/hero-section";
import { BestSection } from "@/layout/home/ui/sections/best-section";
import { Footer } from "@/layout/components/footer";
import { FeaturesSection } from "@/layout/home/ui/sections/features-section";
import { CreatorsSection } from "@/layout/home/ui/sections/creators-section";
import { ProjectsSection } from "@/layout/home/ui/sections/projects-section";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center px-4">
      <HomeNavbar />
      <HeroSection />
      <FeaturesSection />
      <CreatorsSection />
      <ProjectsSection />
      <BestSection />

      <Footer />
    </main>
  );
}
