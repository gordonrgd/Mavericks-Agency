# ✅ Checklist de Sauvegarde - Mavericks Agency

Avant de réinitialiser votre Mac, vérifiez que vous avez sauvegardé tous ces éléments :

---

## 📁 Fichiers du Projet

- [ ] **Dossier complet du projet** : `/Users/gordon/Documents/Projets/MA_last/Mavericks-Agency`
  - Copier vers un disque externe ou cloud (Dropbox, iCloud, Google Drive)

- [ ] **Fichier `.env.local`** (si existant)
  - ⚠️ **CRITIQUE** : Contient vos credentials SMTP
  - Sauvegarder séparément dans un endroit sécurisé
  - Ne pas committer sur Git

---

## 🔐 Credentials et Configuration

### Email SMTP (Nodemailer)
- [ ] **SMTP_HOST** : `smtp.ionos.fr`
- [ ] **SMTP_PORT** : `465`
- [ ] **SMTP_USER** : Notez votre email
- [ ] **SMTP_PASSWORD** : Notez votre mot de passe
- [ ] **SMTP_FROM** : Notez l'email d'expédition
- [ ] **SMTP_TO** : Notez l'email de réception

### Supabase (si utilisé)
- [ ] **NEXT_PUBLIC_SUPABASE_URL** : Notez l'URL du projet
- [ ] **NEXT_PUBLIC_SUPABASE_ANON_KEY** : Notez la clé anonyme
- [ ] **Credentials admin** (si nécessaire)

---

## 🗄️ Base de Données

- [ ] **Exporter les données Supabase** (si vous avez des données) :
  - Aller sur Supabase Dashboard
  - Tables → Exporter en CSV ou SQL
  - Sauvegarder les exports

- [ ] **Scripts SQL** :
  - `scripts/create-applications-table.sql` (déjà dans le projet)

---

## 📦 Dépendances et Versions

- [ ] **Node.js** : Version installée
  - Vérifier : `node --version`
  - Noter la version (recommandé : 18.x ou 20.x)

- [ ] **npm** : Version installée
  - Vérifier : `npm --version`

- [ ] **package.json** : Déjà dans le projet (contient toutes les dépendances)

---

## 🎨 Assets et Ressources

- [ ] **Polices Hellix** : `public/fonts/` (déjà dans le projet)
- [ ] **Images** : `public/images/` (déjà dans le projet)
- [ ] **Logo** : `public/images/logo/` (déjà dans le projet)

---

## 🔄 Git (si vous utilisez Git)

- [ ] **Repository Git** :
  - Pousser toutes les modifications : `git push`
  - Vérifier que tout est bien sauvegardé sur le remote

- [ ] **Branches** :
  - Noter les branches importantes
  - Merger dans main/master si nécessaire

---

## 📋 Documentation

- [ ] **Guide de réinstallation** : `RESTORATION_GUIDE.md` (créé)
- [ ] **Variables d'environnement** : `.env.example` (créé)
- [ ] **README.md** : Déjà dans le projet

---

## ✅ Avant de Réinitialiser

1. [ ] Tester que le build fonctionne : `npm run build`
2. [ ] Tester que le serveur démarre : `npm run dev`
3. [ ] Vérifier que les formulaires fonctionnent
4. [ ] Sauvegarder `.env.local` séparément
5. [ ] Copier le dossier complet vers un emplacement externe
6. [ ] Noter tous les credentials dans un gestionnaire de mots de passe

---

## 📍 Après Réinstallation

Suivre le guide : **`RESTORATION_GUIDE.md`**

---

*Checklist créée le : $(date)*

