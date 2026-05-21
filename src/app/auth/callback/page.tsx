"use client";

import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ensureCreatorProfile, getSupabase } from "@/hooks/auth0";

function getSafeNext(searchParams: URLSearchParams) {
  const next = searchParams.get("next") || "/dashboard";
  return next.startsWith("/") ? next : "/dashboard";
}

function getHashParams() {
  return new URLSearchParams(window.location.hash.replace(/^#/, ""));
}

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function completeAuthCallback() {
      const searchParams = new URLSearchParams(window.location.search);
      const hashParams = getHashParams();
      const code = searchParams.get("code");
      const next = getSafeNext(searchParams);
      const callbackError =
        searchParams.get("error_description") ||
        searchParams.get("error") ||
        hashParams.get("error_description") ||
        hashParams.get("error");
      const supabase = getSupabase();

      if (callbackError) {
        setError(callbackError);
        return;
      }

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (!session) {
            setError(error.message);
            return;
          }
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
            return;
          }
        }
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setError("La session de connexion est introuvable. Veuillez réessayer.");
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

      router.replace(next);
    }

    completeAuthCallback();
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
