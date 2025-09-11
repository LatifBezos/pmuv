import Link from "next/link";
import { Button } from "@/components/ui/button";

import { EarningWaysSection } from "@/layout/dashboard/ui/sections/dashboard-section/earning-ways-section";
import { ProfileSection } from "@/layout/dashboard/ui/sections/dashboard-section/profile-section";
import { SupportersSection } from "@/layout/dashboard/ui/sections/dashboard-section/supporters-section";
import React from "react";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  console.log("session", session);

  return (
    <React.Fragment>
      {/* TODO: Check if the creator has set up his payment account */}
      {true && (
        <div className="w-full p-3 md:p-4 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 bg-orange-100">
          <p className="text-xs sm:text-sm font-bold text-center md:text-left">
            Veuillez procéder à la vérification de votre compte pour commencer à recevoir des paiements.
          </p>
          <Link href="/dashboard/settings">
            <Button className="rounded-full font-bold cursor-pointer text-xs sm:text-sm whitespace-nowrap">
              Vérifier le compte
            </Button>
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-screen md:max-w-4xl mx-auto px-4 sm:px-6 pb-8 py-12 md:py-8">
        <ProfileSection />
        <SupportersSection />
        <EarningWaysSection />
      </div>
    </React.Fragment>
  );
}
