import { CreatorsAll } from "@/layout/components/creators-listing";
import { getCreators } from "@/utils/supabase/queries";

export default async function ExploreCreatorsPage() {
  const creators = await getCreators();

  return (
    <div className="flex flex-col gap-4 w-full max-w-screen md:max-w-5xl mx-auto px-4 sm:px-6 pb-8 py-12 md:py-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Découverte
        </p>
        <h1 className="text-3xl font-bold">Explorer les créateurs</h1>
      </div>
      <CreatorsAll creators={creators} />
    </div>
  );
}
