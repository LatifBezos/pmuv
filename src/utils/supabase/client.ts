import {
  createClient as createSupabaseClient,
  type SupabaseClient,
} from "@supabase/supabase-js";

type GlobalWithSupabase = typeof globalThis & {
  __pmuvSupabaseClient?: SupabaseClient;
};

const supabaseOptions = {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
};

export default function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase env variables");
  }

  if (typeof window === "undefined") {
    return createSupabaseClient(supabaseUrl, supabaseAnonKey, supabaseOptions);
  }

  const globalWithSupabase = globalThis as GlobalWithSupabase;

  if (!globalWithSupabase.__pmuvSupabaseClient) {
    globalWithSupabase.__pmuvSupabaseClient = createSupabaseClient(
      supabaseUrl,
      supabaseAnonKey,
      supabaseOptions,
    );
  }

  return globalWithSupabase.__pmuvSupabaseClient;
}

export async function readUserData() {
  const supabase = createClient();
  return supabase.auth.getUser();
}

export async function signOut() {
  const supabase = createClient();
  return supabase.auth.signOut();
}
