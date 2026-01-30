import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIGURATION ENVIRONNEMENT ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// On cherche le .env dans plusieurs endroits possibles
const possiblePaths = [
    path.join(process.cwd(), '.env'),
    path.join(__dirname, '..', '.env'),
    path.join(__dirname, '..', '..', '.env')
];

for (const envPath of possiblePaths) {
    const result = dotenv.config({ path: envPath });
    if (!result.error) {
        console.log(`✅ .env chargé depuis: ${envPath}`);
        break;
    }
}

// Sur Vercel, les variables sont déjà dans process.env, donc pas besoin de .env
console.log('--- STATUT IA ---');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Détectée' : 'MANQUANTE');
console.log('DEESEEK_API_KEY:', process.env.DEESEEK_API_KEY ? 'Détectée' : 'MANQUANTE');
console.log('-----------------');

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as llmService from './services/llmService.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        ai_status: {
            any_active: llmService.isAnyAiAvailable(),
            providers: {
                gemini: llmService.isGeminiAvailable(),
                deepseek: llmService.isDeepseekAvailable()
            }
        },
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

app.post('/ask', async (req, res) => {
    const { prompt, context } = req.body;
    if (!prompt) return res.status(400).json({ success: false, error: 'Le champ "prompt" est requis.' });

    try {
        const result = await llmService.answerQuestion(prompt, context);
        res.json(result);
    } catch (error) {
        console.error('❌ Erreur /ask:', error);
        res.status(500).json({ success: false, error: 'Erreur interne', details: error.message });
    }
});

const startServer = () => {
    app.listen(PORT, () => {
        console.log(`🚀 NewsPulse Server démarré sur http://localhost:${PORT}`);
        console.log(`📁 Frontend servi depuis: ${path.join(__dirname, '../public')}`);

        const status = llmService.isGeminiAvailable() ? 'GEMINI ACTIVE' :
            llmService.isDeepseekAvailable() ? 'DEESEEK ACTIVE' :
                'INACTIVE (Mock)';
        console.log(`🤖 Statut IA: ${status}\n`);
    });
};

if (process.env.NODE_ENV !== 'production') {
    startServer();
}

export default app;
