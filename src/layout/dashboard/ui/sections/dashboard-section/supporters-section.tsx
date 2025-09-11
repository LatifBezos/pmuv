"use client";

import { Heart } from "lucide-react";

export function SupportersSection() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 bg-white p-8 sm:p-12 rounded-xl text-center">
      <div className="rounded-full bg-gray-100 p-3 sm:p-4">
        <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
      </div>
      <h2 className="text-lg sm:text-xl font-semibold">
          Vous n'avez pas encore de supporters
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground max-w-xs sm:max-w-sm">
        Partagez votre page avec votre audience pour commencer.
      </p>
    </div>
  );
}
