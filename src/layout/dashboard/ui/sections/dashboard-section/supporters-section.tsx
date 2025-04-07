"use client";

import { Heart } from "lucide-react";

export function SupportersSection() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-white p-12 rounded-xl text-center">
      <div className="rounded-full bg-gray-100 p-4">
        <Heart className="h-6 w-6 text-gray-400" />
      </div>
      <h2 className="text-xl font-semibold">
        You don't have any supporters yet
      </h2>
      <p className="text-muted-foreground">
        Share your page with your audience to get started.
      </p>
    </div>
  );
}
