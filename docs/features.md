# Inventaire des fonctionnalités — PMUV v1

> **Légende**
>
> | Symbole | Signification |
> |---------|---------------|
> | ✅ | Fonctionnel — relié aux données réelles et utilisable de bout en bout |
> | 🟡 | Partiel — UI ou logique présente, mais incomplet, mocké ou bugué |
> | ❌ | Non fonctionnel — stub, placeholder ou code mort |
> | 🔜 | Manquant pour la v1 — attendu dans le périmètre v1 mais absent |

**Périmètre v1** (d'après la vision produit) : un créateur peut s'inscrire, obtenir une page publique, recevoir des « verres » payés en FCFA, et consulter ses supporters/revenus ; un supporter peut découvrir des créateurs et payer.

---

## 1. Site public & marketing

| Fonctionnalité | Route / fichier | Statut | Détail |
|----------------|---------------|--------|--------|
| Page d'accueil | `/` | ✅ | Hero, features, carrousels créateurs/projets, section paiements |
| Section hero + CTA | `hero-section.tsx` | ✅ | CTA reliés aux routes existantes |
| Section « Comment ça marche » | `features-section.tsx` | ✅ | Contenu statique |
| Carrousel créateurs (accueil) | `creators-section.tsx` | ✅ | Données Supabase via `getCreators()` |
| Carrousel projets (accueil) | `projects-section.tsx` | ❌ | Placeholders vides (`Array.from`), pas de données |
| Section moyens de paiement | `best-section.tsx` | ✅ | Logos Orange Money, Wave, MTN, Stripe, etc. (marketing) |
| Navbar + menu mobile | `home-navbar.tsx` | ✅ | Liens créateurs, projets, auth, recherche |
| Footer | `footer.tsx` | 🟡 | Liens cassés neutralisés ; newsletter sans backend |
| Page 404 | `not-found.tsx` | ✅ | Lien retour accueil |
| Lien Events (navbar) | — | 🔜 | Commenté dans `home-navbar.tsx` |
| Lien Catalogues (navbar) | — | 🔜 | Commenté dans `home-navbar.tsx` |

---

## 2. Découverte & navigation

| Fonctionnalité | Route | Statut | Détail |
|----------------|-------|--------|--------|
| Liste des créateurs | `/creators` | ✅ | SSR + `getCreators()` + grille `CreatorsAll` |
| Recherche créateurs | `/search` | ✅ | Champ de saisie + filtrage effectif côté client |
| Page créateur publique | `/creator/[slug]` | 🟡 | Profil chargé depuis Supabase ; formulaire supporter local, paiement réel encore absent |
| Liste des projets | `/projects` | 🟡 | Données Supabase OK ; faux liens détail projet retirés en attendant `/projects/[slug]` |
| Liste des événements | `/events` | 🟡 | Données Supabase OK ; faux liens détail événement retirés en attendant `/events/[slug]` |
| Page catalogue produits | `/catalogues` | 🔜 | Requête `getCatalogues()` existe ; **aucune page** |
| Page projet détaillée | `/projects/[slug]` | 🔜 | Absente |
| Page événement détaillée | `/events/[slug]` | 🔜 | Absente |
| Route racine `[slug].tsx` | `app/[slug].tsx` | ✅ | Neutralisée pour éviter le doublon avec `(home)/creator/[slug]` |

---

## 3. Page créateur (supporter)

| Fonctionnalité | Fichier | Statut | Détail |
|----------------|---------|--------|--------|
| Affichage bio + image | `creators-section.tsx` | ✅ | Données `creators` (Supabase) |
| Thème couleur personnalisé | `creators-section.tsx` | ✅ | `creator.color` appliqué au layout |
| Choix nombre de verres (1/3/5/10) | `creators-section.tsx` | 🟡 | État UI fonctionnel ; pas encore relié au paiement réel |
| Saisie nom / message supporter | `creators-section.tsx` | 🟡 | Champs contrôlés côté UI ; pas encore persistés |
| Bouton « Paye un verre » | `creators-section.tsx` | ❌ | Aucune action (pas d'appel API ni paiement) |
| Composant PaymentBox (démo) | `/box`, `payment-box.tsx` | 🟡 | Stub `alert()` retiré ; reste une démo sans passerelle de paiement |
| Mur des messages supporters | `creators-section.tsx` | 🟡 | Mocks retirés ; état vide tant que les transactions/messages ne sont pas branchés |
| DrinkCard animé (prototype) | `CreatorList.tsx` | ❌ | Composant isolé, données mock, non utilisé en prod |
| Affichage transactions réelles | — | 🔜 | Table `wallet_transactions` non consommée côté front |

---

## 4. Authentification & onboarding

| Fonctionnalité | Route | Statut | Détail |
|----------------|-------|--------|--------|
| Page inscription (choix slug) | `/signup` | ✅ | Vérification unicité slug + transmission aux métadonnées Auth |
| Page inscription (email/mdp) | `/signup` | ✅ | `authSign()` Supabase + création minimale du profil créateur via slug |
| Page connexion email/mdp | `/login` | ✅ | State inputs corrigé + erreurs utilisateur |
| OAuth Google | `auth0.tsx` | ✅ | Configuré avec redirect dynamique |
| OAuth Facebook | `auth0.tsx` | ✅ | Configuré avec redirect dynamique |
| OAuth LinkedIn | `/login`, `/signup` | 🔜 | Non proposé dans l'UI actuelle |
| Callback OAuth | `/auth/callback` | ✅ | Callback client + `exchangeCodeForSession` + redirection `next` |
| Déconnexion | `profile-float-button.tsx` | ✅ | `logOut()` → `signOut` + redirect `/` |
| Protection routes dashboard | `(dashboard)/layout.tsx` | ✅ | Garde serveur : redirection `/login?next=/dashboard` sans session |
| Liaison `auth.users` ↔ `creators` | `auth0.tsx` | 🟡 | Création minimale depuis le slug ; enrichissement profil encore à faire |
| Validation email | — | 🔜 | Non géré côté UI |
| Réinitialisation mot de passe | `/reset-password`, `/update-password` | ✅ | Flux reset + mise à jour du mot de passe |

---

## 5. Espace créateur (dashboard)

| Fonctionnalité | Route | Statut | Détail |
|----------------|-------|--------|--------|
| Layout dashboard + sidebar | `/dashboard/*` | ✅ | Sidebar, header, menu flottant profil |
| Overview / accueil dashboard | `/dashboard` | 🟡 | UI complète ; données session/créateur/wallet/transactions chargées quand disponibles |
| Bannière configuration payout | `dashboard/page.tsx` | 🟡 | Affichée seulement si pertinent ; action désactivée tant que settings/payout absent |
| Section profil créateur | `profile-section.tsx` | 🟡 | Données créateur/session dynamiques ; enrichissement profil encore limité |
| Section revenus (Earnings) | `profile-section.tsx` | 🟡 | Solde wallet et total supporters lus quand disponibles |
| Section supporters | `supporters-section.tsx` | 🟡 | Lit `wallet_transactions` quand un créateur existe ; dépend encore du paiement réel |
| Partage de page | `profile-section.tsx` | ✅ | Lien dynamique basé sur le slug créateur |
| Navigation Overview | `nav-main.tsx` | ✅ | Lien `/dashboard` |
| Navigation View page | `nav-main.tsx` | 🟡 | Lien dynamique quand le créateur est chargé ; fallback désactivé |
| Explore creators | `/dashboard/explore-creators` | ✅ | Liste réelle des créateurs |
| Nav Monetize (sidebar) | `nav-monetize.tsx` | ❌ | Commenté dans `dashboard-sidebar.tsx` |
| Payouts (sidebar) | `nav-settings.tsx` | ❌ | Bouton sans `href` ni page |
| Settings (sidebar) | `nav-settings.tsx` | ❌ | Bouton sans `href` ; `/dashboard/settings` inexistant |
| Profile (menu flottant) | `/dashboard/profile` | 🔜 | Lien présent, **page absente** |
| My account | `/dashboard/settings` | 🔜 | Lien présent, **page absente** |
| Session utilisateur (header) | `layout.tsx` | ✅ | Session utilisée pour protéger le dashboard |
| More ways to earn | `earning-ways-section.tsx` | ❌ | Composant commenté sur dashboard ; liens vers routes inexistantes |

---

## 6. Monétisation avancée (hors v1 core, présent en UI/code)

| Fonctionnalité | Route prévue | Statut | Détail |
|----------------|--------------|--------|--------|
| Membership mensuel | `/dashboard/memberships` | 🔜 | Carte UI dans `earning-ways-section` ; route absente |
| Boutique (Shop) | `/dashboard/shop` | 🔜 | Idem ; table `catalogues` en base non exploitée |
| Posts exclusifs | `/dashboard/posts/new` | 🔜 | Idem |
| Help / FAQ / Contact / Refer | `/help`, `/faq`, etc. | 🔜 | Liens dans earning-ways ; pages absentes |

---

## 7. Données & backend (Supabase)

| Fonctionnalité | Statut | Détail |
|----------------|--------|--------|
| Schéma `users` | 🟡 | Table custom + Supabase Auth ; pas de sync automatique visible |
| Schéma `creators` | 🟡 | Lecture OK + création minimale à l'inscription ; édition profil encore absente |
| Schéma `projects` | 🟡 | Lecture seule (`getProjects`) |
| Schéma `events` | 🟡 | Lecture seule (`getEvents`) |
| Schéma `catalogues` | 🟡 | Lecture seule (`getCatalogues`) ; pas de page |
| Schéma `wallet` | 🟡 | Lu côté dashboard ; pas encore alimenté par paiement réel |
| Schéma `wallet_transactions` | 🟡 | Lu côté dashboard ; pas encore écrit par paiement réel |
| Schéma `payment_methods` | 🔜 | En base ; non utilisé |
| Champ `kyc_status` (créateurs) | 🔜 | Colonne en base ; pas de flow KYC |
| Client Supabase browser | `utils/supabase/client.ts` | ✅ | |
| Client Supabase server | `utils/supabase/server.ts` | 🟡 | Présent ; peu utilisé |
| Types générés | `database.types.ts` | ✅ | Alignés sur le schéma |

---

## 8. Paiements

| Fonctionnalité | Statut | Détail |
|----------------|--------|--------|
| Calcul prix (FCFA) | 🟡 | 1 200 FCFA/verre dans `payment-box.tsx` uniquement |
| Intégration Orange Money | 🔜 | Logo marketing seulement |
| Intégration Wave | 🔜 | Logo marketing seulement |
| Intégration MTN / Moov | 🔜 | Logo marketing seulement |
| Intégration Stripe / Visa | 🔜 | Logo marketing seulement |
| Webhook confirmation paiement | 🔜 | Absent |
| Enregistrement transaction | 🔜 | `wallet_transactions` jamais alimentée |
| Mise à jour solde wallet | 🔜 | `wallet` jamais mis à jour |
| Configuration payout créateur | 🔜 | Bannière UI ; pas de page ni API |
| Reçu / email confirmation | 🔜 | Absent |

---

## 9. Infrastructure & qualité

| Fonctionnalité | Statut | Détail |
|----------------|--------|--------|
| Build Next.js 16 | ✅ | App Router, React 19 |
| Lint | ✅ | Script `pnpm lint` |
| Variables env Supabase | 🟡 | Requises ; pas de `.env.example` dans le repo |
| Middleware auth | 🟡 | Garde dashboard dans le layout ; middleware global absent |
| Tests (unit/e2e) | 🔜 | Aucun |
| i18n | 🔜 | `lang="en"` dans layout ; contenu majoritairement FR |
| SEO metadata | 🟡 | Title/description root OK ; pas par page créateur |

---

## Synthèse v1

### Déjà en place (fondations)

- UI marketing complète (landing, navigation, footer)
- Lecture Supabase : créateurs, projets, événements
- Pages listes créateurs / projets / événements
- Auth Supabase complète côté app (signup, login, OAuth Google/Facebook, callback, logout, reset password)
- Vérification disponibilité slug à l'inscription
- Coquille dashboard + sidebar
- Schéma BDD riche (wallet, transactions, catalogues, KYC)

### Bloquants pour une v1 utilisable

| Priorité | Fonctionnalité manquante |
|----------|-------------------------|
| P0 | Paiement réel + persistance `wallet_transactions` |
| P0 | Paiement réel + persistance `wallet_transactions` |
| P0 | Page créateur : bouton payer fonctionnel |
| P1 | Édition/enrichissement profil créateur (bio, couleur, avatar) |
| P1 | Pages `/dashboard/settings` (payout + compte) |
| P1 | Mur de messages supporters persisté |
| P2 | Pages détail projet / événement |
| P2 | KYC créateur |
| P2 | Catalogues / boutique |

### Ratio d'avancement estimé (v1 core)

```
Marketing & découverte     ████████░░  ~80 %
Auth & onboarding          ████████░░  ~80 %
Page créateur (paiement)   ███░░░░░░░  ~30 %
Dashboard créateur         ██████░░░░  ~60 %
Paiements & wallet         ░░░░░░░░░░   ~0 %
```

---

## Fichiers legacy / dette technique

| Fichier | Note |
|---------|------|
| `creators-section-old.tsx` | Ancienne version, non utilisée |
| `creators-section-old2.tsx` | Idem |
| `app/[slug].tsx` | Probablement obsolète (hors route group `(home)`) |
| `components/Header.tsx`, `Footer.tsx` | Anciens composants ; layout utilise `home-navbar` + `footer.tsx` |
| `console.log` dans `queries.ts` | À retirer |

---

*Dernière revue : analyse codebase `pmuv` — mai 2026*
