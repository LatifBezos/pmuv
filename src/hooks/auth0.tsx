import { createClient } from "@supabase/supabase-js";
import { de } from "date-fns/locale";

export function getSupabase() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase env variables");
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function authSign(email: string, password: string): Promise<{ error: string | null, message: string }> {
  const supabase = getSupabase();
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    return { error: error.message, message: "" };
  } else {
    window.location.href = "http://localhost:3010/dashboard";
    return { error: null, message: "Inscription réussie !" };
  }
}


export async function authConnect(email: string, password: string): Promise<{ error: string | null, message: string }> {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: password,
  });

  if (error) {
    console.log("authConnnect", error.message);
    return { error: error.message, message: "" };
  } else {
    console.log("Connexion réussie !");
    console.log("Session :", data.session);
    return { error: null, message: "Connexion réussie !" };
  }
}




export async function authGoogle() {
  const supabase = getSupabase();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3010/dashboard",
    },
  });

  if (error) {
    console.error("Erreur Google OAuth :", error.message);
  } else {
    console.log("Redirection vers Google OAuth…", data);
  }
}


export async function authFB() {
    const supabase = getSupabase()
    
    const {data, error} = await supabase.auth.signInWithOAuth({
        provider:"facebook",
        options: {
            redirectTo: `http://localhost:3010/dashboard`,
        },
    })
    if (error) {
        console.error("Erreur Google OAuth :", error.message);
    } else {
        console.log("Redirection vers Google OAuth…", data);
    }
}


export async function logOut() {
  const supabase = getSupabase();
  await supabase.auth.signOut()
  window.location.href = '/'
}