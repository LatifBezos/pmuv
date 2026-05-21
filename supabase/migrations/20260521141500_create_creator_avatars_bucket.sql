-- Configure Supabase Storage for creator avatar uploads.
-- The app writes objects as: <auth.uid()>/<slug>-avatar.<ext>

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'creator-avatars',
  'creator-avatars',
  true,
  2097152,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Creator avatars are publicly readable" on storage.objects;
create policy "Creator avatars are publicly readable"
on storage.objects for select
using (bucket_id = 'creator-avatars');

drop policy if exists "Authenticated users can upload their creator avatar" on storage.objects;
create policy "Authenticated users can upload their creator avatar"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'creator-avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Authenticated users can replace their creator avatar" on storage.objects;
create policy "Authenticated users can replace their creator avatar"
on storage.objects for update
to authenticated
using (
  bucket_id = 'creator-avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'creator-avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Authenticated users can delete their creator avatar" on storage.objects;
create policy "Authenticated users can delete their creator avatar"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'creator-avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);
