#!/bin/bash

# Configuration
VPS_USER="votre-username"
VPS_IP="votre-vps-ip"
VPS_PATH="/chemin/vers/votre/site"
SERVICE_NAME="votre-app-service"

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Début du déploiement...${NC}"

# Étape 1: Build local
echo -e "${YELLOW}📦 Construction de l'application...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erreur lors du build. Arrêt du déploiement.${NC}"
    exit 1
fi

# Étape 2: Création du package
echo -e "${YELLOW}📋 Création du package de déploiement...${NC}"
tar -czf deployment-package.tar.gz \
  .next/ \
  public/ \
  package.json \
  package-lock.json \
  next.config.mjs \
  tailwind.config.js \
  tsconfig.json \
  postcss.config.mjs \
  components.json

# Étape 3: Transfert vers le VPS
echo -e "${YELLOW}📤 Transfert vers le VPS...${NC}"
scp deployment-package.tar.gz $VPS_USER@$VPS_IP:/tmp/
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erreur lors du transfert. Arrêt du déploiement.${NC}"
    exit 1
fi

# Étape 4: Déploiement sur le VPS
echo -e "${YELLOW}🔧 Déploiement sur le VPS...${NC}"
ssh $VPS_USER@$VPS_IP << 'EOF'
    # Sauvegarde
    cd /chemin/vers/votre/site
    cp -r . ../backup-$(date +%Y%m%d-%H%M%S)
    
    # Arrêt du service
    sudo systemctl stop votre-app-service
    
    # Extraction de la nouvelle version
    tar -xzf /tmp/deployment-package.tar.gz
    
    # Installation des dépendances
    npm ci --only=production
    
    # Redémarrage du service
    sudo systemctl start votre-app-service
    
    # Vérification
    sleep 5
    if sudo systemctl is-active --quiet votre-app-service; then
        echo "✅ Service démarré avec succès"
    else
        echo "❌ Erreur lors du démarrage du service"
        exit 1
    fi
EOF

# Étape 5: Nettoyage
echo -e "${YELLOW}🧹 Nettoyage...${NC}"
rm deployment-package.tar.gz
ssh $VPS_USER@$VPS_IP "rm /tmp/deployment-package.tar.gz"

echo -e "${GREEN}✅ Déploiement terminé avec succès !${NC}"
echo -e "${GREEN}🌐 Votre site est maintenant en ligne avec la nouvelle version.${NC}"
