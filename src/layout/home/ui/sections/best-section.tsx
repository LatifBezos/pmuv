"use client";

import React, { type SVGProps } from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { LogoCarousel } from "@/components/ui/logo-carousel";

// Массив с логотипами
const allLogos = [
  { name: "OM", id: 1, img: "/orangemoney.png" },
  { name: "WAVE", id: 2, img: "/wave.jpg" },
  { name: "MTN", id: 3, img: "/mtn.jpg" },
  { name: "MOOV MONEY", id: 4, img: "/moov.png" },
  { name: "VISA", id: 5, img: "/visa.png" },
  { name: "STRIPE", id: 6, img: "/stripe.png" },
];

export function BestSection() {
  return (
    <div className="space-y-8 py-24">
      <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center space-y-8">
        <div className="text-center">
          <GradientHeading variant="secondary">
            Les meilleurs sont déjà présent
          </GradientHeading>
          <GradientHeading size="xxl">Fais toi payer un verre</GradientHeading>
        </div>

        <LogoCarousel columnCount={3} logos={allLogos} />
      </div>
    </div>
  );
}
