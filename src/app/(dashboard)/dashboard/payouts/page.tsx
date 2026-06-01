"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { ArrowUpRight, CircleDollarSign, Wallet } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCreatorSlugFromUser } from "@/hooks/auth0";
import type { Creators, WalletTransactions } from "@/types";
import createClient from "@/utils/supabase/client";

type CreatorWallet = {
  balance: number | null;
  updated_at: string | null;
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (date: string | null) =>
  date
    ? new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(date))
    : "Date inconnue";

export default function DashboardPayoutsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [creator, setCreator] = useState<Creators | null>(null);
  const [wallet, setWallet] = useState<CreatorWallet | null>(null);
  const [transactions, setTransactions] = useState<WalletTransactions[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPayoutsData() {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) return;

      if (!session?.user) {
        setError("Session introuvable. Reconnectez-vous pour consulter vos payouts.");
        setIsLoading(false);
        return;
      }

      setUser(session.user);
      const creatorSlug = getCreatorSlugFromUser(session.user);

      if (!creatorSlug) {
        setError("Aucun profil créateur n'est lié à cette session.");
        setIsLoading(false);
        return;
      }

      const { data: creatorData, error: creatorError } = await supabase
        .from("creators")
        .select("*")
        .eq("slug", creatorSlug)
        .maybeSingle();

      if (!isMounted) return;

      if (creatorError || !creatorData) {
        setError(
          creatorError?.message ||
            "Profil créateur introuvable. Finalisez vos paramètres.",
        );
        setIsLoading(false);
        return;
      }

      const creatorRecord = creatorData as Creators;
      const [walletResult, transactionsResult] = await Promise.all([
        supabase
          .from("wallet")
          .select("balance, updated_at")
          .eq("creator_id", creatorRecord.id)
          .maybeSingle(),
        supabase
          .from("wallet_transactions")
          .select("*")
          .eq("creator_id", creatorRecord.id)
          .eq("status", "success")
          .order("created_at", { ascending: false }),
      ]);

      if (!isMounted) return;

      if (walletResult.error) {
        setError(walletResult.error.message);
      }

      if (transactionsResult.error) {
        setError(transactionsResult.error.message);
      }

      setCreator(creatorRecord);
      setWallet((walletResult.data as CreatorWallet | null) ?? null);
      setTransactions(
        (transactionsResult.data as WalletTransactions[] | null) ?? [],
      );
      setIsLoading(false);
    }

    loadPayoutsData();

    return () => {
      isMounted = false;
    };
  }, []);

  const transactionsTotal = useMemo(
    () =>
      transactions.reduce(
        (total, transaction) => total + (transaction.amount ?? 0),
        0,
      ),
    [transactions],
  );
  const availableBalance = wallet?.balance ?? transactionsTotal;

  if (isLoading) {
    return (
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Card>
          <CardContent className="py-8">
            <p className="text-sm font-medium text-muted-foreground">
              Chargement des payouts...
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6 flex flex-col gap-2">
        <Badge variant="secondary">Payouts créateur</Badge>
        <h1 className="text-3xl font-bold">Revenus & versements</h1>
        <p className="text-sm text-muted-foreground">
          Suivez les paiements validés par Moneroo avant l'activation des
          demandes de versement.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Données indisponibles</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!creator && (
          <Alert>
            <AlertTitle>Profil créateur requis</AlertTitle>
            <AlertDescription>
              Finalisez votre profil public dans les paramètres pour recevoir et
              suivre des paiements.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="size-5" />
                Solde disponible
              </CardTitle>
              <CardDescription>
                Calculé depuis les transactions Moneroo confirmées.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-4xl font-bold">
                {formatCurrency(availableBalance)}
              </p>
              <p className="text-sm text-muted-foreground">
                Dernière mise à jour : {formatDate(wallet?.updated_at ?? null)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CircleDollarSign className="size-5" />
                Versement
              </CardTitle>
              <CardDescription>
                La demande de payout sera activée après configuration KYC et
                méthode de paiement.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button disabled>Demander un versement</Button>
              <Button asChild variant="outline">
                <Link href="/dashboard/settings">Compléter le profil</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Transactions reçues</CardTitle>
            <CardDescription>
              Historique des paiements supporters validés.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {transactions.length > 0 ? (
              <div className="flex flex-col gap-3">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex flex-col gap-3 rounded-lg border bg-background p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-medium">
                        {transaction.donor_name ?? "Supporter anonyme"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(transaction.paid_at ?? transaction.created_at)}
                        {transaction.payment_method
                          ? ` · ${transaction.payment_method}`
                          : ""}
                      </p>
                      {transaction.donor_message && (
                        <p className="mt-1 text-sm">{transaction.donor_message}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 font-semibold">
                      {formatCurrency(transaction.amount)}
                      <ArrowUpRight className="size-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Aucun paiement validé n'est encore disponible pour ce créateur.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
