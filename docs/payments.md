# Paiements Moneroo

## État actuel

L'intégration Moneroo est initialisée côté serveur uniquement. Le frontend ne manipule aucune clé API.

Services ajoutés :

- `src/services/moneroo/config.ts` : lecture et validation des variables d'environnement.
- `src/services/moneroo/client.ts` : client HTTP minimal pour `initialize`, `retrieve` et `verify`.
- `src/services/moneroo/payments.ts` : service métier pour initialiser un soutien créateur.
- `src/services/moneroo/webhooks.ts` : vérification HMAC-SHA256 de `X-Moneroo-Signature`, re-vérification du paiement via l'API Moneroo et persistance des paiements validés.
- `src/services/wallet/moneroo-transactions.ts` : écriture idempotente dans `wallet_transactions` et recalcul du solde `wallet`.
- `POST /api/payments/moneroo/initialize` : prépare un paiement et retourne `checkoutUrl`.
- `POST /api/payments/moneroo/webhook` : reçoit les événements Moneroo signés.

## Variables d'environnement

À demander ou configurer avant un test réel :

```bash
MONEROO_SECRET_KEY=
MONEROO_WEBHOOK_SECRET=
MONEROO_BASE_URL=https://api.moneroo.io
MONEROO_PAYMENT_CURRENCY=XOF
MONEROO_PRICE_PER_GLASS=1200
MONEROO_PAYMENT_METHODS=mtn_bj,moov_bj
SUPABASE_SERVICE_ROLE_KEY=
```

Notes :

- `MONEROO_SECRET_KEY` doit rester côté serveur.
- `MONEROO_WEBHOOK_SECRET` doit correspondre au secret configuré dans le dashboard Moneroo pour l'URL webhook.
- `SUPABASE_SERVICE_ROLE_KEY` est requis côté serveur pour que le webhook écrive dans les tables protégées par RLS. Ne jamais l'exposer avec un préfixe `NEXT_PUBLIC_`.
- `MONEROO_BASE_URL` peut rester absent si l'API officielle `https://api.moneroo.io` est utilisée.
- Pour tester en sandbox, Moneroo demande d'utiliser des clés sandbox depuis le dashboard. La base URL reste documentée comme `https://api.moneroo.io`.
- `MONEROO_PAYMENT_METHODS` est optionnel. Si absent, Moneroo affichera les moyens disponibles pour la transaction.

## Payload d'initialisation

```json
{
  "creatorSlug": "slug-createur",
  "glasses": 1,
  "supporterEmail": "supporter@example.com",
  "supporterName": "Supporter PMUV",
  "supporterMessage": "Bravo !",
  "supporterPhone": "+22951345020"
}
```

Réponse :

```json
{
  "paymentId": "moneroo_payment_id",
  "checkoutUrl": "https://checkout.moneroo.io/...",
  "amount": 1200,
  "currency": "XOF",
  "creatorSlug": "slug-createur"
}
```

Le client devra rediriger vers `checkoutUrl`.

## Persistance en base

La migration `supabase/migrations/20260601120100_add_moneroo_wallet_persistence.sql` ajoute les colonnes nécessaires :

- `wallet_transactions.moneroo_payment_id` unique pour l'idempotence webhook.
- `currency`, `payment_provider`, `payment_method`, `donor_message`, `glasses`, `raw_payload`, `paid_at`, `updated_at`.
- `wallet.creator_id` unique pour rattacher un solde à un créateur.

À chaque webhook `payment.success`, l'application re-vérifie le paiement auprès de Moneroo avant d'insérer la transaction. En cas de webhook dupliqué, la contrainte unique évite un double enregistrement, puis le solde du wallet est recalculé depuis les transactions `success`.

## Points à finaliser

- Configurer dans Moneroo l'URL webhook publique : `/api/payments/moneroo/webhook`.
- Implémenter le vrai workflow de demande de payout/KYC quand les tables et règles métier seront stabilisées.
