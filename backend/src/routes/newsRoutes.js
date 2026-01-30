/**
 * ROUTES NEWS - NewsPulse Backend
 * Endpoints pour récupérer les actualités
 */

import express from 'express';
import { getNewsList, getArticleById, searchArticles } from '../services/newsService.js';
import { isValidId } from '../utils/validation.js';

const router = express.Router();

/**
 * GET /api/news
 * Récupère la liste des actualités
 * Query params:
 *  - limit: nombre d'articles (défaut: 10, max: 50)
 *  - search: recherche par mot-clé (optionnel)
 */
router.get('/', async (req, res) => {
    try {
        const { limit = 10, search } = req.query;
        const parsedLimit = Math.min(parseInt(limit) || 10, 50);

        let result;

        if (search) {
            result = await searchArticles(search);
        } else {
            result = await getNewsList(parsedLimit);
        }

        res.json(result);
    } catch (error) {
        console.error('Erreur GET /news:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Erreur lors de la récupération des actualités',
        });
    }
});

/**
 * GET /api/news/:id
 * Récupère un article spécifique par son ID
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                error: 'ID invalide',
            });
        }

        const result = await getArticleById(id);
        res.json(result);
    } catch (error) {
        console.error('Erreur GET /news/:id:', error);

        if (error.message === 'Article non trouvé') {
            return res.status(404).json({
                success: false,
                error: error.message,
            });
        }

        res.status(500).json({
            success: false,
            error: 'Erreur lors de la récupération de l\'article',
        });
    }
});

export default router;
