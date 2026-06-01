import {
  createClient as createSupabaseClient,
  SupabaseClient,
} from "@supabase/supabase-js";


export default function createClient () {
    if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL || 
        !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) 
        {
            throw new Error('Missing Supabase env variables');
        }
    return new SupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
} 

export function createServiceRoleClient() {
    if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
        throw new Error('Missing Supabase service role env variables');
    }

    return createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
            },
        },
    );
}
