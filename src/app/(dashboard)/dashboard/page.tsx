"use client";

import { Button } from "@/components/ui/button";

import { ProfileSection } from "@/layout/dashboard/ui/sections/dashboard-section/profile-section";
import { SupportersSection } from "@/layout/dashboard/ui/sections/dashboard-section/supporters-section";
import createClient from "@/utils/supabase/client";
import { Creators, WalletTransactions } from "@/types";
import type { User } from "@supabase/supabase-js";
import React, { useEffect, useMemo, useState } from "react";

type Wallet = {
  balance: number | null;
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [creator, setCreator] = useState<Creators | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<WalletTransactions[]>([]);
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

      const { data: creatorData, error: creatorError } = await supabase
        .from("creators")
        .select("*")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (creatorError) {
        console.error("Error fetching dashboard creator:", creatorError);
      }

      const { data: walletData, error: walletError } = await supabase
        .from("wallet")
        .select("balance")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (walletError) {
        console.error("Error fetching dashboard wallet:", walletError);
      }

      const creatorRecord = (creatorData as Creators | null) ?? null;
      let transactionData: WalletTransactions[] = [];

      if (creatorRecord) {
        const { data, error } = await supabase
          .from("wallet_transactions")
          .select("*")
          .eq("creator_id", creatorRecord.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching dashboard transactions:", error);
        }

        transactionData = (data as WalletTransactions[] | null) ?? [];
      }

      if (!isMounted) return;

      setCreator(creatorRecord);
      setWallet((walletData as Wallet | null) ?? null);
      setTransactions(transactionData);
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

  return (
    <React.Fragment>
      {!isLoading && creator && !wallet && (
        <div className="w-full p-3 md:p-4 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 bg-orange-100">
          <p className="text-xs sm:text-sm font-bold text-center md:text-left">
            La configuration payout n'est pas encore disponible dans cette version.
          </p>
          <Button
            className="rounded-full font-bold text-xs sm:text-sm whitespace-nowrap"
            disabled
          >
            Bientôt disponible
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-screen md:max-w-4xl mx-auto px-4 sm:px-6 pb-8 py-12 md:py-8">
        {isLoading ? (
          <div className="bg-white p-6 rounded-xl">Chargement du dashboard...</div>
        ) : (
          <>
            <ProfileSection
              creator={creator}
              email={user?.email}
              walletBalance={wallet?.balance}
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
