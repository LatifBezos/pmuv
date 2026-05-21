"use client";

import { Heart } from "lucide-react";

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
      <div className="bg-white p-4 sm:p-6 rounded-xl">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Derniers supporters
        </h2>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between gap-4 rounded-lg border p-3"
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
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 bg-white p-8 sm:p-12 rounded-xl text-center">
      <div className="rounded-full bg-gray-100 p-3 sm:p-4">
        <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
      </div>
      <h2 className="text-lg sm:text-xl font-semibold">
        Vous n'avez pas encore de supporters
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground max-w-xs sm:max-w-sm">
        Partagez votre page avec votre audience pour commencer.
      </p>
    </div>
  );
}
