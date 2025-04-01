import { Badge } from "@/components/ui/badge";

function FeaturesSection() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col-reverse lg:flex-row gap-10 lg:items-center">
          <div className="bg-muted rounded-md w-full aspect-video h-full flex-1"></div>
          <div className="flex gap-4 pl-0 lg:pl-20 flex-col  flex-1">
            <div>
              <Badge>Platform</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-xl md:text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
                Comment ça marche ?
              </h2>
              <div className="flex gap-2 flex-col">
                <h3 className="text-lg font-bold">1. Créez votre page</h3>
                <p>
                  Inscrivez-vous gratuitement et personnalisez votre page en
                  quelques minutes
                </p>
              </div>
              <div className="flex gap-2 flex-col">
                <h3 className="text-lg font-bold">2. Partagez votre lien</h3>
                <p>
                  Diffusez votre page à votre communauté sur vos réseaux sociaux
                  préférés
                </p>
              </div>
              <div className="flex gap-2 flex-col">
                <h3 className="text-lg font-bold">3. Recevez des verres</h3>
                <p>
                  Vos supporters peuvent vous offrir un ou plusieurs verres pour
                  vous soutenir
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { FeaturesSection };
