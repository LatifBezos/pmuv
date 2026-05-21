"use client";

import { ChevronDown, Share } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Creators } from "@/types";

type ProfileSectionProps = {
  creator: Creators | null;
  email?: string | null;
  walletBalance?: number | null;
  supportersTotal?: number;
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  }).format(amount);

export function ProfileSection({
  creator,
  email,
  walletBalance = 0,
  supportersTotal = 0,
}: ProfileSectionProps) {
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("");
  const publicUrl = creator && origin ? `${origin}/creator/${creator.slug}` : null;

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const handleShare = async () => {
    if (!publicUrl) return;

    await navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4 bg-white rounded-xl">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 overflow-hidden rounded-full bg-slate-400">
            {creator?.image_url && (
              <img
                src={creator.image_url}
                alt={creator.slug}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">
              Bonjour, {creator?.slug ?? email ?? "créateur"}
            </h1>
            {publicUrl ? (
              <a
                href={publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:underline text-sm"
              >
                {publicUrl}
              </a>
            ) : (
              <p className="text-muted-foreground text-sm">
                Votre page publique sera disponible après création du profil.
              </p>
            )}
          </div>
        </div>
        <Button
          variant="default"
          className="gap-2 rounded-full bg-zinc-900 hover:bg-zinc-800 w-full sm:w-auto"
          disabled={!publicUrl}
          onClick={handleShare}
        >
          <Share className="h-4 w-4 sm:h-5 sm:w-5" />
          {copied ? "Lien copié" : "Partager la page"}
        </Button>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold">Earnings</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 rounded-full px-4 border-gray-200 text-sm sm:text-base w-full sm:w-auto"
              >
                Last 30 days
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Last 7 days</DropdownMenuItem>
              <DropdownMenuItem>Last 30 days</DropdownMenuItem>
              <DropdownMenuItem>Last 90 days</DropdownMenuItem>
              <DropdownMenuItem>All time</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <h3 className="text-5xl sm:text-6xl font-bold leading-none tracking-tight">
            {formatCurrency(walletBalance ?? 0)}
          </h3>

          <div className="flex flex-wrap gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <div className="size-4 sm:size-5 rounded bg-yellow-100"></div>
              <span className="font-medium">
                {formatCurrency(supportersTotal)}
              </span>
              <span className="text-gray-500 text-sm sm:text-base">
                Supporters
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="size-4 sm:size-5 rounded bg-pink-100"></div>
              <span className="font-medium">{formatCurrency(0)}</span>
              <span className="text-gray-500 text-sm sm:text-base">
                Membership
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="size-4 sm:size-5 rounded bg-cyan-100"></div>
              <span className="font-medium">{formatCurrency(0)}</span>
              <span className="text-gray-500 text-sm sm:text-base">Shop</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
