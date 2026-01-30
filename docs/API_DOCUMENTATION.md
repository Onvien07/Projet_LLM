# Documentation API - NewsPulse

Référence complète des endpoints de l'API NewsPulse.

## Base URL

```
http://localhost:3000/api
```

En production, remplacer par votre domaine : `https://api.newspulse.app/api`

## Authentification

**Version actuelle** : Aucune authentification requise.

**Version future** : Prévoir JWT ou API Keys pour sécuriser les endpoints.

---

## Endpoints

### 🏥 Health Check

#### `GET /health`

Vérifie l'état du serveur et des services.

**Requête** :
```bash
curl http://localhost:3000/api/health
```

**Réponse** :
```json
{
  "success": true,
  "status": "healthy",
  "message": "Serveur opérationnel",
  "timestamp": "2026-01-28T12:00:00.000Z",
  "uptime": {
    "seconds": 3600,
    "formatted": "1h 0m 0s"
  },
  "memory": {
    "used": "45 MB",
    "total": "128 MB"
  },
  "services": {
    "deepseek": "connected",
    "news": "operational"
  },
  "environment": "development"
}
```

**Status Codes** :
- `200` : Serveur opérationnel

---

### 📰 Actualités

#### `GET /news`

Récupère la liste des actualités récentes.

**Query Parameters** :
| Paramètre | Type | Requis | Description | Défaut |
|-----------|------|--------|-------------|--------|
| `limit` | number | Non | Nombre d'articles (max 50) | 10 |
| `search` | string | Non | Recherche par mot-clé | - |

**Exemples** :

```bash
# Récupérer 5 articles
curl "http://localhost:3000/api/news?limit=5"

# Rechercher des articles
curl "http://localhost:3000/api/news?search=intelligence+artificielle"
```

**Réponse** :
```json
{
  "success": true,
  "data": [
    {
      "id": "news-1",
      "title": "Intelligence artificielle : une révolution en marche",
      "summary": "Les avancées récentes en IA transforment...",
      "date": "2026-01-28T11:00:00.000Z",
      "source": "Tech News"
    }
  ],
  "total": 5,
  "timestamp": "2026-01-28T12:00:00.000Z"
}
```

**Status Codes** :
- `200` : Succès
- `500` : Erreur serveur

---

#### `GET /news/:id`

Récupère un article spécifique par son ID.

**Paramètres** :
- `id` : Identifiant de l'article (alphanumérique, tirets, underscores)

**Exemple** :
```bash
curl http://localhost:3000/api/news/news-1
```

**Réponse** :
```json
{
  "success": true,
  "data": {
    "id": "news-1",
    "title": "Intelligence artificielle : une révolution en marche",
    "summary": "Les avancées récentes en IA...",
    "date": "2026-01-28T11:00:00.000Z",
    "source": "Tech News"
  },
  "timestamp": "2026-01-28T12:00:00.000Z"
}
```

**Status Codes** :
- `200` : Succès
- `400` : ID invalide
- `404` : Article non trouvé
- `500` : Erreur serveur

---

### 🤖 Intelligence Artificielle

#### `POST /ask`

Pose une question au LLM Deepseek.

**Body (JSON)** :
| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| `question` | string | Oui | Question de l'utilisateur (3-1000 caractères) |
| `context` | string | Non | Contexte additionnel |

**Exemple** :
```bash
curl -X POST http://localhost:3000/api/ask \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Quelles sont les dernières avancées en IA?",
    "context": "Je suis étudiant en informatique"
  }'
```

**Réponse** :
```json
{
  "success": true,
  "answer": "Les dernières avancées en intelligence artificielle incluent...",
  "question": "Quelles sont les dernières avancées en IA?",
  "timestamp": "2026-01-28T12:00:00.000Z"
}
```

**Erreurs** :
```json
{
  "success": false,
  "error": "La question doit contenir au moins 3 caractères"
}
```

**Status Codes** :
- `200` : Succès
- `400` : Validation échouée
- `500` : Erreur IA ou serveur

---

#### `POST /summary`

Génère un résumé d'un texte ou article.

**Body (JSON)** :
| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| `text` | string | Conditonnel* | Texte à résumer (max 5000 caractères) |
| `articleId` | string | Conditionnel* | ID de l'article à résumer |

\* Un des deux champs doit être fourni

**Exemples** :

```bash
# Résumer un texte
curl -X POST http://localhost:3000/api/summary \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Votre long texte ici..."
  }'

# Résumer un article par ID
curl -X POST http://localhost:3000/api/summary \
  -H "Content-Type: application/json" \
  -d '{
    "articleId": "news-1"
  }'
```

