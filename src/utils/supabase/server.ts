import { useState, useEffect, useRef } from "react";
import { SupabaseClient } from "@supabase/supabase-js";


export default function createClient () {
    if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL || 
        !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) 
        {
            throw new Error('Missing Supabase env variables');
        }
    return new SupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
} 
