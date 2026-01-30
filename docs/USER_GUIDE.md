# Guide Utilisateur - NewsPulse

Guide complet pour installer, configurer et utiliser NewsPulse.

## Table des Matières

1. [Prérequis](#prérequis)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Lancement de l'Application](#lancement-de-lapplication)
5. [Utilisation](#utilisation)
6. [Troubleshooting](#troubleshooting)
7. [FAQ](#faq)

---

## Prérequis

Avant de commencer, assurez-vous d'avoir :

### Logiciels Requis

- **Node.js** version 18.0 ou supérieure
  - Vérifier : `node --version`
  - Télécharger : [nodejs.org](https://nodejs.org/)

- **npm** version 9.0 ou supérieure
  - Vérifier : `npm --version`
  - Inclus avec Node.js

### Clé API Deepseek

1. Visitez le portail Deepseek (fournisseur de l'API)
2. Connectez-vous ou créez un compte
3. Créez une nouvelle clé API
4. **Conservez la clé en sécurité** (vous en aurez besoin)

> **Note** : L'application fonctionne en mode mock (réponses simulées) sans clé API, mais les fonctionnalités IA seront limitées.

---

## Installation

### Étape 1 : Télécharger le Projet

```bash
# Si vous avez le projet en archive
cd chemin/vers/NewsPulse

# Ou cloner depuis un dépôt Git
git clone <url-du-repo>
cd NewsPulse
```

### Étape 2 : Installer les Dépendances Backend

```bash
cd backend
npm install
```

Cela installera :
- Express (serveur web)
- Client/API Deepseek (intégration LLM)
- Helmet (sécurité)
- CORS (gestion origines)
- Et autres dépendances

### Étape 3 : Installer les Dépendances Frontend

```bash
cd ../frontend
npm install
```

Cela installera :
- React (framework UI)
- Vite (build tool)
- Axios (client HTTP)

---

## Configuration

### Backend

1. **Créer le fichier `.env`** :

```bash
cd backend
copy .env.example .env
```

2. **Éditer `.env`** avec votre éditeur de texte :

```env
# Port du serveur (ne pas changer sauf conflit)
PORT=3000

# Clé API Deepseek (IMPORTANT)
DEESEEK_API_KEY=VOTRE_CLÉ_API_ICI

# Environnement
NODE_ENV=development

# Origines CORS autorisées
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

> **⚠️ Important** : Remplacez `VOTRE_CLÉ_API_ICI` par votre vraie clé API Deepseek.

### Frontend

Le frontend utilise la configuration par défaut de Vite. Pas de configuration supplémentaire nécessaire.

**Optionnel** : Créer `frontend/.env` pour personnaliser :

```env
VITE_API_URL=http://localhost:3000/api
```

---

## Lancement de l'Application

### Mode Développement (Recommandé)

Vous aurez besoin de **deux terminaux** ouverts.

#### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

Vous devriez voir :
```
╔════════════════════════════════════════╗
║     🚀 NewsPulse Backend Started     ║
╚════════════════════════════════════════╝

📡 Serveur:     http://localhost:3000
🏥 Health:      http://localhost:3000/api/health
📰 News:        http://localhost:3000/api/news
🤖 IA Deepseek:   ✅ Connecté
```

> Si vous voyez "📝 Mode mock", votre clé API n'est pas configurée.

#### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

Vous devriez voir :
```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

#### Accéder à l'Application

Ouvrez votre navigateur et allez à :
```
http://localhost:5173
```

### Mode Production

#### 1. Build du Frontend

```bash
cd frontend
npm run build
```

Un dossier `dist/` sera créé avec les fichiers optimisés.

#### 2. Lancer le Backend

```bash
cd backend
npm start
```

#### 3. Servir le Frontend

```bash
cd frontend
npm run preview
```

Ou utiliser un serveur web comme Nginx pour servir `dist/`.

---

## Utilisation

### Interface Principale

L'interface NewsPulse est divisée en sections :

#### 1. **Header (En-tête)**
- Logo NewsPulse
- Bouton menu (toggle sidebar)
- Indicateur de statut (En ligne / Hors ligne)

#### 2. **Sidebar (Barre latérale)**
- **Historique des conversations**
- Affiche toutes vos questions et réponses précédentes
- Cliquez sur une question pour la réutiliser

#### 3. **Section Principale**

##### A. Zone de Question
- **Champ de texte** : Tapez votre question (3-1000 caractères)
- **Compteur** : Affiche le nombre de caractères
- **Bouton Envoyer** : Soumet la question
- **Raccourci clavier** :
  - `Entrée` → Envoyer
  - `Shift + Entrée` → Nouvelle ligne

##### B. Zone de Réponse
- **Réponse IA** : Affichage formaté de la réponse
- **Question originale** : Rappel de votre question
- **Horodatage** : Date et heure de la réponse
- **Actions** : Copier, Partager (à implémenter)

##### C. Actualités
- **Grille d'articles** : Liste des articles récents
- **Carte article** :
  - Source et date
  - Titre en gras
  - Résumé (3 lignes, expandable)
  - **Boutons d'action** :
    - 📝 **Résumer** : Génère un résumé concis
    - 💡 **Expliquer** : Explication détaillée

### Workflows Typiques

#### Workflow 1 : Poser une Question Générale

1. **Taper** votre question dans le champ de texte
   - Ex : "Quelles sont les dernières nouvelles en technologie ?"

2. **Cliquer** sur "Envoyer" ou appuyer sur `Entrée`

3. **Attendre** la génération (indicateur de chargement)

4. **Lire** la réponse dans la zone dédiée

5. **Consulter** l'historique à gauche pour retrouver la conversation

#### Workflow 2 : Résumer un Article

1. **Parcourir** la liste des actualités en bas de page

2. **Trouver** un article qui vous intéresse

3. **Cliquer** sur le bouton "Résumer"

4. **Lire** le résumé généré dans la zone de réponse

5. La page scrolle automatiquement vers le haut

#### Workflow 3 : Expliquer un Sujet

1. **Cliquer** sur "Expliquer" sur un article

2. **Obtenir** une explication pédagogique détaillée

3. **Utiliser** l'historique pour comparer avec d'autres explications

### Fonctionnalités Clés

#### 🔄 Auto-Scroll
- L'historique scrolle automatiquement vers le nouveau message
- La page scrolle vers le haut quand résumé/explication

#### ✅ Validation
- Minimum 3 caractères pour une question
- Maximum 1000 caractères
- Suppression automatique des balises HTML dangereuses

#### 💾 Historique
- Sauvegardé pendant la session (mémoire du navigateur)
- Perdu au rafraîchissement de la page
- **Amélioration future** : Persistance en base de données

#### 📱 Responsive
- **Desktop** : Sidebar visible, grille 3 colonnes
- **Tablet** : Sidebar cachée (toggle), grille 2 colonnes
- **Mobile** : Sidebar plein écran, grille 1 colonne

---

## Troubleshooting

### Problème : Le serveur backend ne démarre pas

**Symptôme** : Erreur au lancement de `npm run dev`

**Solutions** :

1. **Vérifier Node.js** :
```bash
node --version  # Doit être >= 18.0
```

2. **Réinstaller les dépendances** :
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

3. **Vérifier le port 3000** :
```bash
# Windows
netstat -ano | findstr :3000

# Si occupé, changer PORT dans .env
PORT=3001
```

### Problème : "Mode mock" affiché

**Symptôme** : Le backend affiche "📝 Mode mock" au lieu de "✅ Connecté"

**Solutions** :

1. **Vérifier la clé API** dans `backend/.env` :
```env
DEESEEK_API_KEY=votre_vraie_clé_ici
```

2. **Redémarrer le backend** après modification :
```bash
# Ctrl+C pour arrêter, puis
npm run dev
```

3. **Tester la clé API** :
   - Visitez [Google AI Studio](https://makersuite.google.com/)
   - Vérifiez que la clé fonctionne

### Problème : Erreur CORS

**Symptôme** : Console navigateur affiche erreur CORS

**Solutions** :

1. **Vérifier ALLOWED_ORIGINS** dans `backend/.env` :
```env
ALLOWED_ORIGINS=http://localhost:5173
```

2. **Vérifier URL frontend** :
   - Doit correspondre exactement (http vs https, port)

3. **Redémarrer backend** après changement

### Problème : Frontend charge indéfiniment

**Symptôme** : Cercle de chargement qui ne s'arrête pas

**Solutions** :

1. **Vérifier backend actif** :
```bash
curl http://localhost:3000/api/health
```

2. **Regarder la console** navigateur (F12) :
   - Chercher erreurs réseau
   - Vérifier URL API

3. **Vérifier apiService.js** :
   - Base URL correcte (`http://localhost:3000/api`)

### Problème : "Cannot find module"

**Symptôme** : Erreur Node.js au démarrage

**Solution** :
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

---

## FAQ

### Q: Puis-je utiliser NewsPulse sans clé API Deepseek ?

**R** : Oui ! L'application fonctionnera en "mode mock" avec des réponses simulées. C'est utile pour le développement et les tests, mais l'IA ne sera pas réelle.

### Q: Mes conversations sont-elles sauvegardées ?

**R** : Non,actuellement l'historique est stocké dans la mémoire du navigateur et perdu au rafraîchissement. Une future version ajoutera la persistance.

### Q: Comment changer la source d'actualités ?

**R** : Actuellement, des données mock sont utilisées. Pour intégrer une vraie API (NewsAPI, RSS) :

1. Modifier `backend/src/services/newsService.js`
2. Décommenter la fonction `fetchFromExternalAPI`
3. Ajouter `NEWS_API_KEY` dans `.env`

### Q: L'application est-elle sécurisée ?

**R** : Oui pour le développement local. En production :
- Utilisez HTTPS
- Ajoutez rate limiting
- Implémentez l'authentification
- Sécurisez les variables d'environnement

### Q: Puis-je déployer NewsPulse en ligne ?

**R** : Absolument ! Recommandations :

**Frontend** : Vercel, Netlify
```bash
cd frontend
npm run build
# Déployer le dossier dist/
```

**Backend** : Railway, Render, AWS
```bash
cd backend
# Configurer variables d'environnement sur la plateforme
npm start
```

### Q: Comment contribuer ou signaler un bug ?

**R** : Ce projet est académique. Pour usage réel :
- Créer un fork
- Soumettre des pull requests
- Ouvrir des issues sur GitHub

### Q: Quelle licence pour NewsPulse ?

**R** : Licence MIT - libre d'utilisation, modification et distribution.

### Q: Performance avec beaucoup d'utilisateurs ?

**R** : L'architecture actuelle supporte ~100 utilisateurs simultanés. Pour scale :
- Ajouter load balancer
- Utiliser Redis pour cache
- Database pour persistance
- Monitoring avec Prometheus

---

## Ressources Supplémentaires

### Documentation
- [README.md](../README.md) - Vue d'ensemble
- [ARCHITECTURE.md](ARCHITECTURE.md) - Architecture technique
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - Référence API

### Liens Externes
- [React Documentation](https://react.dev/)
- [Express Documentation](https://expressjs.com/)
- [Deepseek](#) (portail fournisseur de l'API)
- [Vite Documentation](https://vitejs.dev/)

### Support
- Consulter les logs serveur : `backend/*.log`
- Console navigateur (F12) pour erreurs frontend
- Tester API avec Postman ou curl

---

## Démarrage Rapide (Résumé)

```bash
# 1. Backend
cd backend
npm install
copy .env.example .env
# Éditer .env avec votre clé API
npm run dev

# 2. Frontend (nouveau terminal)
cd frontend
npm install
npm run dev

# 3. Ouvrir http://localhost:5173
```

**Bon développement avec NewsPulse ! 🚀**
