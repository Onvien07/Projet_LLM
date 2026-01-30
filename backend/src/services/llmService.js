/**
 * SERVICE LLM - NewsPulse Backend
 * Intégration avec Deepseek AI et Google Gemini pour générer des réponses IA
 */

import fetch from 'node-fetch';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PROMPT_TEMPLATES, ERROR_MESSAGES, DEESEEK_CONFIG, GEMINI_CONFIG } from '../utils/constants.js';
import { sanitizeText } from '../utils/validation.js';

/**
 * Récupère les clés API depuis l'environnement
 */
function getDeepseekApiKey() {
    return process.env.DEESEEK_API_KEY;
}

function getGeminiApiKey() {
    return process.env.GEMINI_API_KEY;
}

/**
 * Vérifie la disponibilité des services
 */
export function isDeepseekAvailable() {
    const apiKey = getDeepseekApiKey();
    return !!apiKey && apiKey.startsWith('sk-') && apiKey.length > 20;
}

export function isGeminiAvailable() {
    const apiKey = getGeminiApiKey();
    return !!apiKey && apiKey.length > 20;
}

export function isAnyAiAvailable() {
    return isDeepseekAvailable() || isGeminiAvailable();
}

/**
 * Détermine quel service utiliser (Priorité Gemini car gratuit/plus stable en ce moment)
 */
function getActiveProvider() {
    if (isGeminiAvailable()) return 'gemini';
    if (isDeepseekAvailable()) return 'deepseek';
    return 'mock';
}

/**
 * Appel à l'API Deepseek (Format OpenAI)
 */
async function callDeepseek(prompt) {
    const apiKey = getDeepseekApiKey();
    if (!apiKey) throw new Error(ERROR_MESSAGES.DEESEEK_API_KEY_MISSING);

    try {
        const response = await fetch(DEESEEK_CONFIG.ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: DEESEEK_CONFIG.MODEL,
                messages: [
                    { role: 'system', content: 'Tu es un assistant expert en actualités.' },
                    { role: 'user', content: prompt }
                ],
                temperature: DEESEEK_CONFIG.TEMPERATURE,
            }),
        });

        const data = await response.json();

        if (response.status === 402) {
            throw new Error(ERROR_MESSAGES.DEESEEK_INSUFFICIENT_BALANCE);
        }

        if (!response.ok) {
            throw new Error(`Erreur Deepseek (${response.status}): ${data.error?.message || JSON.stringify(data)}`);
        }

        return data.choices?.[0]?.message?.content || 'Aucune réponse de Deepseek';
    } catch (error) {
        console.error('❌ Erreur Deepseek Service:', error.message);
        throw error;
    }
}

/**
 * Appel à l'API Google Gemini
 */
async function callGemini(prompt) {
    const apiKey = getGeminiApiKey();
    if (!apiKey) throw new Error(ERROR_MESSAGES.GEMINI_API_KEY_MISSING);

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: GEMINI_CONFIG.MODEL });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('❌ Erreur Gemini Service:', error.message);
        throw new Error(`${ERROR_MESSAGES.GEMINI_API_ERROR}: ${error.message}`);
    }
}

/**
 * Réponses mock pour dev si rien n'est disponible
 */
function generateMockResponse(input) {
    return `[MODE SIMULATION] Concernant votre question "${input.substring(0, 50)}...", voici ce que je peux vous dire : Le système est actuellement en mode hors-ligne ou les clés API sont manquantes/invalides. Veuillez configurer GEMINI_API_KEY ou DEESEEK_API_KEY dans votre fichier .env pour activer l'IA réelle.`;
}

/**
 * Fonction centrale pour répondre aux questions
 */
export async function answerQuestion(question, context = '') {
    const cleanQuestion = sanitizeText(question);
    const cleanContext = sanitizeText(context);
    const prompt = PROMPT_TEMPLATES.QUESTION_ANSWER
        .replace('{question}', cleanQuestion)
        .replace('{context}', cleanContext || 'Aucun contexte');

    const provider = getActiveProvider();
    console.log(`🤖 Utilisation du fournisseur IA: ${provider.toUpperCase()}`);

    try {
        let answer;
        if (provider === 'gemini') {
            answer = await callGemini(prompt);
        } else if (provider === 'deepseek') {
            answer = await callDeepseek(prompt);
        } else {
            answer = generateMockResponse(cleanQuestion);
        }

        return {
            success: true,
            answer,
            provider,
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error(`❌ Échec de l'IA (${provider}):`, error.message);

        // Fallback vers l'autre service si possible
        if (provider === 'gemini' && isDeepseekAvailable()) {
            console.log('🔄 Tentative de fallback vers Deepseek...');
            try {
                const answer = await callDeepseek(prompt);
                return { success: true, answer, provider: 'deepseek (fallback)', timestamp: new Date().toISOString() };
            } catch (fallbackError) {
                // Si les deux échouent
            }
        } else if (provider === 'deepseek' && isGeminiAvailable()) {
            console.log('🔄 Tentative de fallback vers Gemini...');
            try {
                const answer = await callGemini(prompt);
                return { success: true, answer, provider: 'gemini (fallback)', timestamp: new Date().toISOString() };
            } catch (fallbackError) {
                // Si les deux échouent
            }
        }

        // Si tout a échoué, expliquer pourquoi à l'utilisateur au lieu d'une mock générique si c'est une erreur de balance
        let finalAnswer = generateMockResponse(cleanQuestion);
        if (error.message.includes('Insufficient Balance')) {
            finalAnswer = `[ERREUR CONFIG] ${ERROR_MESSAGES.DEESEEK_INSUFFICIENT_BALANCE}`;
        }

        return {
            success: true,
            answer: finalAnswer,
            error: error.message,
            timestamp: new Date().toISOString(),
            note: 'fallback-to-mock'
        };
    }
}

/**
 * Résumé d'article
 */
export async function generateSummary(text) {
    const cleanText = sanitizeText(text);
    const prompt = PROMPT_TEMPLATES.SUMMARY.replace('{text}', cleanText);
    const result = await answerQuestion(prompt);
    return result.answer;
}

/**
 * Explication de sujet
 */
export async function generateExplanation(topic, context = '') {
    const cleanTopic = sanitizeText(topic);
    const cleanContext = sanitizeText(context);
    const prompt = PROMPT_TEMPLATES.EXPLANATION.replace('{topic}', cleanTopic).replace('{context}', cleanContext || 'Aucun contexte');
    const result = await answerQuestion(prompt);
    return result.answer;
}
