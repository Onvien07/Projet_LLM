import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import * as llmService from './services/llmService.js';

// Charger le .env du projet racine si présent, sinon tomber back sur le .env local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootEnv = path.join(__dirname, '..', '..', '.env');
dotenv.config({ path: rootEnv });

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

app.listen(PORT, () => {
    console.log(`🚀 NewsPulse Server démarré sur http://localhost:${PORT}`);
    console.log(`📁 Frontend servi depuis: ${path.join(__dirname, '../public')}`);

    const status = llmService.isGeminiAvailable() ? 'GEMINI ACTIVE' :
        llmService.isDeepseekAvailable() ? 'DEESEEK ACTIVE' :
            'INACTIVE (Mock)';
    console.log(`🤖 Statut IA: ${status}\n`);
});
