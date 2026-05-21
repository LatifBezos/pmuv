"use client";

import { Heart } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WalletTransactions } from "@/types";

type SupportersSectionProps = {
  transactions: WalletTransactions[];
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  }).format(amount);

export function SupportersSection({ transactions }: SupportersSectionProps) {
  if (transactions.length > 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Derniers supporters</CardTitle>
          <CardDescription>
            Contributions récentes liées à votre page créateur.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between gap-4 rounded-lg border bg-background p-3"
              >
                <div>
                  <p className="font-medium">
                    {transaction.donor_name ?? "Supporter anonyme"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.status ?? "Statut inconnu"}
                  </p>
                </div>
                <p className="font-semibold">
                  {formatCurrency(transaction.amount)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center gap-4 p-8 text-center sm:p-12">
        <div className="rounded-full bg-gray-100 p-3 sm:p-4">
          <Heart className="size-6 text-gray-400" />
        </div>
        <h2 className="text-lg font-semibold sm:text-xl">
          Vous n'avez pas encore de supporters
        </h2>
        <p className="max-w-xs text-sm text-muted-foreground sm:max-w-sm sm:text-base">
          Partagez votre page avec votre audience pour commencer.
        </p>
      </CardContent>
    </Card>
  );
}
