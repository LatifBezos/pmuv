"use client";

import React, { type SVGProps } from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { LogoCarousel } from "@/components/ui/logo-carousel";

const orangemoney = "orangemoney.png";
const stripe = "stripe.png";
const wave = "wave.jpg";
const visa = "visa.png";
const moov = "moov.png"
const mtn = "mtn.jpg";

// Массив с логотипами
const allLogos = [
  { name: "OM", id: 1, img: orangemoney },
  { name: "WAVE", id: 2, img: wave },
  { name: "MTN", id: 3, img: mtn },
  { name: "MOOV MONEY", id: 4, img: moov },
  { name: "VISA", id: 5, img: visa },
  { name: "STRIPE", id: 6, img: stripe },
];


export function BestSection() {
  return (
    <div className="space-y-8 py-24">
      <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center space-y-8">
        <div className="text-center">
          <GradientHeading variant="secondary">
            Les meilleurs sont déjà présent
          </GradientHeading>
          <a href="https://www.newcult.co" target="_blank">
            <GradientHeading size="xxl">
              Fais toi payer un verre
            </GradientHeading>
          </a>
        </div>

        <LogoCarousel columnCount={3} logos={allLogos} />
      </div>
    </div>
  );
}
