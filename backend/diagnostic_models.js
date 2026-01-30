
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

async function listModels() {
    const apiKey = process.env.DEESEEK_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);

    try {
        console.log("Listing models...");
        // In newer versions, we might need to use the generativeAI object's methods or the REST API
        // But the JS SDK has listModels on the genAI object (depending on version)
        // Actually, it's not directly on genAI. It's often via the Discovery API or a separate client.
        // Let's try the simplest check or a different approach.

        // If listModels is not avail in SDK, try a default Deepseek model
        const modelsToTry = [ 'deepseek-default' ];

        for (const modelName of modelsToTry) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello");
                console.log(`✅ Model ${modelName} is AVAILABLE`);
                return;
            } catch (e) {
                console.log(`❌ Model ${modelName} returned error: ${e.message}`);
            }
        }
    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
