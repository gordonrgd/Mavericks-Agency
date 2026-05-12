# Déploiement sur VPS

Guide minimal pour mettre le site en ligne sur un VPS (build local ou sur le serveur).

## 1. Prérequis sur le VPS

- Node.js 18+ (recommandé 20 LTS)
- npm ou pnpm

## 2. Variables d'environnement

Sur le serveur, créez un fichier `.env.local` à la racine du projet (ou exportez les variables) :

```bash
NODE_ENV=production
SMTP_HOST=smtp.votre-fournisseur.fr
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=votre-email@domaine.com
SMTP_PASSWORD=votre_mot_de_passe
SMTP_FROM=votre-email@domaine.com
SMTP_TO=email-qui-recoit@domaine.com
```

Ne commitez jamais `.env.local`.

## 3. Build et démarrage

**Option A – Build sur le VPS**

```bash
git clone <votre-repo> mavericks-agency
cd mavericks-agency
npm install
cp .env.example .env.local
# Éditer .env.local avec vos valeurs
npm run build
npm run start
```

**Option B – Build en local, déployer le build**

Sur votre machine :

```bash
npm install
npm run build
# Transférer le dossier (voir deploy.sh) : .next, public, package.json, package-lock.json
```

Sur le VPS :

```bash
cd mavericks-agency
npm ci --omit=dev
npm run start
```

L’app écoute sur le port **3000** par défaut.

## 4. Garder l’app lancée (PM2)

```bash
npm install -g pm2
cd mavericks-agency
pm2 start npm --name "mavericks" -- start
pm2 save
pm2 startup
```

## 5. Nginx en reverse proxy (recommandé)

Exemple de bloc `server` pour Nginx :

```nginx
server {
    listen 80;
    server_name votredomaine.com;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Puis HTTPS avec Certbot : `sudo certbot --nginx -d votredomaine.com`

## 6. Sécurité déjà en place

- Headers de sécurité (X-Frame-Options, X-Content-Type-Options, etc.)
- Rate limit sur les API (10 requêtes POST /api par IP et par minute)
- Validation et échappement des données dans les routes `/api/apply` et `/api/contact`

## 7. Script deploy.sh

Le script `deploy.sh` à la racine peut être adapté : remplacer `VPS_USER`, `VPS_IP`, `VPS_PATH` et `SERVICE_NAME` par vos valeurs, puis exécuter `./deploy.sh` après un build local.
