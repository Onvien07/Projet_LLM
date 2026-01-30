/**
 * UTILITAIRES DE VALIDATION - NewsPulse Backend
 * Fonctions pour nettoyer et valider les entrées utilisateur
 */

import { LIMITS } from './constants.js';

/**
 * Nettoie le texte en supprimant les caractères dangereux
 * @param {string} text - Texte à nettoyer
 * @returns {string} Texte nettoyé
 */
export const sanitizeText = (text) => {
    if (!text || typeof text !== 'string') {
        return '';
    }

    // Supprime les balises HTML/scripts
    let cleaned = text.replace(/<[^>]*>/g, '');

    // Supprime les caractères de contrôle sauf espaces, tabulations, retours
    cleaned = cleaned.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

    // Trim et normalise les espaces multiples
    cleaned = cleaned.trim().replace(/\s+/g, ' ');

    return cleaned;
};

/**
 * Valide une question
 * @param {string} question - Question à valider
 * @returns {Object} { isValid: boolean, error: string|null }
 */
export const validateQuestion = (question) => {
    if (!question) {
        return {
            isValid: false,
            error: 'La question est requise',
        };
    }

    const cleaned = sanitizeText(question);

    if (cleaned.length < LIMITS.MIN_QUESTION_LENGTH) {
        return {
            isValid: false,
            error: `La question doit contenir au moins ${LIMITS.MIN_QUESTION_LENGTH} caractères`,
        };
    }

    if (cleaned.length > LIMITS.MAX_QUESTION_LENGTH) {
        return {
            isValid: false,
            error: `La question ne doit pas dépasser ${LIMITS.MAX_QUESTION_LENGTH} caractères`,
        };
    }

    return {
        isValid: true,
        error: null,
        cleaned,
    };
};

/**
 * Valide un texte (pour résumé, explication)
 * @param {string} text - Texte à valider
 * @returns {Object} { isValid: boolean, error: string|null }
 */
export const validateText = (text) => {
    if (!text) {
        return {
            isValid: false,
            error: 'Le texte est requis',
        };
    }

    const cleaned = sanitizeText(text);

    if (cleaned.length === 0) {
        return {
            isValid: false,
            error: 'Le texte ne peut pas être vide',
        };
    }

    if (cleaned.length > LIMITS.MAX_TEXT_LENGTH) {
        return {
            isValid: false,
            error: `Le texte ne doit pas dépasser ${LIMITS.MAX_TEXT_LENGTH} caractères`,
        };
    }

    return {
        isValid: true,
        error: null,
        cleaned,
    };
};

/**
 * Vérifie si une chaîne contient des caractères suspects
 * @param {string} text - Texte à vérifier
 * @returns {boolean} True si suspect
 */
export const isSuspicious = (text) => {
    // Patterns suspects
    const suspiciousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+=/i, // onclick, onload, etc.
        /eval\(/i,
        /expression\(/i,
    ];

    return suspiciousPatterns.some(pattern => pattern.test(text));
};

/**
 * Tronque un texte à une longueur maximale
 * @param {string} text - Texte à tronquer
 * @param {number} maxLength - Longueur maximale
 * @returns {string} Texte tronqué
 */
export const truncate = (text, maxLength = 200) => {
    if (!text || text.length <= maxLength) {
        return text;
    }

    return text.substring(0, maxLength) + '...';
};

/**
 * Valide un ID (alphanumérique, tirets, underscores)
 * @param {string} id - ID à valider
 * @returns {boolean}
 */
export const isValidId = (id) => {
    if (!id || typeof id !== 'string') {
        return false;
    }

    // Autorise alphanumérique, tirets et underscores
    return /^[a-zA-Z0-9_-]+$/.test(id);
};

export default {
    sanitizeText,
    validateQuestion,
    validateText,
    isSuspicious,
    truncate,
    isValidId,
};
