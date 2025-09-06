import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { CreatorsAll } from "@/layout/components/creators-listing";
import { getCreators } from "@/utils/supabase/queries";

const CreatorPage = async () => {
  const data = await getCreators();

  return (
    <Suspense fallback={<CreatorsLoading />}>
      <div className="container w-full mx-auto">
        <CreatorsAll creators={data} />
      </div>  
    </Suspense>
  );
};

const CreatorsLoading = () => {
  return (
    <div className="w-full px-4 py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-64 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatorPage;
