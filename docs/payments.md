# Paiements Moneroo

## État actuel

L'intégration Moneroo est initialisée côté serveur uniquement. Le frontend ne manipule aucune clé API.

Services ajoutés :

- `src/services/moneroo/config.ts` : lecture et validation des variables d'environnement.
- `src/services/moneroo/client.ts` : client HTTP minimal pour `initialize`, `retrieve` et `verify`.
- `src/services/moneroo/payments.ts` : service métier pour initialiser un soutien créateur.
- `src/services/moneroo/webhooks.ts` : vérification HMAC-SHA256 de `X-Moneroo-Signature` et re-vérification du paiement via l'API Moneroo.
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
```

Notes :

- `MONEROO_SECRET_KEY` doit rester côté serveur.
- `MONEROO_WEBHOOK_SECRET` doit correspondre au secret configuré dans le dashboard Moneroo pour l'URL webhook.
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

## Points à finaliser

- Ajouter un champ email sur la page créateur avant de brancher le bouton public, car Moneroo exige `customer.email`.
- Ajouter une table dédiée ou des colonnes d'idempotence avant d'écrire dans `wallet_transactions` depuis les webhooks (`moneroo_payment_id` unique, `currency`, `donor_message`, `raw_payload` ou équivalent).
- Après réception d'un webhook, toujours re-vérifier avec `GET /v1/payments/{paymentId}/verify` avant de créditer le créateur.
- Configurer dans Moneroo l'URL webhook publique : `/api/payments/moneroo/webhook`.
