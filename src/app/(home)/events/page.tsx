import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { getEvents } from "@/utils/supabase/queries";
import { EventsAll } from "@/layout/components/events-listing";

const EventsPage = async () => {
  const data = await getEvents();

  return (
    <Suspense fallback={<EventsLoading />}>
      <div className="container w-full mx-auto">
        <EventsAll events={data} />
      </div>
    </Suspense>
  );
};

const EventsLoading = () => {
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

export default EventsPage;
