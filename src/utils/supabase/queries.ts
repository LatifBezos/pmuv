import {cache} from 'react';
import createClient from '@/utils/supabase/client';

const supabase = createClient();


export const getCreators = cache(async () => {
    const { data, error } = await supabase
        .from('creators')
        .select('*');
    if (error) {
        console.error('Error fetching creators:', error);
        return [];
    }
    return data;
});



export const slugCreator = cache(async (slug: string) => {
    const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('slug', slug);
    if (error) {
        console.error('Error fetching creator with this slug:', error);
        return [];
    }
    return data;
});
