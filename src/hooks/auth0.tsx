import type { Provider, User } from "@supabase/supabase-js";
import createClient from "@/utils/supabase/client";

export function getSupabase() {
  return createClient();
}

const DEFAULT_CREATOR_COLOR = "#40916c";

export function getCreatorSlugFromUser(user: User) {
  const slug = user.user_metadata?.slug;
  return typeof slug === "string" && slug.length > 0 ? slug : null;
}

function getRedirectUrl(path = "/dashboard") {
  if (typeof window === "undefined") {
    return path;
  }

  return `${window.location.origin}${path}`;
}

export async function ensureCreatorProfile(user: User, slug?: string) {
  if (!slug) return null;

  const supabase = getSupabase();
  const { data: existingCreator, error: existingError } = await supabase
    .from("creators")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (existingError) {
    return existingError.message;
  }

  if (existingCreator) return null;

  const { error } = await supabase.from("creators").insert({
    slug,
    color: DEFAULT_CREATOR_COLOR,
  });

  return error?.message ?? null;
}

export async function authSign(
  email: string,
  password: string,
  slug?: string,
  redirectPath = "/dashboard"
): Promise<{ error: string | null, message: string }> {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        slug,
      },
      emailRedirectTo: getRedirectUrl(
        `/auth/callback?next=${encodeURIComponent(redirectPath)}`
      ),
    },
  });
  if (error) {
    return { error: error.message, message: "" };
  }

  if (data.user) {
    const creatorError = await ensureCreatorProfile(data.user, slug);
    if (creatorError) {
      return { error: creatorError, message: "" };
    }
  }

  window.location.href = getRedirectUrl(redirectPath);
  return { error: null, message: "Inscription réussie !" };
}


export async function authConnect(
  email: string,
  password: string,
  redirectPath = "/dashboard"
): Promise<{ error: string | null, message: string }> {
  const supabase = getSupabase();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: password,
  });

  if (error) {
    return { error: error.message, message: "" };
  }

  window.location.href = getRedirectUrl(redirectPath);
  return { error: null, message: "Connexion réussie !" };
}




async function signInWithOAuth(provider: Provider, redirectPath = "/dashboard") {
  const supabase = getSupabase();

  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: getRedirectUrl(
        `/auth/callback?next=${encodeURIComponent(redirectPath)}`
      ),
    },
  });

  if (error) {
    return { error: error.message, message: "" };
  }

  return { error: null, message: "Redirection OAuth en cours." };
}

export async function authGoogle(redirectPath = "/dashboard") {
  return signInWithOAuth("google", redirectPath);
}

export async function authFB(redirectPath = "/dashboard") {
  return signInWithOAuth("facebook", redirectPath);
}

export async function requestPasswordReset(email: string) {
  const supabase = getSupabase();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: getRedirectUrl("/update-password"),
  });

  if (error) {
    return { error: error.message, message: "" };
  }

  return {
    error: null,
    message: "Un lien de réinitialisation a été envoyé si cet email existe.",
  };
}

export async function updatePassword(password: string) {
  const supabase = getSupabase();
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return { error: error.message, message: "" };
  }

  return { error: null, message: "Mot de passe mis à jour." };
}


export async function logOut() {
  const supabase = getSupabase();
  await supabase.auth.signOut();
  window.location.href = "/";
}
