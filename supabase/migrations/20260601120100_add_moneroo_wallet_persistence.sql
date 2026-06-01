alter table public.wallet_transactions
  add column if not exists moneroo_payment_id text,
  add column if not exists payment_provider text not null default 'moneroo',
  add column if not exists payment_method text,
  add column if not exists currency text not null default 'XOF',
  add column if not exists donor_message text,
  add column if not exists glasses integer,
  add column if not exists raw_payload jsonb,
  add column if not exists paid_at timestamptz,
  add column if not exists updated_at timestamptz;

create unique index if not exists wallet_transactions_moneroo_payment_id_key
  on public.wallet_transactions (moneroo_payment_id);

create index if not exists wallet_transactions_creator_status_created_at_idx
  on public.wallet_transactions (creator_id, status, created_at desc);

alter table public.wallet
  add column if not exists creator_id uuid references public.creators(id) on delete cascade;

create unique index if not exists wallet_creator_id_key
  on public.wallet (creator_id);

create index if not exists wallet_creator_id_idx
  on public.wallet (creator_id);
