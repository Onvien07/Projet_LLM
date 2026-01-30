/**
 * ROUTES LLM - NewsPulse Backend
 * Endpoints pour interactions avec l'IA (Deepseek)
 */

import express from 'express';
import { answerQuestion, generateSummary, generateExplanation } from '../services/llmService.js';
import { validateQuestion, validateText } from '../utils/validation.js';
import { ERROR_MESSAGES } from '../utils/constants.js';

const router = express.Router();

/**
 * POST /api/ask
 * Pose une question au LLM
 * Body:
 *  - question: string (requis)
 *  - context: string (optionnel)
 */
router.post('/ask', async (req, res) => {
    try {
        const { question, context = '' } = req.body;

        // Validation
        const validation = validateQuestion(question);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                error: validation.error,
            });
        }

        const result = await answerQuestion(validation.cleaned, context);
        res.json(result);
    } catch (error) {
        console.error('Erreur POST /ask:', error);
        res.status(500).json({
            success: false,
            error: error.message || ERROR_MESSAGES.SERVER_ERROR,
        });
    }
});

/**
 * POST /api/summary
 * Génère un résumé d'un texte ou article
 * Body:
 *  - text: string (requis si pas d'articleId)
 *  - articleId: string (optionnel)
 */
router.post('/summary', async (req, res) => {
    try {
        let { text, articleId } = req.body;

        // Si articleId fourni, récupérer l'article
        if (articleId && !text) {
            const { getArticleById } = await import('../services/newsService.js');
            const article = await getArticleById(articleId);
            text = `${article.data.title}. ${article.data.summary}`;
        }

        // Validation
        const validation = validateText(text);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                error: validation.error,
            });
        }

        const result = await generateSummary(validation.cleaned);
        res.json(result);
    } catch (error) {
        console.error('Erreur POST /summary:', error);
        res.status(500).json({
            success: false,
            error: error.message || ERROR_MESSAGES.SERVER_ERROR,
        });
    }
});

/**
 * POST /api/explain
 * Génère une explication détaillée d'un sujet
 * Body:
 *  - topic: string (requis)
 *  - context: string (optionnel)
 */
router.post('/explain', async (req, res) => {
    try {
        const { topic, context = '' } = req.body;

        // Validation
        const validation = validateQuestion(topic); // Même validation que question
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                error: validation.error,
            });
        }

        const result = await generateExplanation(validation.cleaned, context);
        res.json(result);
    } catch (error) {
        console.error('Erreur POST /explain:', error);
        res.status(500).json({
            success: false,
            error: error.message || ERROR_MESSAGES.SERVER_ERROR,
        });
    }
});

export default router;
