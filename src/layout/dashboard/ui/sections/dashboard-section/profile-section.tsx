"use client";

import { ChevronDown, Share } from "lucide-react";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <div className="flex flex-col gap-6">
      <Card>
        <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full items-center gap-4 sm:w-auto">
            <Avatar className="size-16 border">
              {creator?.image_url && (
                <AvatarImage src={creator.image_url} alt={creator.slug} />
              )}
              <AvatarFallback className="text-base font-semibold">
                {(creator?.slug ?? email ?? "cr").slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <Badge variant="secondary" className="w-fit">
                Profil créateur
              </Badge>
              <h1 className="text-2xl font-semibold">
                Bonjour, {creator?.slug ?? email ?? "créateur"}
              </h1>
              {publicUrl ? (
                <a
                  href={publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                >
                  {publicUrl}
                </a>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Votre page publique sera disponible après création du profil.
                </p>
              )}
            </div>
          </div>
          <Button
            className="w-full gap-2 rounded-full sm:w-auto"
            disabled={!publicUrl}
            onClick={handleShare}
          >
            <Share />
            {copied ? "Lien copié" : "Partager la page"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Revenus</CardTitle>
            <CardDescription>
              Total provisoire basé sur les transactions disponibles.
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full gap-2 rounded-full sm:w-auto"
              >
                Toutes les périodes
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>7 derniers jours</DropdownMenuItem>
              <DropdownMenuItem>30 derniers jours</DropdownMenuItem>
              <DropdownMenuItem>90 derniers jours</DropdownMenuItem>
              <DropdownMenuItem>Toute la période</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <CardContent className="flex flex-col gap-5">
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
        </CardContent>
      </Card>
    </div>
  );
}
