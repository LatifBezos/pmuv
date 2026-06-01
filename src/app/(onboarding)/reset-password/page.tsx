"use client";

import Link from "next/link";
import { useState } from "react";

import { requestPasswordReset } from "@/hooks/auth0";
import { Button } from "@/components/ui/button";
import { AuthField } from "../_components/auth-field";

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
        <AuthField
          id="reset-password-email"
          type="email"
          label="Email"
          placeholder="vous@exemple.com"
          value={email}
          onChange={(event) => setEmail(event.target.value.trim())}
          disabled={isSubmitting}
          error={Boolean(error)}
          autoComplete="email"
          aria-describedby={error ? "reset-password-error" : feedback ? "reset-password-feedback" : undefined}
        />
        {error && (
          <p id="reset-password-error" role="alert" className="text-sm font-medium text-destructive">
            {error}
          </p>
        )}
        {feedback && (
          <p id="reset-password-feedback" className="text-sm font-medium text-green-700">
            {feedback}
          </p>
        )}
        <Button
          className="h-11 rounded-xl font-semibold"
          disabled={!email || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Envoi..." : "Envoyer le lien"}
        </Button>
        <Link href="/login" className="text-center text-sm font-bold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          Retour à la connexion
        </Link>
      </div>
    </main>
  );
}
