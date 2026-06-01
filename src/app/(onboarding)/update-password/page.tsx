"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getSupabase, updatePassword } from "@/hooks/auth0";
import { Button } from "@/components/ui/button";
import { AuthField } from "../_components/auth-field";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    async function prepareRecoverySession() {
      const supabase = getSupabase();
      const searchParams = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const callbackError =
        searchParams.get("error_description") ||
        searchParams.get("error") ||
        hashParams.get("error_description") ||
        hashParams.get("error");

      if (callbackError) {
        setError(callbackError);
        setIsCheckingSession(false);
        return;
      }

      const code = searchParams.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          setError(error.message);
          setIsCheckingSession(false);
          return;
        }
      } else {
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");

        if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            setError(error.message);
            setIsCheckingSession(false);
            return;
          }
        }
      }

      if (code || window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }

      setIsCheckingSession(false);
    }

    prepareRecoverySession();
  }, []);

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
        <AuthField
          id="update-password-new"
          type="password"
          label="Nouveau mot de passe"
          placeholder="Votre nouveau mot de passe"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={isSubmitting}
          error={Boolean(error)}
          autoComplete="new-password"
          aria-describedby={error ? "update-password-error" : feedback ? "update-password-feedback" : undefined}
        />
        <AuthField
          id="update-password-confirmation"
          type="password"
          label="Confirmation"
          placeholder="Confirmer le mot de passe"
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          disabled={isSubmitting}
          error={Boolean(error)}
          autoComplete="new-password"
          aria-describedby={error ? "update-password-error" : feedback ? "update-password-feedback" : undefined}
        />
        {error && (
          <p id="update-password-error" role="alert" className="text-sm font-medium text-destructive">
            {error}
          </p>
        )}
        {feedback && (
          <p id="update-password-feedback" className="text-sm font-medium text-green-700">
            {feedback}
          </p>
        )}
        <Button
          className="h-11 rounded-xl font-semibold"
          disabled={!password || !confirmation || isSubmitting || isCheckingSession}
          onClick={handleSubmit}
        >
          {isCheckingSession
            ? "Vérification..."
            : isSubmitting
              ? "Mise à jour..."
              : "Mettre à jour"}
        </Button>
        <Link href="/login" className="text-center text-sm font-bold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          Retour à la connexion
        </Link>
      </div>
    </main>
  );
}
