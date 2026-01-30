
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import * as llmService from './src/services/llmService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

async function testSingle() {
    console.log('Testing 2+2...');
    try {
        const result = await llmService.answerQuestion('2+2');
        console.log('Result:', JSON.stringify(result, null, 2));
    } catch (error) {
        console.error('Error:', error);
    }
}

testSingle();
