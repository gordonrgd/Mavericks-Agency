# Mavericks Agency

Site web professionnel pour Mavericks Agency, une agence de marketing d'influence spécialisée dans la gestion de créateurs OnlyFans.

## 🚀 Technologies

- **Framework**: Next.js 15.2.4 avec App Router
- **Langage**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email**: Nodemailer

## 📁 Structure du projet

```
Mavericks-Agency/
├── app/                    # Pages Next.js (App Router)
│   ├── about/             # Page À propos
│   ├── api/               # API Routes
│   ├── apply/             # Formulaire de candidature
│   ├── contact/           # Page Contact
│   ├── services/          # Page Services
│   └── work/              # Page Portfolio
├── components/            # Composants réutilisables
│   ├── ui/               # Composants Shadcn/UI
│   └── ...               # Composants personnalisés
├── contexts/             # Contextes React
├── lib/                  # Utilitaires et configurations
├── public/               # Assets statiques
└── styles/               # Styles globaux
```

## 🌍 Fonctionnalités

### Multilingue
- Support de 3 langues : Français, Anglais, Espagnol
- Détection automatique de la langue du navigateur
- Persistance des préférences utilisateur

### Pages principales
- **Accueil** : Présentation de l'agence avec projets sélectionnés
- **Services** : Détail des services proposés
- **Portfolio** : Galerie des projets réalisés
- **À propos** : Histoire et valeurs de l'agence
- **Contact** : Formulaire de contact
- **Candidature** : Formulaire multi-étapes sophistiqué

### Formulaire de candidature
- 7 étapes avec validation progressive
- Barre de progression animée
- Validation en temps réel
- Design responsive optimisé
- Soumission via API avec envoi d'email

## 🛠️ Installation

### Installation Rapide

```bash
# Installer les dépendances
npm install

# Créer le fichier .env.local
cp .env.example .env.local
# Puis éditer .env.local avec vos credentials

# Démarrer le serveur de développement
npm run dev
```

### Installation Complète

Consultez le guide complet : **[RESTORATION_GUIDE.md](./RESTORATION_GUIDE.md)**

## 📝 Scripts disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run start    # Serveur de production
npm run lint     # Vérification ESLint
```

## 🔧 Configuration

### Variables d'environnement

1. Copier le template :
```bash
cp .env.example .env.local
```

2. Éditer `.env.local` avec vos credentials (voir `.env.example` pour les détails)

**⚠️ IMPORTANT** : Le fichier `.env.local` contient des informations sensibles et ne doit JAMAIS être commité sur Git.

Les candidatures et messages sont envoyés par email (SMTP). Aucune base de données requise.

### 📚 Documentation Complète

- **Guide de réinstallation** : [RESTORATION_GUIDE.md](./RESTORATION_GUIDE.md)
- **Checklist de sauvegarde** : [CHECKLIST_SAUVEGARDE.md](./CHECKLIST_SAUVEGARDE.md)
- **Versions et config** : [VERSIONS_ET_CONFIG.md](./VERSIONS_ET_CONFIG.md)

## 🎨 Design

- **Style** : Interface épurée et moderne
- **Couleurs** : Palette cohérente avec variables CSS
- **Typographie** : Inter (Google Fonts)
- **Responsive** : Mobile-first approach
- **Animations** : Transitions fluides avec Framer Motion

## 📱 Responsive Design

- **Mobile** : < 768px
- **Tablet** : 768px - 1024px
- **Desktop** : > 1024px

## 🚀 Déploiement

Le projet est configuré pour être déployé sur Vercel :

```bash
# Build de production
npm run build

# Déploiement
vercel --prod
```

## 📋 TODO

- [ ] Ajouter des tests unitaires
- [ ] Optimiser les images
- [ ] Ajouter un système de cache
- [ ] Implémenter Google Analytics
- [ ] Ajouter un sitemap
- [ ] Optimiser le SEO

## 📄 Licence

MIT License - Voir le fichier LICENSE pour plus de détails.

## 👥 Équipe

- **Mavericks Agency** - Développement et design

---

*Dernière mise à jour : $(date)*
