"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ProfileSection } from "@/layout/dashboard/ui/sections/dashboard-section/profile-section";
import { SupportersSection } from "@/layout/dashboard/ui/sections/dashboard-section/supporters-section";
import createClient from "@/utils/supabase/client";
import { Creators, WalletTransactions } from "@/types";
import type { User } from "@supabase/supabase-js";
import React, { useEffect, useMemo, useState } from "react";
import { getCreatorSlugFromUser } from "@/hooks/auth0";

type CreatorWallet = {
  balance: number | null;
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [creator, setCreator] = useState<Creators | null>(null);
  const [transactions, setTransactions] = useState<WalletTransactions[]>([]);
  const [wallet, setWallet] = useState<CreatorWallet | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardData() {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) return;

      if (!session?.user) {
        setIsLoading(false);
        return;
      }

      setUser(session.user);
      const creatorSlug = getCreatorSlugFromUser(session.user);
      let creatorData = null;
      let creatorError = null;

      if (creatorSlug) {
        const result = await supabase
          .from("creators")
          .select("*")
          .eq("slug", creatorSlug)
          .maybeSingle();

        creatorData = result.data;
        creatorError = result.error;
      }

      if (creatorError) {
        console.error("Error fetching dashboard creator:", creatorError);
      }

      const creatorRecord = (creatorData as Creators | null) ?? null;
      let transactionData: WalletTransactions[] = [];
      let walletData: CreatorWallet | null = null;

      if (creatorRecord) {
        const [transactionsResult, walletResult] = await Promise.all([
          supabase
            .from("wallet_transactions")
            .select("*")
            .eq("creator_id", creatorRecord.id)
            .eq("status", "success")
            .order("created_at", { ascending: false }),
          supabase
            .from("wallet")
            .select("balance")
            .eq("creator_id", creatorRecord.id)
            .maybeSingle(),
        ]);

        if (transactionsResult.error) {
          console.error(
            "Error fetching dashboard transactions:",
            transactionsResult.error,
          );
        }

        if (walletResult.error) {
          console.error("Error fetching dashboard wallet:", walletResult.error);
        }

        transactionData =
          (transactionsResult.data as WalletTransactions[] | null) ?? [];
        walletData = (walletResult.data as CreatorWallet | null) ?? null;
      }

      if (!isMounted) return;

      setCreator(creatorRecord);
      setTransactions(transactionData);
      setWallet(walletData);
      setIsLoading(false);
    }

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const supportersTotal = useMemo(
    () =>
      transactions.reduce(
        (total, transaction) => total + (transaction.amount ?? 0),
        0
      ),
    [transactions]
  );
  const walletBalance = wallet?.balance ?? supportersTotal;

  return (
    <React.Fragment>
      {!isLoading && creator && (
        <div className="border-b bg-amber-50/80 px-4 py-3">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-center text-sm font-medium text-amber-950 sm:text-left">
              Consultez vos revenus et les prérequis de versement dans le volet
              payouts.
            </p>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/dashboard/payouts">Ouvrir payouts</Link>
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-screen md:max-w-4xl mx-auto px-4 sm:px-6 pb-8 py-12 md:py-8">
        {isLoading ? (
          <Card>
            <CardHeader>
              <CardTitle>Chargement du dashboard</CardTitle>
              <CardDescription>
                Nous récupérons votre session et vos données créateur.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium text-muted-foreground">
                Chargement...
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <ProfileSection
              creator={creator}
              email={user?.email}
              walletBalance={walletBalance}
              supportersTotal={supportersTotal}
            />
            <SupportersSection transactions={transactions} />
          </>
        )}
        {/* <EarningWaysSection /> */}
      </div>
    </React.Fragment>
  );
}
