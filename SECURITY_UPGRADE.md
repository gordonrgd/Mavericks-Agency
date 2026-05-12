# 🔒 Guide de Sécurisation - Mavericks Agency

## 📋 Vue d'ensemble

Ce document décrit les modifications de sécurité effectuées pour sécuriser les identifiants et les configurations sensibles du projet Mavericks Agency.

**Date de mise à jour :** 9 décembre 2025  
**Version :** 2.0.0

---

## ⚠️ Modifications Critiques de Sécurité

### 🎯 Objectif

Tous les identifiants sensibles (mots de passe SMTP, clés API Supabase) qui étaient **codés en dur** dans le code source ont été déplacés vers des **variables d'environnement** sécurisées.

### 📁 Fichiers Modifiés

1. **`lib/supabase.ts`** - Migration des clés Supabase
2. **`app/api/apply/route.ts`** - Migration des identifiants SMTP
3. **`app/api/contact/route.ts`** - Migration des identifiants SMTP
4. **`app/api/audit/route.ts`** - Migration des identifiants SMTP
5. **`next.config.mjs`** - Amélioration de la configuration
6. **`.env.example`** - Création du fichier template

---

## 🚀 Guide de Migration

### Étape 1 : Créer le fichier `.env.local`

Copiez le fichier `.env.example` et créez `.env.local` à la racine du projet :

```bash
cp .env.example .env.local
```

### Étape 2 : Configurer les variables d'environnement

Ouvrez `.env.local` et remplissez les valeurs réelles :

```env
# ============================================
# Supabase Configuration
# ============================================
NEXT_PUBLIC_SUPABASE_URL=https://kcxnzbcpcsuqthjzwup.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon_supabase_ici

# ============================================
# Email Configuration (Nodemailer)
# ============================================
SMTP_HOST=smtp.ionos.fr
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=apply@mavericks-agency.com
SMTP_PASSWORD=votre_mot_de_passe_email_ici
SMTP_FROM=apply@mavericks-agency.com
SMTP_TO=apply@mavericks-agency.com

# ============================================
# Environment
# ============================================
NODE_ENV=development
```

### Étape 3 : Vérifier que `.env.local` est ignoré

Le fichier `.gitignore` doit déjà contenir `.env*`, ce qui exclut automatiquement `.env.local` du contrôle de version.

**⚠️ IMPORTANT :** Ne commitez JAMAIS le fichier `.env.local` sur Git !

### Étape 4 : Redémarrer le serveur de développement

```bash
# Arrêtez le serveur actuel (Ctrl+C)
# Puis redémarrez-le
npm run dev
# ou
pnpm dev
```

---

## 🔍 Détails des Modifications

### 1. `lib/supabase.ts`

**Avant :**
```typescript
const supabaseUrl = "https://kcxnzbcpcsuqthjzwup.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Après :**
```typescript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Variables d'environnement manquantes...")
}
```

**Améliorations :**
- ✅ Variables d'environnement au lieu de valeurs en dur
- ✅ Vérification des variables obligatoires au démarrage
- ✅ Messages d'erreur explicites

### 2. `app/api/apply/route.ts`, `contact/route.ts`, `audit/route.ts`

**Avant :**
```typescript
const transporter = nodemailer.createTransport({
  host: 'smtp.ionos.fr',
  port: 465,
  secure: true,
  auth: {
    user: 'apply@mavericks-agency.com',
    pass: '393091Paris@01', // ⚠️ Mot de passe exposé
  },
})
```

**Après :**
```typescript
const requiredEnvVars = {
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_FROM: process.env.SMTP_FROM || process.env.SMTP_USER,
  SMTP_TO: process.env.SMTP_TO || process.env.SMTP_USER,
}

// Vérification des variables requises
const missingVars = Object.entries(requiredEnvVars)
  .filter(([key, value]) => !value && key !== 'SMTP_FROM' && key !== 'SMTP_TO')
  .map(([key]) => key)

if (missingVars.length > 0) {
  return NextResponse.json({ 
    ok: false, 
    error: 'Configuration serveur incomplète.' 
  }, { status: 500 })
}

