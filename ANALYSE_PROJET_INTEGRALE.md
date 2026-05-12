# Analyse intégrale du projet Mavericks Agency

**Date d'analyse :** 30 janvier 2025  
**Projet :** Site vitrine + formulaire de candidature pour une agence de marketing d'influence (créateurs OnlyFans).

---

## 1. Vue d'ensemble

| Élément | Détail |
|--------|--------|
| **Nom** | Mavericks Agency |
| **Type** | Site web professionnel (vitrine + formulaire multi-étapes) |
| **Framework** | Next.js 15.2.4 (App Router) |
| **Langage** | TypeScript |
| **UI** | Tailwind CSS + Shadcn/UI (Radix) + Framer Motion |
| **Backend** | API Routes Next.js, Nodemailer (email), Supabase optionnel |

---

## 2. Architecture technique

### 2.1 Stack

- **Frontend :** React 19, Next.js 15, Tailwind, Framer Motion, Lucide React
- **Formulaires :** React Hook Form, Zod, @hookform/resolvers
- **Composants UI :** Radix UI (accordion, dialog, select, etc.), class-variance-authority, tailwind-merge, clsx
- **Données :** Supabase (optionnel) pour stocker les candidatures ; API Routes pour email
- **Email :** Nodemailer (SMTP) pour notifications candidature et contact
- **Typographie :** Police locale Hellix (woff2, plusieurs graisses)

### 2.2 Structure des dossiers

```
Mavericks-Agency/
├── app/                    # App Router Next.js
│   ├── layout.tsx          # Layout racine (Header, Footer, LanguageProvider)
│   ├── page.tsx            # Accueil
│   ├── about/              # À propos
│   ├── apply/              # Formulaire de candidature (multi-étapes)
│   ├── application-received/  # Page de confirmation après candidature
│   ├── contact/            # Contact
│   ├── faq/                # FAQ
│   ├── legal/              # Mentions légales
│   ├── privacy/            # Confidentialité
│   ├── resources/          # Ressources
│   ├── services/           # Services
│   ├── work/               # Portfolio (liste + détail [id])
│   ├── api/
│   │   ├── apply/route.ts  # POST → envoi email candidature
│   │   └── contact/route.ts # POST → envoi email contact
│   ├── globals.css
│   └── ...
├── components/             # Composants réutilisables
│   ├── header.tsx, footer.tsx
│   ├── animated-section.tsx, animated-button.tsx
│   ├── language-switcher.tsx
│   ├── progress-stepper.tsx, form-navigation.tsx
│   ├── income-calculator.tsx
│   ├── page-header.tsx, breadcrumb.tsx
│   └── ui/                 # Shadcn (boutons, cartes, formulaires, etc.)
├── contexts/
│   └── language-context.tsx # i18n FR/EN/ES + détection navigateur
├── lib/
│   ├── supabase.ts         # Client Supabase + submitApplication (optionnel)
│   ├── translations.ts     # Clés i18n (fr, en, es)
│   ├── utils.ts            # cn(), getProjects(), getHomepageProjects()
│   ├── image-paths.ts      # Chemins d’images centralisés
│   └── image-utils.ts
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── public/
│   ├── fonts/              # Hellix (woff2)
│   └── images/work/        # Visuels portfolio
├── scripts/
│   ├── create-applications-table.sql
│   └── create-applications-table-v2.sql
└── styles/globals.css
```

---

## 3. Fonctionnalités principales

### 3.1 Multilingue (i18n)

- **Langues :** Français, Anglais, Espagnol
- **Détection :** Préférence navigateur au premier chargement
- **Persistance :** `localStorage` (clé `language`)
- **Implémentation :** `LanguageProvider` + `useLanguage()` + `t("key")` ; clés dans `lib/translations.ts` (structure imbriquée)

### 3.2 Pages

| Route | Rôle |
|-------|------|
| `/` | Accueil : hero, preuve sociale, “We care”, services, timeline 3 semaines, témoignage, calculateur de revenus |
| `/services` | Présentation des services |
| `/about` | À propos / valeurs |
| `/work` | Liste des projets (images + liens vers `/work/[id]`) |
| `/work/[id]` | Détail d’un projet |
| `/contact` | Formulaire de contact |
| `/apply` | Formulaire de candidature multi-étapes (voir ci‑dessous) |
| `/application-received` | Confirmation après envoi candidature |
| `/faq`, `/resources`, `/privacy`, `/legal` | Pages informatives |

### 3.3 Formulaire de candidature (`/apply`)

- **Étapes :** 7 (infos personnelles, OnlyFans, contenu/niche, réseaux/marketing, objectifs, défis/soutien, récap + CGU)
- **État :** Un seul `formData` + `currentStep` ; pas de librairie de wizard dédiée
- **Composants :** `ProgressStepper`, `FormNavigation`, champs Shadcn (Input, Select, Textarea, Checkbox)
- **Soumission :** `fetch('/api/apply', { method: 'POST', body: JSON.stringify(formData) })`
- **Backend :** `app/api/apply/route.ts` → Nodemailer : email HTML avec toutes les clés/valeurs du formulaire vers `SMTP_TO`
- **Base de données :** Supabase n’est **pas** utilisé par ce flux actuel. Le fichier `lib/supabase.ts` expose `submitApplication()` (insertion en table `applications`) mais la page apply utilise uniquement l’API Next.js. Supabase reste optionnel pour un double enregistrement ou un usage futur.

### 3.4 Contact

- Formulaire simple (nom, email, message) → `POST /api/contact` → Nodemailer vers `SMTP_TO`.

### 3.5 Design et UX

