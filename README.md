# NewsPulse 🚀

**Plateforme d'actualités augmentée par IA (Gemini/Deepseek)**

NewsPulse est une application moderne qui combine les actualités en temps réel avec la puissance des modèles de langage pour offrir des résumés et des réponses personnalisées.

## ✨ Fonctionnalités

- 🤖 **IA Conversationnelle** : Posez des questions sur l'actualité via Gemini ou Deepseek.
- 📰 **News en Direct** : Consultez les derniers titres mondiaux.
- ⚡ **Architecture Légère** : Serveur backend unique servant une interface statique optimisée.
- 📱 **Responsive Design** : Utilisable sur tous les supports.

## 🛠️ Stack Technique

- **Backend** : Node.js & Express
- **Frontend** : HTML5, CSS3 (Vanilla), JavaScript moderne (ESM)
- **IA** : Google Generative AI (Gemini) & Deepseek API
- **Sécurité** : Helmet, CORS, Dotenv

## 🚀 Installation & Lancement

### 1. Prérequis
- Node.js >= 18.0.0

### 2. Configuration
Clonez le dépôt puis installez les dépendances à la racine :
```bash
npm install
```

Créez un fichier `.env` à la racine avec vos clés :
```env
PORT=3000
GEMINI_API_KEY=votre_clé_gemini
DEESEEK_API_KEY=votre_clé_deepseek (optionnel)
```

### 3. Lancement
```bash
npm run dev
```
L'application sera disponible sur [http://localhost:3000](http://localhost:3000).

## 📂 Structure du Projet

- `backend/src/server.js` : Point d'entrée du serveur.
- `backend/public/` : Code source du frontend (Index, CSS, JS).
- `backend/src/services/` : Intégrations IA et logique métier.

## 📄 Licence
MIT
