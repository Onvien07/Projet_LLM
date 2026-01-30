# NewsPulse Backend

Backend API pour la plateforme NewsPulse - Actualités + IA

## Démarrage Rapide

```bash
npm install
copy .env.example .env
# Éditer .env avec votre clé API Deepseek
npm run dev
```

Serveur disponible sur `http://localhost:3000`

## Documentation

Voir [docs/](../docs/) pour la documentation complète :
- [Architecture](../docs/ARCHITECTURE.md)
- [API Reference](../docs/API_DOCUMENTATION.md)
- [User Guide](../docs/USER_GUIDE.md)

## Endpoints

- `GET /api/health` - Health check
- `GET /api/news` - Liste actualités
- `POST /api/ask` - Poser question IA
- `POST /api/summary` - Résumer texte
- `POST /api/explain` - Expliquer sujet