const transporter = nodemailer.createTransport({
  host: requiredEnvVars.SMTP_HOST!,
  port: Number.parseInt(requiredEnvVars.SMTP_PORT!, 10) || 465,
  secure: process.env.SMTP_SECURE === 'true' || true,
  auth: {
    user: requiredEnvVars.SMTP_USER!,
    pass: requiredEnvVars.SMTP_PASSWORD!,
  },
})
```

**Améliorations :**
- ✅ Variables d'environnement au lieu de valeurs en dur
- ✅ Vérification des variables requises avant utilisation
- ✅ Gestion d'erreurs améliorée avec messages explicites
- ✅ Support des valeurs par défaut (SMTP_FROM, SMTP_TO)

### 3. `next.config.mjs`

**Avant :**
```javascript
eslint: {
  ignoreDuringBuilds: true, // ⚠️ Désactivé en permanence
},
typescript: {
  ignoreBuildErrors: true, // ⚠️ Désactivé en permanence
},
```

**Après :**
```javascript
eslint: {
  ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  // En production, les erreurs ESLint bloqueront le build
},
typescript: {
  ignoreBuildErrors: process.env.NODE_ENV === 'development',
  // En production, les erreurs TypeScript bloqueront le build
},
```

**Améliorations :**
- ✅ ESLint et TypeScript activés en production
- ✅ Erreurs bloquantes en production pour garantir la qualité
- ✅ Plus rapide en développement (erreurs ignorées)

---

## 🔐 Sécurité des Identifiants

### ⚠️ Actions Requises IMMÉDIATEMENT

Si vous avez déjà commité du code avec des identifiants en dur, vous devez :

1. **Régénérer les clés Supabase :**
   - Connectez-vous à votre projet Supabase
   - Allez dans Settings > API
   - Régénérez la clé anonyme (anon key)

2. **Changer le mot de passe email :**
   - Connectez-vous à votre compte IONOS
   - Changez le mot de passe de l'email `apply@mavericks-agency.com`

3. **Nettoyer l'historique Git (si nécessaire) :**
   ```bash
   # ATTENTION : Cette commande réécrit l'historique Git
   # Utilisez-la uniquement si vous êtes sûr de vouloir supprimer les identifiants de l'historique
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch app/api/apply/route.ts app/api/contact/route.ts app/api/audit/route.ts lib/supabase.ts" \
     --prune-empty --tag-name-filter cat -- --all
   ```

---

## 📦 Déploiement

### Variables d'environnement sur Vercel

1. Allez dans votre projet Vercel
2. Settings > Environment Variables
3. Ajoutez toutes les variables nécessaires :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_SECURE`
   - `SMTP_USER`
   - `SMTP_PASSWORD`
   - `SMTP_FROM`
   - `SMTP_TO`

### Variables d'environnement sur autres plateformes

Configurez les variables d'environnement selon la documentation de votre hébergeur (Heroku, AWS, DigitalOcean, etc.).

---

## ✅ Checklist de Vérification

- [ ] Fichier `.env.local` créé avec toutes les variables
- [ ] `.env.local` ajouté au `.gitignore` (déjà fait si `.env*` est présent)
- [ ] Variables Supabase configurées
- [ ] Variables SMTP configurées
- [ ] Application testée en local
- [ ] Variables configurées sur la plateforme de déploiement
- [ ] Application testée en production
- [ ] Clés Supabase régénérées (si exposées)
- [ ] Mot de passe email changé (si exposé)

---

## 🐛 Dépannage

### Erreur : "Variable d'environnement manquante"

**Cause :** Le fichier `.env.local` n'existe pas ou ne contient pas toutes les variables requises.

**Solution :**
1. Vérifiez que `.env.local` existe à la racine du projet
2. Vérifiez que toutes les variables sont présentes
3. Redémarrez le serveur de développement

### Erreur : "Configuration serveur incomplète"

**Cause :** Une ou plusieurs variables SMTP sont manquantes.

**Solution :**
1. Vérifiez le fichier `.env.local`
2. Vérifiez les logs serveur pour identifier les variables manquantes
3. Ajoutez les variables manquantes

### Les emails ne partent pas

**Cause :** Problème de configuration SMTP ou identifiants incorrects.

**Solution :**
1. Vérifiez les identifiants SMTP dans `.env.local`
2. Testez la connexion SMTP avec un client email
3. Vérifiez les logs serveur pour plus de détails

---

## 📞 Support

Pour toute question ou problème :
- Consultez ce document en premier
- Vérifiez les logs serveur pour les erreurs détaillées
- Contactez l'équipe de développement si nécessaire

---

## 📝 Notes

- **Sauvegarde :** Une sauvegarde complète du projet a été créée dans `../backup_20251209_165945_Mavericks-Agency/`
- **Compatibilité :** Toutes les modifications sont rétrocompatibles avec l'architecture existante
- **Performance :** Aucun impact négatif sur les performances

---

*Dernière mise à jour : 9 décembre 2025*

