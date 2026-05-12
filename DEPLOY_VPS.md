# Déploiement sur VPS – Mavericks Agency

## 1. Prérequis sur le VPS

- Node.js 18+ (ou 20 LTS)
- npm ou pnpm
- Nginx (ou Caddy) en reverse proxy avec HTTPS (recommandé)

## 2. Variables d'environnement

Sur le serveur, créez un fichier `.env.local` à la racine du projet :

```bash
NODE_ENV=production
SMTP_HOST=smtp.votre-fournisseur.fr
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=votre-email
SMTP_PASSWORD=votre-mot-de-passe
SMTP_FROM=votre-email
SMTP_TO=email-destinataire-candidatures
```

Ne pas exposer `.env.local` sur Git.

## 3. Build et démarrage

```bash
npm ci
npm run build
npm run start
```

L’app écoute sur le port **3000** par défaut. Pour un autre port : `PORT=4000 npm run start`.

## 4. Garder l’app en marche (systemd)

Fichier `/etc/systemd/system/mavericks-agency.service` :

```ini
[Unit]
Description=Mavericks Agency Next.js
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/chemin/vers/mavericks-agency
Environment=NODE_ENV=production
EnvironmentFile=/chemin/vers/mavericks-agency/.env.local
ExecStart=/usr/bin/npm run start
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Puis :

```bash
sudo systemctl daemon-reload
sudo systemctl enable mavericks-agency
sudo systemctl start mavericks-agency
sudo systemctl status mavericks-agency
```

## 5. Alternative : PM2

```bash
npm install -g pm2
cd /chemin/vers/mavericks-agency
npm run build
pm2 start npm --name "mavericks" -- start
pm2 save
pm2 startup
```

## 6. Nginx (reverse proxy + HTTPS)

Exemple de bloc `server` :

```nginx
server {
    listen 80;
    server_name votredomaine.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name votredomaine.com;

    ssl_certificate /etc/letsencrypt/live/votredomaine.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/votredomaine.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Puis `sudo nginx -t` et `sudo systemctl reload nginx`.

## 7. Déploiement avec le script deploy.sh

1. Éditez `deploy.sh` : `VPS_USER`, `VPS_IP`, `VPS_PATH`, `SERVICE_NAME`.
2. Sur le VPS, le projet doit déjà exister avec une première installation (`git clone` ou copie complète).
3. Le script fait : build local → tar → scp → sur le VPS : extraction, `npm ci --production`, redémarrage du service.

Pour un déploiement “tout sur le serveur”, transférez tout le repo (sans `node_modules` ni `.next`), puis sur le VPS : `npm ci`, `npm run build`, et démarrez avec systemd ou PM2 comme ci‑dessus.

## 8. Sécurité déjà en place

- Headers de sécurité (X-Frame-Options, X-Content-Type-Options, HSTS, etc.)
- Rate limit sur les API POST (10 req/min par IP)
- Validation et échappement des entrées (contact + candidature)
- Pas de `console.log` en production (sauf error/warn)

## 9. Checklist avant mise en ligne

- [ ] `.env.local` configuré sur le VPS (SMTP, etc.)
- [ ] `npm run build` sans erreur
- [ ] HTTPS activé (certificat + Nginx/Caddy)
- [ ] Service systemd ou PM2 configuré et actif
- [ ] Test des formulaires (contact + candidature) en production
