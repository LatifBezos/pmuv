import { SupabaseClient } from "@supabase/supabase-js";

export function createClient () {
    if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL || 
        !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) 
        {
            throw new Error('Missing Supabase env variables');
        }
    return new SupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
} 

export async function readUserData() {
    const supabase = createClient();
    return supabase.auth.getUser();
  }
  
  export async function signOut() {
    const supabase = createClient();
    return supabase.auth.signOut();
  }
  