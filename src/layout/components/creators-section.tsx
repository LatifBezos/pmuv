"use client";

import { Creators, WalletTransactions } from "@/types";
import createClient from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function CreatorSection({ creator }: { creator: Creators }) {
  const [selectedGlasses, setSelectedGlasses] = useState(1);
  const [supporterName, setSupporterName] = useState("");
  const [supporterEmail, setSupporterEmail] = useState("");
  const [message, setMessage] = useState("");
  const [transactions, setTransactions] = useState<WalletTransactions[]>([]);
  const [paymentError, setPaymentError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pricePerGlass = 1200;
  const total = selectedGlasses * pricePerGlass;

  useEffect(() => {
    let isMounted = true;

    async function loadSupporterMessages() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("wallet_transactions")
        .select("*")
        .eq("creator_id", creator.id)
        .eq("status", "success")
        .not("donor_message", "is", null)
        .order("created_at", { ascending: false })
        .limit(10);

      if (!isMounted) return;

      if (error) {
        console.error("Error fetching supporter messages:", error);
        return;
      }

      setTransactions((data as WalletTransactions[] | null) ?? []);
    }

    loadSupporterMessages();

    return () => {
      isMounted = false;
    };
  }, [creator.id]);

  const handleSupport = async () => {
    setPaymentError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/payments/moneroo/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creatorSlug: creator.slug,
          glasses: selectedGlasses,
          supporterEmail,
          supporterName: supporterName || undefined,
          supporterMessage: message || undefined,
        }),
      });
      const result = (await response.json()) as {
        checkoutUrl?: string;
        error?: string;
      };

      if (response.status >= 500) {
        throw new Error("Le paiement est temporairement indisponible.");
      }

      if (!response.ok || !result.checkoutUrl) {
        throw new Error(
          result.error || "Impossible de préparer le paiement."
        );
      }

      window.location.assign(result.checkoutUrl);
    } catch (error) {
      setPaymentError(
        error instanceof Error
          ? error.message
          : "Impossible de préparer le paiement."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen text-black grid md:grid-cols-2"
      style={{ backgroundColor: `${creator.color}` }}
    >
      {/* Colonne gauche : Image + Bio */}
      <div className="flex flex-col items-center justify-start p-6 border-r border-black space-y-6">
        <img
          src={creator.image_url}
          alt={creator.slug}
          className="object-cover max-h-[400px] border border-black"
        />
        <div className="w-full border-t border-black pt-4">
          <h2 className="text-xl font-bold mb-2">À propos</h2>
          <p className="leading-relaxed">
            {creator.bio ?? "Ce créateur n’a pas encore ajouté de bio."}
          </p>
        </div>
      </div>

      {/* Colonne droite : Paiement + Messages */}
      <div className="flex flex-col justify-start p-10 space-y-6">
        {/* Paiement */}
        <div>
          <p className="uppercase tracking-widest font-bold">SOUTENIR</p>
          <h1 className="text-4xl font-extrabold leading-tight">
            PAYE UN VERRE À <br /> {creator.slug}
          </h1>
          <p className="italic">Avec Offremoiunverre 🍹</p>

          {/* Choix de verres */}
          <div className="flex gap-2 my-4">
            {["1", "3", "5", "10"].map((n) => (
              <button
                key={n}
                className="px-4 py-2 border border-black font-semibold hover:bg-black hover:text-white transition data-[selected=true]:bg-black data-[selected=true]:text-white"
                data-selected={selectedGlasses === Number(n)}
                onClick={() => setSelectedGlasses(Number(n))}
              >
                {n} VERRE{n !== "1" && "S"}
              </button>
            ))}
          </div>
          <p className="mb-4 font-semibold">
            Total estimé : {total.toLocaleString("fr-FR")} FCFA
          </p>

          <form
            className="flex flex-col gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              void handleSupport();
            }}
          >
            <input
              type="email"
              placeholder="Email pour le reçu"
              value={supporterEmail}
              onChange={(event) => setSupporterEmail(event.target.value)}
              className="w-full border border-black px-3 py-2 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Nom ou @votresocial"
              value={supporterName}
              onChange={(event) => setSupporterName(event.target.value)}
              className="w-full border border-black px-3 py-2 focus:outline-none"
            />
            <textarea
              placeholder="Dites quelque chose de gentil..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="w-full border border-black px-3 py-2 focus:outline-none"
            />

            <button
              type="submit"
              className="bg-black font-bold py-3 px-6 text-lg hover:text-white transition mt-2 disabled:cursor-not-allowed disabled:opacity-70"
              style={{ color: `${creator.color}` }}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Préparation du paiement..."
                : `Paye ${selectedGlasses} verre${
                    selectedGlasses > 1 ? "s" : ""
                  }`}
            </button>
          </form>
          {paymentError && (
            <p className="mt-2 text-sm font-semibold text-red-900">
              {paymentError}
            </p>
          )}
        </div>

        <div className="mt-8 border-t border-black pt-4">
          <h2 className="text-xl font-bold mb-2">Messages des supporters</h2>
          <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-hide">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <div key={transaction.id} className="border border-black p-3">
                  <p className="text-sm">{transaction.donor_message}</p>
                  <p className="mt-2 text-xs font-semibold uppercase">
                    {transaction.donor_name ?? "Supporter anonyme"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm">
                Aucun message supporter n'est encore disponible.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { CreatorSection };
