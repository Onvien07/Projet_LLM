/**
 * CONSTANTES GLOBALES - NewsPulse Backend
 * Contient les templates de prompts, limites, messages d'erreur
 */

// Templates de prompts pour Deepseek
export const PROMPT_TEMPLATES = {
    /**
     * Template pour résumer un article
     */
    SUMMARY: `Tu es un assistant IA spécialisé dans le résumé d'actualités.
Résume l'article suivant de manière claire, concise et objective.
Le résumé doit :
- Être en français
- Contenir 3-5 phrases maximum
- Inclure les points clés et informations essentielles
- Rester neutre et factuel

Article à résumer:
{text}

Résumé:`,

    /**
     * Template pour expliquer un sujet
     */
    EXPLANATION: `Tu es un professeur pédagogue qui explique l'actualité de manière accessible.
Explique le sujet suivant de façon claire et structurée.
L'explication doit :
- Être en français
- Utiliser un langage simple
- Inclure le contexte et les enjeux
- Être compréhensible par tous

Sujet: {topic}
Contexte: {context}

Explication:`,

    /**
     * Template pour répondre à une question
     */
    QUESTION_ANSWER: `Tu es un assistant IA expert en actualités mondiales.
Réponds à la question suivante de manière précise et informative.
Ta réponse doit :
- Être en français
- Être factuelle et basée sur des informations vérifiables
- Être claire et bien structurée
- Mentionner si tu n'as pas assez d'informations

Question: {question}
Contexte additionnel: {context}

Réponse:`,
};

// Limites et configuration
export const LIMITS = {
    MAX_QUESTION_LENGTH: 1000,
    MAX_TEXT_LENGTH: 5000,
    MAX_TOKENS: 2048,
    MIN_QUESTION_LENGTH: 3,
    REQUEST_TIMEOUT: 30000, // 30 secondes
};

// Messages d'erreur
export const ERROR_MESSAGES = {
    INVALID_INPUT: 'Les données fournies sont invalides',
    QUESTION_TOO_SHORT: 'La question doit contenir au moins 3 caractères',
    QUESTION_TOO_LONG: 'La question ne doit pas dépasser 1000 caractères',
    TEXT_TOO_LONG: 'Le texte ne doit pas dépasser 5000 caractères',
    MISSING_QUESTION: 'La question est requise',
    MISSING_TEXT: 'Le texte est requis',
    MISSING_TOPIC: 'Le sujet est requis',
    DEESEEK_API_ERROR: 'Erreur lors de la communication avec l\'IA Deepseek',
    DEESEEK_API_KEY_MISSING: 'La clé API Deepseek n\'est pas configurée',
    DEESEEK_INSUFFICIENT_BALANCE: 'Solde insuffisant sur le compte Deepseek. Veuillez recharger vos crédits ou utiliser Gemini.',
    GEMINI_API_ERROR: 'Erreur lors de la communication avec l\'IA Gemini',
    GEMINI_API_KEY_MISSING: 'La clé API Gemini n\'est pas configurée',
    AI_QUOTA_EXCEEDED: 'Le quota d\'utilisation de l\'IA a été atteint.',
    SERVER_ERROR: 'Une erreur serveur est survenue',
    NOT_FOUND: 'Ressource non trouvée',
    RATE_LIMIT: 'Trop de requêtes, veuillez réessayer plus tard',
};

// Messages de succès
export const SUCCESS_MESSAGES = {
    HEALTH_OK: 'Serveur opérationnel',
    ANSWER_GENERATED: 'Réponse générée avec succès',
    SUMMARY_GENERATED: 'Résumé généré avec succès',
    EXPLANATION_GENERATED: 'Explication générée avec succès',
};

// Configuration Deepseek
export const DEESEEK_CONFIG = {
    MODEL: 'deepseek-chat',
    ENDPOINT: 'https://api.deepseek.com/chat/completions',
    TEMPERATURE: 0.7,
    MAX_OUTPUT_TOKENS: 2048,
};

// Configuration Gemini
export const GEMINI_CONFIG = {
    MODEL: 'gemini-flash-latest',
    TEMPERATURE: 0.7,
    MAX_OUTPUT_TOKENS: 2048,
};

// Données mock pour les actualités (si API externe non disponible)
export const MOCK_NEWS = [
    {
        id: 'news-1',
        title: 'Intelligence artificielle : une révolution en marche',
        summary: 'Les avancées récentes en IA transforment de nombreux secteurs. Les modèles de langage comme Deepseek ouvrent de nouvelles possibilités dans la compréhension et la génération de texte.',
        date: new Date(Date.now() - 3600000).toISOString(), // Il y a 1h
        source: 'Tech News',
    },
    {
        id: 'news-2',
        title: 'Changement climatique : nouveaux engagements internationaux',
        summary: 'Plusieurs pays annoncent des objectifs ambitieux pour réduire leurs émissions de carbone. Les experts soulignent l\'urgence d\'agir face à l\'accélération du réchauffement climatique.',
        date: new Date(Date.now() - 7200000).toISOString(), // Il y a 2h
        source: 'Monde',
    },
    {
        id: 'news-3',
        title: 'Économie : les marchés réagissent aux nouvelles mesures',
        summary: 'Les bourses mondiales affichent des réactions contrastées suite aux annonces des banques centrales. Les analystes prévoient une période de volatilité.',
        date: new Date(Date.now() - 10800000).toISOString(), // Il y a 3h
        source: 'Économie',
    },
    {
        id: 'news-4',
        title: 'Santé : percée majeure dans la recherche médicale',
        summary: 'Des scientifiques annoncent une découverte prometteuse dans le traitement de maladies chroniques. Les essais cliniques devraient commencer dans les prochains mois.',
        date: new Date(Date.now() - 14400000).toISOString(), // Il y a 4h
        source: 'Santé',
    },
    {
        id: 'news-5',
        title: 'Technologie : nouveau smartphone révolutionnaire',
        summary: 'Un fabricant dévoile un appareil avec des fonctionnalités innovantes. L\'accent est mis sur l\'IA embarquée et la durabilité.',
        date: new Date(Date.now() - 18000000).toISOString(), // Il y a 5h
        source: 'Tech',
    },
    {
        id: 'news-6',
        title: 'Sport : performances exceptionnelles aux championnats',
        summary: 'Les athlètes battent plusieurs records lors de la compétition internationale. Les experts saluent le niveau exceptionnel des performances.',
        date: new Date(Date.now() - 21600000).toISOString(), // Il y a 6h
        source: 'Sport',
    },
    {
        id: 'news-7',
        title: 'Culture : nouvelle exposition attire les foules',
        summary: 'Le musée accueille une collection exceptionnelle d\'œuvres contemporaines. Les visiteurs affluent pour découvrir cette exposition unique.',
        date: new Date(Date.now() - 43200000).toISOString(), // Il y a 12h
        source: 'Culture',
    },
    {
        id: 'news-8',
        title: 'Espace : mission spatiale couronnée de succès',
        summary: 'L\'agence spatiale annonce la réussite d\'une mission d\'exploration. De nouvelles données scientifiques sont attendues dans les semaines à venir.',
        date: new Date(Date.now() - 86400000).toISOString(), // Il y a 1j
        source: 'Science',
    },
];

export default {
    PROMPT_TEMPLATES,
    LIMITS,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    DEESEEK_CONFIG,
    MOCK_NEWS,
};
