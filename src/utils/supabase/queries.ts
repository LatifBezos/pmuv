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

console.log('Supabase creator:', supabase);


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


export const slugSearch = cache(async (slug: string) => {
  if (!slug) return false;

  const { data, error } = await supabase
    .from("creators")
    .select("*")
    .eq("slug", slug); // recherche exacte

  if (error) {
    console.error("Error fetching creators with this slug:", error);
    return false;
  }

  if (data && data.length > 0) {
    console.log("slug trouvé", data);
    return true; // le slug existe déjà
  } else {
    return false; // le slug n'existe pas
  }
});


export const getProjects = cache(async () => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
    if (error) {
        console.error('Error fetching projects with this slug:', error);
        return [];
    }
    return data;
});


export const getEvents = cache(async () => {
    const { data, error } = await supabase
        .from('events')
        .select('*')
    if (error) {
        console.error('Error fetching events with this slug:', error);
        return [];
    }
    return data;
});



export const getCatalogues = cache(async () => {
    const { data, error } = await supabase
        .from('catalogues')
        .select('*')
    if (error) {
        console.error('Error fetching catalogues with this slug:', error);
        return [];
    }
    return data;
});



