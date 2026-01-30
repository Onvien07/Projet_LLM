
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import * as llmService from './src/services/llmService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.join(__dirname, '.env') });

async function runDiagnostics() {
    console.log('--- NewsPulse AI Diagnostics ---');
    console.log('Deepseek Available:', llmService.isDeepseekAvailable());
    console.log('Gemini Available:', llmService.isGeminiAvailable());
    console.log('Any AI Available:', llmService.isAnyAiAvailable());
    console.log('-------------------------------\n');

    const testQuestion = 'Est-ce que tu fonctionnes ?';

    console.log(`Testing AI with question: "${testQuestion}"`);
    try {
        const result = await llmService.answerQuestion(testQuestion);
        console.log('\n--- Result ---');
        console.log('Success:', result.success);
        console.log('Provider Used:', result.provider || 'None (Mock)');
        console.log('Answer:', result.answer);
        if (result.error) console.log('Error Info:', result.error);
        console.log('-------------------\n');
    } catch (error) {
        console.error('❌ Diagnostic failed with unexpected error:', error);
    }
}

runDiagnostics();
