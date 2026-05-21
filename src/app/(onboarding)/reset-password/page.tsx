"use client";

import Link from "next/link";
import { useState } from "react";

import { requestPasswordReset } from "@/hooks/auth0";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    setFeedback(null);

    const result = await requestPasswordReset(email);
    setIsSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setFeedback(result.message);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white p-8 text-black">
      <div className="flex w-full max-w-sm flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mot de passe oublié</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Entrez votre email pour recevoir un lien de réinitialisation.
          </p>
        </div>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value.trim())}
          className="rounded-lg border-2 px-4 py-2 text-center text-black placeholder-black"
        />
        {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        {feedback && <p className="text-sm font-medium text-green-700">{feedback}</p>}
        <button
          className="rounded-lg bg-blue-200 px-4 py-2 font-bold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!email || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Envoi..." : "Envoyer le lien"}
        </button>
        <Link href="/login" className="text-center text-sm font-bold underline">
          Retour à la connexion
        </Link>
      </div>
    </main>
  );
}
