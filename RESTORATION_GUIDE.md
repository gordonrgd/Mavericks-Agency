# 🚀 Guide de Réinstallation - Mavericks Agency

Ce guide vous permet de réinstaller le projet Mavericks Agency sur une machine vierge après réinitialisation de votre Mac.

---

## 📋 Prérequis Système

### Logiciels à installer :

1. **Node.js** (version 18 ou supérieure)
   - Télécharger depuis : https://nodejs.org/
   - Vérifier l'installation : `node --version`
   - Vérifier npm : `npm --version`

2. **Git** (si pas déjà installé)
   - Vérifier : `git --version`
   - Installer via Xcode Command Line Tools si nécessaire : `xcode-select --install`

3. **VS Code ou votre éditeur préféré**
   - VS Code : https://code.visualstudio.com/

---

## 📦 Installation du Projet

### Étape 1 : Cloner ou copier le projet

**Option A : Si vous avez le projet sur Git**
```bash
git clone [URL_DU_REPOSITORY]
cd Mavericks-Agency
```

**Option B : Si vous avez copié le dossier directement**
```bash
cd /chemin/vers/Mavericks-Agency
```

### Étape 2 : Installer les dépendances

```bash
npm install
```

**Note** : Si `npm install` échoue, essayez :
```bash
rm -rf node_modules package-lock.json
npm install
```

### Étape 3 : Configuration des variables d'environnement

1. **Créer le fichier `.env.local`** :
```bash
cp .env.example .env.local
```

2. **Éditer `.env.local`** et remplir avec vos valeurs :
```env
# SMTP Email (REQUIS - pour les formulaires)
SMTP_HOST=smtp.ionos.fr
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=votre_email@mavericks-agency.com
SMTP_PASSWORD=votre_mot_de_passe
SMTP_FROM=votre_email@mavericks-agency.com
SMTP_TO=votre_email@mavericks-agency.com

# Supabase (OPTIONNEL - seulement si vous utilisez Supabase)
# NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon
```

**⚠️ IMPORTANT** : 
- Le fichier `.env.local` contient des informations sensibles
- Ne JAMAIS le committer sur Git
- Il est déjà dans `.gitignore`

### Étape 4 : Vérifier que tout fonctionne

```bash
# Démarrer le serveur de développement
npm run dev
```

Le site devrait être accessible sur : `http://localhost:3000`

---

## 🗄️ Base de Données (Supabase) - OPTIONNEL

### Si vous utilisez Supabase :

1. **Créer un projet Supabase** (si nouveau) :
   - Aller sur : https://supabase.com
   - Créer un nouveau projet
   - Noter l'URL et la clé anonyme

2. **Configurer les variables d'environnement** :
   - Ajouter dans `.env.local` :
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon
   ```

3. **Créer les tables** :
   - Aller dans SQL Editor sur Supabase
   - Exécuter le script : `scripts/create-applications-table.sql`

### Si vous N'UTILISEZ PAS Supabase :

- Le projet fonctionne sans Supabase
- Les formulaires envoient uniquement des emails
- Aucune configuration nécessaire

---

## 🧪 Tests et Vérifications

### Vérifier que le build fonctionne :
```bash
npm run build
```

### Vérifier les erreurs de lint :
```bash
npm run lint
```

### Tester les formulaires :
1. Aller sur `/apply` - Formulaire de candidature
2. Aller sur `/contact` - Formulaire de contact
3. Vérifier que les emails sont bien envoyés

---

## 📁 Structure du Projet

```
Mavericks-Agency/
├── app/                    # Pages Next.js
│   ├── api/               # Routes API (email, formulaires)
│   ├── apply/             # Formulaire de candidature
│   ├── services/          # Page Services
│   └── ...
├── components/            # Composants React
├── contexts/             # Contextes (langue)
├── lib/                  # Utilitaires
│   ├── translations.ts   # Traductions FR/EN/ES
│   └── supabase.ts       # Client Supabase (optionnel)
├── public/               # Assets statiques
│   ├── fonts/           # Polices Hellix
│   └── images/          # Images du site
├── scripts/             # Scripts SQL
└── .env.local          # Variables d'environnement (À CRÉER)
```

---

## 🔧 Configuration Email (SMTP)

### Valeurs actuellement utilisées :
- **Host** : `smtp.ionos.fr`
- **Port** : `465`
- **Secure** : `true` (SSL/TLS)

### Si vous changez de provider SMTP :

**Gmail** :
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=votre_email@gmail.com
SMTP_PASSWORD=votre_mot_de_passe_app
```

**SendGrid** :
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=votre_api_key_sendgrid
```

---

## 🎨 Polices Hellix

Les polices Hellix sont déjà incluses dans `public/fonts/`.
- Format : `.woff2` (optimisé)
- Support : Tous les poids (Thin à ExtraBold) + Italiques
- Configuration : Déjà configuré dans `app/layout.tsx` et `tailwind.config.js`

---

## 🌍 Traductions

Le site supporte 3 langues :
- **Français** (FR) - Par défaut
- **Anglais** (EN)
- **Espagnol** (ES)

Les traductions sont dans : `lib/translations.ts`

---

## 🚀 Commandes Utiles

```bash
# Développement
npm run dev          # Démarrer le serveur de dev (http://localhost:3000)

# Production
npm run build        # Build pour production
npm run start        # Démarrer le serveur de production

# Maintenance
npm run lint         # Vérifier le code
npm install          # Mettre à jour les dépendances
```

---

## ⚠️ Problèmes Courants

### Erreur "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erreur de build TypeScript
```bash
# Vérifier que TypeScript est installé
npm install --save-dev typescript@latest
```

### Les emails ne partent pas
- Vérifier que `.env.local` est bien créé
- Vérifier les credentials SMTP
- Vérifier que le port est correct (465 ou 587)
- Vérifier les logs dans la console serveur

### Erreur "Cannot find module"
```bash
npm install --legacy-peer-deps
```

---

## 📝 Checklist de Vérification

Avant de considérer que tout est opérationnel, vérifiez :

- [ ] Node.js installé (`node --version`)
- [ ] Dépendances installées (`npm install` sans erreur)
- [ ] Fichier `.env.local` créé et configuré
- [ ] Serveur de dev démarre (`npm run dev`)
- [ ] Site accessible sur `http://localhost:3000`
- [ ] Build fonctionne (`npm run build`)
- [ ] Formulaires envoient des emails (tester `/apply` et `/contact`)
- [ ] Polices Hellix s'affichent correctement
- [ ] Traductions fonctionnent (changer de langue)

---

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifier les logs dans la console
2. Vérifier que tous les fichiers sont présents
3. Vérifier les variables d'environnement
4. Consulter la documentation Next.js : https://nextjs.org/docs

---

## 🔐 Sécurité

**IMPORTANT** :
- Ne JAMAIS committer `.env.local` sur Git
- Ne JAMAIS partager vos credentials SMTP
- Le fichier `.gitignore` protège déjà les fichiers sensibles

---

## 📦 Fichiers à Sauvegarder

Assurez-vous d'avoir sauvegardé :
- ✅ Tout le dossier du projet
- ✅ Le fichier `.env.local` (gardez-le séparément, ne le committez pas)
- ✅ Les credentials SMTP (notez-les ailleurs)
- ✅ Les credentials Supabase si utilisés

---

*Guide créé le : $(date)*
*Version du projet : 0.1.0*

