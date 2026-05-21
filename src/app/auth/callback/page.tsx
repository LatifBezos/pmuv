"use client";

import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ensureCreatorProfile, getSupabase } from "@/hooks/auth0";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function exchangeCode() {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      const next = searchParams.get("next") || "/dashboard";

      if (!code) {
        setError("Le code de connexion est manquant.");
        return;
      }

      const supabase = getSupabase();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        setError(error.message);
        return;
      }

      const pendingSlug = window.localStorage.getItem("pendingCreatorSlug");
      if (pendingSlug) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const creatorError = await ensureCreatorProfile(user, pendingSlug);
          if (creatorError) {
            setError(creatorError);
            return;
          }

          await supabase.auth.updateUser({
            data: {
              slug: pendingSlug,
            },
          });
        }

        window.localStorage.removeItem("pendingCreatorSlug");
      }

      router.replace(next.startsWith("/") ? next : "/dashboard");
    }

    exchangeCode();
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white p-8 text-center text-black">
      {error ? (
        <>
          <h1 className="text-2xl font-bold">Connexion impossible</h1>
          <p className="max-w-md text-muted-foreground">{error}</p>
          <button
            className="rounded-lg bg-black px-4 py-2 font-bold text-white"
            onClick={() => router.replace("/login")}
          >
            Retour à la connexion
          </button>
        </>
      ) : (
        <>
          <LoaderCircle className="size-8 animate-spin" />
          <p className="font-medium">Finalisation de la connexion...</p>
        </>
      )}
    </main>
  );
}
