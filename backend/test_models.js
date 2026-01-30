
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    console.log('Using Key:', apiKey.substring(0, 10) + '...');
    const genAI = new GoogleGenerativeAI(apiKey);

    try {
        // The listModels method is not directly on genAI in some versions.
        // In the newer SDKs, you might need to use a different approach or just try a standard list.
        // Actually, the JS SDK doesn't always have a direct listModels.
        // Let's try gemini-1.5-flash-001 or gemini-pro instead.

        const testModels = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];

        for (const modelName of testModels) {
            try {
                console.log(`Testing model: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello");
                console.log(`✅ ${modelName} works!`);
                return modelName;
            } catch (e) {
                console.log(`❌ ${modelName} failed: ${e.message}`);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

listModels();
