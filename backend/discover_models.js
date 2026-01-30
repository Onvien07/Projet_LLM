
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

async function discoverModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    console.log('Fetching available models from Generative Language API...');
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            console.log('✅ Models found:');
            if (data.models) {
                data.models.forEach(m => {
                    console.log(`- ${m.name} (Supports: ${m.supportedGenerationMethods.join(', ')})`);
                });
            } else {
                console.log('No models returned in the list.');
            }
        } else {
            console.error(`❌ API Error (${response.status}):`, JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error('❌ Request failed:', error.message);
    }
}

discoverModels();