**Réponse** :
```json
{
  "success": true,
  "summary": "Ce texte traite principalement de... Les points clés incluent...",
  "originalLength": 2500,
  "timestamp": "2026-01-28T12:00:00.000Z"
}
```

**Status Codes** :
- `200` : Succès
- `400` : Validation échouée
- `404` : Article non trouvé (si articleId)
- `500` : Erreur IA ou serveur

---

#### `POST /explain`

Génère une explication détaillée d'un sujet.

**Body (JSON)** :
| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| `topic` | string | Oui | Sujet à expliquer (3-1000 caractères) |
| `context` | string | Non | Contexte additionnel |

**Exemple** :
```bash
curl -X POST http://localhost:3000/api/explain \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Le changement climatique",
    "context": "Niveau débutant"
  }'
```

**Réponse** :
```json
{
  "success": true,
  "explanation": "Le changement climatique fait référence à...",
  "topic": "Le changement climatique",
  "timestamp": "2026-01-28T12:00:00.000Z"
}
```

**Status Codes** :
- `200` : Succès
- `400` : Validation échouée
- `500` : Erreur IA ou serveur

---

## Codes d'Erreur

| Code | Signification | Description |
|------|---------------|-------------|
| `200` | OK | Requête réussie |
| `400` | Bad Request | Données invalides |
| `404` | Not Found | Ressource non trouvée |
| `500` | Internal Server Error | Erreur serveur |

## Format des Erreurs

Toutes les erreurs suivent ce format :

```json
{
  "success": false,
  "error": "Message d'erreur descriptif"
}
```

En mode développement, le stack trace peut être inclus :
```json
{
  "success": false,
  "error": "Message d'erreur",
  "stack": "Error: ...\n    at ..."
}
```

## Limites

### Rate Limiting

**Non implémenté actuellement**, mais recommandé en production :

```javascript
// Exemple avec express-rate-limit
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requêtes par IP
});
app.use('/api/', limiter);
```

### Tailles Maximales

| Endpoint | Paramètre | Limite |
|----------|-----------|--------|
| `/ask` | question | 1000 caractères |
| `/summary` | text | 5000 caractères |
| `/explain` | topic | 1000 caractères |
| Tous | Body JSON | 10 MB |

## Exemples avec Différents Outils

### JavaScript (Fetch)

```javascript
async function askQuestion() {
  const response = await fetch('http://localhost:3000/api/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      question: 'Comment fonctionne NewsPulse?'
    })
  });
  
  const data = await response.json();
  console.log(data.answer);
}
```

### Python (requests)

```python
import requests

response = requests.post(
    'http://localhost:3000/api/ask',
    json={'question': 'Comment fonctionne NewsPulse?'}
)

print(response.json()['answer'])
```

### Postman

1. Créer une nouvelle requête POST
2. URL : `http://localhost:3000/api/ask`
3. Headers : `Content-Type: application/json`
4. Body (raw JSON) :
```json
{
  "question": "Votre question ici"
}
```

## CORS

Le serveur accepte les requêtes depuis :
- `http://localhost:5173` (frontend dev)
- `http://localhost:3000` (même origine)

Configuration des origines dans `.env` :
```env
ALLOWED_ORIGINS=http://localhost:5173,https://newspulse.app
```

## Bonnes Pratiques

### 1. Validation Côté Client
Valider les données avant envoi pour meilleure UX.

### 2. Gestion d'Erreurs
Toujours vérifier `success` dans la réponse :

```javascript
if (response.success) {
  // Traiter les données
} else {
  // Afficher l'erreur
  console.error(response.error);
}
```

### 3. Timeout
Définir un timeout raisonnable (30s recommandé) :

```javascript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 30000);

fetch(url, { signal: controller.signal })
  .finally(() => clearTimeout(timeout));
```

### 4. Retry Logic
Implémenter des tentatives pour les erreurs réseau :

```javascript
async function fetchWithRetry(url, options, retries = 3) {
  try {
    return await fetch(url, options);
  } catch (error) {
    if (retries > 0) {
      await new Promise(r => setTimeout(r, 1000));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}
```

## Support

Pour questions ou problèmes :
- Consulter les logs serveur
- Vérifier la configuration `.env`
- Tester avec `curl` pour isoler le problème
- Consulter [ARCHITECTURE.md](ARCHITECTURE.md) pour détails techniques
