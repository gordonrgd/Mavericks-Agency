# 📋 Versions et Configuration Actuelle

Ce fichier documente les versions installées et les configurations du projet au moment de la sauvegarde.

---

## 🔧 Versions Système

**Node.js** : `v22.21.0`
- Installer depuis : https://nodejs.org/
- Version recommandée : 18.x, 20.x ou 22.x

**npm** : `10.9.4`
- Installé avec Node.js

---

## 📦 Versions du Projet

**Next.js** : `15.2.4`
**React** : `^19`
**TypeScript** : `^5`
**Tailwind CSS** : `^3.4.17`

Toutes les autres dépendances sont définies dans `package.json` avec leurs versions exactes.

---

## 🎨 Polices

**Hellix** : Polices personnalisées
- Format : `.woff2` (optimisé)
- Localisation : `public/fonts/`
- 13 fichiers de polices (Thin à ExtraBold + Italiques)
- Déjà configuré dans `app/layout.tsx` et `tailwind.config.js`

---

## 🗄️ Base de Données

### Supabase (Optionnel)
- **Status** : Optionnel (le projet fonctionne sans)
- **Script SQL** : `scripts/create-applications-table.sql`
- **Configuration** : Variables dans `.env.local`

### Si utilisé :
- Créer un projet sur https://supabase.com
- Exécuter le script SQL fourni
- Configurer les variables d'environnement

---

## 📧 Configuration Email

### Provider actuel : IONOS

```env
SMTP_HOST=smtp.ionos.fr
SMTP_PORT=465
SMTP_SECURE=true
```

### Fichiers API utilisant l'email :
- `/app/api/apply/route.ts` - Candidatures
- `/app/api/contact/route.ts` - Contact
- `/app/api/audit/route.ts` - (Supprimé, redirige vers /apply)

---

## 🌍 Langues Supportées

1. **Français (FR)** - Langue par défaut
2. **Anglais (EN)**
3. **Espagnol (ES)**

Fichier de traduction : `lib/translations.ts`

---

## 🚀 Commandes Principales

```bash
npm run dev      # Développement (port 3000)
npm run build    # Build production
npm run start    # Production
npm run lint     # Vérification ESLint
```

---

## 📁 Structure Importante

```
Mavericks-Agency/
├── .env.local          # ⚠️ À sauvegarder séparément (credentials)
├── .env.example        # Template des variables d'environnement
├── package.json        # Dépendances du projet
├── RESTORATION_GUIDE.md    # Guide de réinstallation
├── CHECKLIST_SAUVEGARDE.md # Checklist avant réinitialisation
├── VERSIONS_ET_CONFIG.md   # Ce fichier
└── ...
```

---

## ⚠️ Fichiers Critiques à Sauvegarder

1. **`.env.local`** : Contient les credentials SMTP
2. **Tout le dossier du projet** : Sauvegarder entièrement
3. **Credential SMTP** : Noter séparément dans un gestionnaire de mots de passe

---

## 🔐 Sécurité

- `.env.local` est dans `.gitignore` (ne sera pas commité)
- Ne JAMAIS partager les credentials
- Utiliser un gestionnaire de mots de passe pour stocker les credentials

---

*Document créé le : $(date)*

