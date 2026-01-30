import axios from 'axios';

/**
 * Service API centralisé pour NewsPulse
 * Gère toutes les communications avec le backend
 */

// Configuration de base pour axios
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const API_TIMEOUT = 30000; // 30 secondes

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur pour gestion globale des erreurs
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);

        if (error.response) {
            // Erreur avec réponse du serveur
            throw new Error(error.response.data.message || 'Erreur serveur');
        } else if (error.request) {
            // Pas de réponse reçue
            throw new Error('Impossible de contacter le serveur');
        } else {
            // Erreur de configuration
            throw new Error('Erreur de requête');
        }
    }
);

/**
 * Récupère la liste des actualités
 * @param {number} limit - Nombre d'articles à récupérer
 * @returns {Promise<Array>} Liste des articles
 */
export const getNews = async (limit = 10) => {
    try {
        const response = await apiClient.get('/news', {
            params: { limit },
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des actualités:', error);
        throw error;
    }
};

/**
 * Récupère un article spécifique
 * @param {string} id - ID de l'article
 * @returns {Promise<Object>} Article complet
 */
export const getArticle = async (id) => {
    try {
        const response = await apiClient.get(`/news/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'article:', error);
        throw error;
    }
};

/**
 * Pose une question au LLM
 * @param {string} question - Question de l'utilisateur
 * @param {string} context - Contexte additionnel (optionnel)
 * @returns {Promise<Object>} Réponse du LLM
 */
export const askQuestion = async (question, context = '') => {
    try {
        const response = await apiClient.post('/ask', {
            question,
            context,
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'envoi de la question:', error);
        throw error;
    }
};

/**
 * Demande un résumé d'un article
 * @param {string} articleId - ID de l'article
 * @param {string} text - Texte à résumer (optionnel si articleId fourni)
 * @returns {Promise<Object>} Résumé généré
 */
export const getSummary = async (articleId, text = '') => {
    try {
        const response = await apiClient.post('/summary', {
            articleId,
            text,
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la génération du résumé:', error);
        throw error;
    }
};

/**
 * Demande une explication détaillée
 * @param {string} topic - Sujet à expliquer
 * @param {string} context - Contexte (article, etc.)
 * @returns {Promise<Object>} Explication générée
 */
export const getExplanation = async (topic, context = '') => {
    try {
        const response = await apiClient.post('/explain', {
            topic,
            context,
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la génération de l\'explication:', error);
        throw error;
    }
};

/**
 * Vérifie l'état du serveur
 * @returns {Promise<Object>} Status du serveur
 */
export const checkHealth = async () => {
    try {
        const response = await apiClient.get('/health');
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la vérification du serveur:', error);
        throw error;
    }
};

export default {
    getNews,
    getArticle,
    askQuestion,
    getSummary,
    getExplanation,
    checkHealth,
};
