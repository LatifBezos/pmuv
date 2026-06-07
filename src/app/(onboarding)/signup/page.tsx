"use client";

import { authFB, authGoogle, authSign } from "@/hooks/auth0";
import { cn } from "@/lib/utils";
import { slugSearch } from "@/utils/supabase/queries";
import { BeerIcon, CircleCheck, LoaderCircle, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import createClient from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AuthField } from "../_components/auth-field";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [slugValid, setSlugValid] = useState<boolean | null>(null);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const [slug, setSlug] = useState("");

  const [showConnect, setShowConnect] = useState(false);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function redirectAuthenticatedUser() {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        window.location.href = "/dashboard";
      }
    }

    redirectAuthenticatedUser();
  }, []);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setEmail(value);
    setAuthError(null);
  };

  const handlePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPass(value);
    setAuthError(null);
  };

  const signUp = async () => {
    setIsSubmitting(true);
    setAuthError(null);
    const result = await authSign(email, pass, slug);
    if (result.error) {
      setAuthError(result.error);
      setIsSubmitting(false);
    }
  };

  const userTap = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    setSlug(value);
    setLoading(true);
    setSlugValid(null);

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(async () => {
      if (!value) {
        setSlugValid(null);
        setLoading(false);
        return;
      }

      const result = await slugSearch(value);

      if (result === true) {
        setSlugValid(false);
      } else {
        setSlugValid(true);
      }

      setLoading(false);
    }, 500);
  };

  const handleOAuth = async (provider: "google" | "facebook") => {
    if (slugValid !== true) return;

    setAuthError(null);
    window.localStorage.setItem("pendingCreatorSlug", slug);
    const result =
      provider === "google" ? await authGoogle() : await authFB();

    if (result.error) {
      window.localStorage.removeItem("pendingCreatorSlug");
      setAuthError(result.error);
    }
  };

  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex items-center justify-center bg-white">
        <img
          src="/images/omuv-4.jpg"
          alt="Signup Illustration"
          className="w-full h-screen object-cover"
        />
      </div>

      {/* Section droite */}
      {!showConnect && (
        <div className="flex flex-col items-center justify-center bg-white p-8">
          <span className="absolute top-5 right-5 cursor-pointer">
            <Link href="/" className="text-white">
              <BeerIcon
                className={cn(
                  "size-8 sm:size-12 text-black rotate-12 transition-all duration-200",
                )}
              />
            </Link>
          </span>
          <h1 className="text-4xl font-bold text-black mb-2">
            Créer votre compte
          </h1>
          <p className="text-black mb-8 text-lg">
            Choisissez un [Slug] pour votre page.
          </p>

          <div className="flex w-full max-w-sm flex-col gap-2">
            <Label htmlFor="signup-slug" className="text-left text-sm font-semibold text-foreground">
              Adresse publique
            </Label>
            <div className="flex h-12 items-center rounded-xl border border-border bg-white px-4 shadow-sm transition-all focus-within:border-primary focus-within:ring-[3px] focus-within:ring-primary/20">
              <span className="shrink-0 text-sm text-muted-foreground">
                offremoiunverre.com/
              </span>
              <Input
                id="signup-slug"
                type="text"
                placeholder="votre_slug"
                value={slug}
                aria-invalid={slugValid === false || undefined}
                aria-describedby="signup-slug-help signup-slug-status"
                autoComplete="username"
                className="h-auto border-0 bg-transparent px-1 py-0 text-left shadow-none focus-visible:border-transparent focus-visible:ring-0"
                onChange={userTap}
              />
              <div className="flex size-5 shrink-0 items-center justify-center" aria-live="polite">
                {loading && (
                  <LoaderCircle
                    aria-hidden="true"
                    className="size-5 animate-spin text-muted-foreground"
                  />
                )}
                {!loading && slugValid === true && (
                  <CircleCheck aria-hidden="true" className="size-5 text-green-700" />
                )}
                {!loading && slugValid === false && (
                  <X aria-hidden="true" className="size-5 text-destructive" />
                )}
              </div>
            </div>
            <p id="signup-slug-help" className="text-left text-xs text-muted-foreground mb-2">
              Utilisez un slug court, lisible et sans espace. {!loading && slugValid === true && (
              <p id="signup-slug-status" className="text-left text-xs font-medium text-green-700">
                Disponible.
              </p>
            )}
            {!loading && slugValid === false && (
              <p id="signup-slug-status" role="alert" className="text-left text-xs font-medium text-destructive">
                Déjà utilisé.
              </p>
            )}
            </p>
          </div>

          <div className="flex w-full max-w-sm flex-col">
            <Button
              variant="outline"
              className="h-11 px-4 rounded-xl font-semibold border border-black cursor-pointer transition-colors duration-200 text-black hover:bg-gray-800 hover:text-white"
              disabled={loading || slugValid !== true}
              onClick={() => setShowConnect(true)}
            >
              Créer mon compte
            </Button>
          </div>

          <div className="flex items-center mt-6 text-black text-center">
            <p>Vous avez déjà un compte ?</p>
            <Link href="/login" className="underline text-black font-bold ml-2">
              Se connecter
            </Link>
          </div>
        </div>
      )}

      {showConnect && (
        <div className="flex flex-col items-center justify-center bg-white p-8">
          <h1 className="text-3xl font-bold text-black mb-8">
            Bonjour , {slug}.
          </h1>

          {/* Section connect */}
          <div className="flex w-full max-w-sm flex-col gap-4">
            <AuthField
              id="signup-email"
              type="email"
              label="Email"
              placeholder="vous@exemple.com"
              value={email}
              onChange={handleEmail}
              disabled={isSubmitting}
              error={Boolean(authError)}
              autoComplete="email"
              aria-describedby={authError ? "signup-auth-error" : undefined}
            />
            <AuthField
              id="signup-password"
              type="password"
              label="Mot de passe"
              placeholder="Créez un mot de passe"
              value={pass}
              onChange={handlePass}
              disabled={isSubmitting}
              error={Boolean(authError)}
              autoComplete="new-password"
              aria-describedby={authError ? "signup-auth-error" : undefined}
            />
            {authError && (
              <p id="signup-auth-error" role="alert" className="text-left text-sm font-medium text-destructive">
                {authError}
              </p>
            )}
            <Button
              className="h-11 rounded-xl font-semibold"
              disabled={!email || !pass || slugValid !== true || isSubmitting}
              onClick={signUp}
            >
              {isSubmitting ? "Inscription..." : "S'inscrire"}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 my-5 w-full max-w-sm">
            <Separator className="flex-1" />
            <p className="text-sm text-muted-foreground">ou</p>
            <Separator className="flex-1" />
          </div>

          {/* Boutons sociaux */}
          <div className="flex flex-col w-full max-w-sm space-y-4">
            {/* Google */}
            <button
              className="flex items-center justify-center text-black bg-white px-4 py-2 rounded-lg border border-2 border-black  hover:bg-gray-800 transition p-12 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
              disabled={slugValid !== true}
              onClick={() => handleOAuth("google")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-6 h-6 mr-2"
              >
                <path
                  fill="#FFC107"
                  d="M43.611 20.083H42V20H24v8h11.303c-1.59 4.657-6.08 8-11.303 8-6.627 
                0-12-5.373-12-12s5.373-12 12-12c3.059 
                0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 
                6.053 29.268 4 24 4 12.954 4 4 12.954 4 
                24s8.954 20 20 20c11.045 0 20-8.954 
                20-20 0-1.341-.138-2.65-.389-3.917z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306 14.691l6.571 4.819C14.655 
                16.108 19.002 14 24 14c3.059 0 5.842 
                1.154 7.961 3.039l5.657-5.657C34.046 
                6.053 29.268 4 24 4c-7.843 0-14.455 
                4.522-17.694 10.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.166 0 9.86-1.977 
                13.409-5.192l-6.19-5.238C29.211 
                35.091 26.715 36 24 36c-5.202 0-9.599-3.317-11.283-7.946l-6.522 
                5.025C10.286 39.556 16.799 44 24 44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611 20.083H42V20H24v8h11.303c-1.087 
                3.185-3.025 5.877-5.571 
                7.656l.003-.002 6.19 
                5.238C39.408 36.843 44 30.523 44 
                24c0-1.341-.138-2.65-.389-3.917z"
                />
              </svg>
              Se connecter avec Google
            </button>

            {/* Facebook */}
            <button
              className="flex items-center justify-center text-black bg-white px-4 py-2 rounded-lg border border-2 border-black hover:bg-gray-800 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
              disabled={slugValid !== true}
              onClick={() => handleOAuth("facebook")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 mr-2"
              >
                <path
                  fill="#1877F2"
                  d="M22.675 0H1.325C.593 0 0 
                .593 0 1.326v21.348C0 23.407.593 
                24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 
                1.894-4.788 4.659-4.788 1.325 0 2.463.099 
                2.795.143v3.24l-1.918.001c-1.504 
                0-1.796.715-1.796 
                1.763v2.313h3.587l-.467 
                3.622h-3.12V24h6.116C23.407 24 24 
                23.407 24 22.674V1.326C24 
                .593 23.407 0 22.675 0z"
                />
              </svg>
              Se connecter avec Facebook
            </button>

            {/* LinkedIn */}
            <button
              className="flex items-center justify-center text-black bg-white px-4 py-2 rounded-lg border border-2 border-black transition disabled:cursor-not-allowed disabled:opacity-60"
              disabled
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 mr-2"
              >
                <path
                  fill="#0A66C2"
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 
                0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 
                1.637-1.852 3.368-1.852 
                3.598 0 4.263 2.368 
                4.263 5.455v6.288zM5.337 7.433a2.062 
                2.062 0 11.001-4.124 2.062 
                2.062 0 01-.001 4.124zM6.865 
                20.452H3.808V9h3.057v11.452zM22.225 
                0H1.771C.792 0 0 .771 0 
                1.723v20.549C0 23.229.792 
                24 1.771 24h20.451C23.2 
                24 24 23.229 24 
                22.271V1.723C24 .771 23.2 
                0 22.225 0z"
                />
              </svg>
              LinkedIn bientôt disponible
            </button>
          </div>

          <div className="flex items-center mt-6 text-black text-center">
            <p>Pas encore de compte ?</p>
            <Link href="/signup" className="underline font-bold ml-2">
              S'inscrire
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