- **Police :** Hellix (locale, plusieurs graisses) via `next/font/local` et `globals.css`
- **Thème :** Gris (palette `grey` 0–90), variables Shadcn (border, primary, muted, etc.), `darkMode: ["class"]` (peu utilisé dans les pages vues)
- **Animations :** Framer Motion dans `AnimatedSection` ; scroll-snap sur l’accueil
- **Responsive :** Menu burger en mobile, grilles Tailwind (md/lg)

---

## 4. Données et backend

### 4.1 Variables d’environnement (`.env.example`)

- **Supabase (optionnel) :** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **SMTP (requis pour apply/contact) :** `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM`, `SMTP_TO`, optionnellement `SMTP_SECURE`
- **Divers :** `NODE_ENV`, `IMAGE_UNOPTIMIZED` (voir `next.config.mjs`)

### 4.2 Base de données (Supabase)

- Scripts : `scripts/create-applications-table.sql` et `create-applications-table-v2.sql`
- Table : `applications` (colonnes alignées avec `ApplicationData` dans `lib/supabase.ts`), RLS activé, politique INSERT pour `anon`, SELECT pour `authenticated`.

### 4.3 Flux de soumission candidature (actuel)

1. L’utilisateur remplit le formulaire et soumet.
2. Le front envoie `POST /api/apply` avec le JSON du formulaire.
3. L’API vérifie les variables SMTP, construit un HTML avec les champs, envoie l’email via Nodemailer.
4. Redirection vers `/application-received` en cas de succès.

Aucune écriture Supabase n’est faite dans ce flux.

---

## 5. Points d’attention et incohérences

### 5.1 Texte et langue

- **Accueil :** La section “Our Services” (titres/cartes) est en dur en anglais alors que le reste utilise `t()`. Idéalement tout passer par `translations`.
- **Footer :** “Confidentiality” et “Legal Notice” en dur ; à remplacer par des clés i18n.

### 5.2 Images

- **Logo :** `imagePaths.logo.main` pointe vers `/images/logo/mavericks-logo.png` alors que `public/` contient `placeholder-logo.png` / `placeholder-logo.svg`. Vérifier présence du fichier ou adapter le chemin.
- **Témoignage accueil :** `src="/images/testimonials/samantra-profile.webp"` ; le fichier est référencé dans `imagePaths.testimonials.sarah`. Vérifier que le fichier existe sous `public/images/testimonials/`.
- **Work :** Les chemins dans `lib/utils.ts` et `lib/image-paths.ts` pointent vers des fichiers dans `public/images/work/` qui existent (analyse_personnalisee, performance_24h, etc.).

### 5.3 Formulaire apply

- Fichier très long (~1000+ lignes) ; envisager de découper par étape (composants par step) ou sous-pages pour la maintenabilité.
- Pas de rate limiting ni CAPTCHA côté API ; à prévoir pour limiter les abus.

### 5.4 Sécurité et config

- **next.config.mjs :** `ignoreDuringBuilds` (ESLint) et `ignoreBuildErrors` (TypeScript) en dev uniquement ; en prod les erreurs bloquent le build (souhaitable).
- **API :** Pas de validation Zod côté serveur sur `/api/apply` ; les champs sont envoyés tels quels à l’email. Ajouter une validation (et éventuellement un schéma partagé avec le front) renforcerait la cohérence et la sécurité.

### 5.5 Doublons / chemins

- **Chemins d’images :** Certains chemins sont en dur dans les pages (ex. témoignage), d’autres passent par `imagePaths`. Uniformiser (tout passer par `imagePaths` ou par des constantes) simplifierait les changements futurs.

---

## 6. Bonnes pratiques déjà en place

- App Router et composants serveur/client bien séparés (`"use client"` où nécessaire).
- Typographie locale (Hellix) pour de bonnes perfs et un rendu cohérent.
- Images Next.js avec `remotePatterns` Supabase si besoin.
- Optimisation des imports (lucide-react, radix) dans `next.config.mjs`.
- Suppression des `console.log` en production (compiler options).
- Documentation (README, RESTORATION_GUIDE, CHECKLIST_SAUVEGARDE, etc.).
- RLS et politiques Supabase pensées pour un usage anonyme (insert) et authentifié (read).

---

## 7. Recommandations synthétiques

1. **i18n :** Traduire “Our Services”, “Confidentiality”, “Legal Notice” et toute autre chaîne en dur via `translations`.
2. **Images :** Vérifier/créer `public/images/logo/mavericks-logo.png` (ou mettre à jour `imagePaths`) et confirmer la présence de `samantra-profile.webp` sous `public/images/testimonials/`.
3. **Formulaire apply :** Découper en composants par étape ; ajouter validation (Zod) et éventuellement rate limit + CAPTCHA sur `/api/apply`.
4. **Supabase :** Si vous souhaitez persister les candidatures en base, appeler `submitApplication()` en plus de (ou à la place de) l’envoi email, depuis le client ou depuis l’API route.
5. **SEO / perf :** Compléter le TODO du README (sitemap, métas par page, analytics) et revoir les métadonnées par route si besoin.

---

## 8. Résumé exécutif

Le projet **Mavericks Agency** est un site Next.js 15 bien structuré : vitrine multilingue (FR/EN/ES), formulaire de candidature multi-étapes envoyé par email via une API Next.js + Nodemailer, et option Supabase pour la base de données. La stack (React 19, Tailwind, Shadcn, Framer Motion) est cohérente et moderne. Les principaux axes d’amélioration concernent l’uniformisation de l’i18n, la vérification des assets (logo, témoignage), la refactorisation du formulaire apply et le renforcement de la validation et de la sécurité côté API.
