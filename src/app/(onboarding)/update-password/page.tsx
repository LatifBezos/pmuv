"use client";

import Link from "next/link";
import { useState } from "react";

import { updatePassword } from "@/hooks/auth0";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setFeedback(null);

    if (password !== confirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsSubmitting(true);
    const result = await updatePassword(password);
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
          <h1 className="text-3xl font-bold">Nouveau mot de passe</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Choisissez un nouveau mot de passe pour votre compte.
          </p>
        </div>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="rounded-lg border-2 px-4 py-2 text-center text-black placeholder-black"
        />
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          className="rounded-lg border-2 px-4 py-2 text-center text-black placeholder-black"
        />
        {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        {feedback && <p className="text-sm font-medium text-green-700">{feedback}</p>}
        <button
          className="rounded-lg bg-blue-200 px-4 py-2 font-bold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!password || !confirmation || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Mise à jour..." : "Mettre à jour"}
        </button>
        <Link href="/login" className="text-center text-sm font-bold underline">
          Retour à la connexion
        </Link>
      </div>
    </main>
  );
}
