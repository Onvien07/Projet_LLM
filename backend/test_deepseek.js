
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.join(__dirname, '.env') });
const apiKey = process.env.DEESEEK_API_KEY;

console.log('Using API Key Type:', apiKey ? (apiKey.startsWith('sk-') ? 'Deepseek (sk-...)' : 'Unknown') : 'Missing');
console.log('Key length:', apiKey ? apiKey.length : 0);

async function testDeepseek() {
    if (!apiKey) {
        console.error('❌ DEESEEK_API_KEY is missing from .env');
        return;
    }

    const url = 'https://api.deepseek.com/chat/completions';
    const body = {
        model: 'deepseek-chat',
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: 'Hello, are you working?' }
        ],
        stream: false
    };

    console.log(`Calling ${url}...`);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        if (response.ok) {
            console.log('✅ Success!');
            console.log('Response:', data.choices[0].message.content);
        } else {
            console.error(`❌ API Error (${response.status}):`, JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error('❌ Network Error:', error.message);
    }
}

testDeepseek();
