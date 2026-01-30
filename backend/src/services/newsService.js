/**
 * SERVICE NEWS - NewsPulse Backend
 * Gestion des actualités (mock data ou API externe)
 */

import { MOCK_NEWS } from '../utils/constants.js';

/**
 * Récupère la liste des actualités
 * @param {number} limit - Nombre d'articles à retourner
 * @returns {Promise<Object>}
 */
export const getNewsList = async (limit = 10) => {
    try {
        // Pour l'instant, on utilise les données mock
        // Dans une version production, on ferait un appel à une API externe
        // comme NewsAPI: https://newsapi.org/

        const limitedNews = MOCK_NEWS.slice(0, Math.min(limit, MOCK_NEWS.length));

        return {
            success: true,
            data: limitedNews,
            total: limitedNews.length,
            timestamp: new Date().toISOString(),
        };
    } catch (error) {
        console.error('Erreur récupération actualités:', error);
        throw new Error('Impossible de récupérer les actualités');
    }
};

/**
 * Récupère un article spécifique par ID
 * @param {string} id - ID de l'article
 * @returns {Promise<Object>}
 */
export const getArticleById = async (id) => {
    try {
        const article = MOCK_NEWS.find(news => news.id === id);

        if (!article) {
            throw new Error('Article non trouvé');
        }

        return {
            success: true,
            data: article,
            timestamp: new Date().toISOString(),
        };
    } catch (error) {
        throw error;
    }
};

/**
 * Recherche d'articles par mot-clé (optionnel)
 * @param {string} query - Requête de recherche
 * @returns {Promise<Object>}
 */
export const searchArticles = async (query) => {
    try {
        const lowerQuery = query.toLowerCase();

        const results = MOCK_NEWS.filter(news =>
            news.title.toLowerCase().includes(lowerQuery) ||
            news.summary.toLowerCase().includes(lowerQuery)
        );

        return {
            success: true,
            data: results,
            query,
            total: results.length,
            timestamp: new Date().toISOString(),
        };
    } catch (error) {
        console.error('Erreur recherche articles:', error);
        throw new Error('Erreur lors de la recherche');
    }
};

/**
 * Fonction pour intégrer une API externe (exemple NewsAPI)
 * Cette fonction peut être activée quand une clé API est disponible
 */
export const fetchFromExternalAPI = async (limit = 10) => {
    // Exemple d'intégration NewsAPI
    // const apiKey = process.env.NEWS_API_KEY;
    // const url = `https://newsapi.org/v2/top-headlines?country=fr&pageSize=${limit}&apiKey=${apiKey}`;
    // 
    // try {
    //   const response = await fetch(url);
    //   const data = await response.json();
    //   
    //   return data.articles.map(article => ({
    //     id: article.url,
    //     title: article.title,
    //     summary: article.description,
    //     date: article.publishedAt,
    //     source: article.source.name,
    //   }));
    // } catch (error) {
    //   console.error('Erreur API externe:', error);
    //   return MOCK_NEWS;
    // }

    return MOCK_NEWS;
};

export default {
    getNewsList,
    getArticleById,
    searchArticles,
    fetchFromExternalAPI,
};
