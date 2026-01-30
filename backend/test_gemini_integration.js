
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import * as llmService from './src/services/llmService.js';

// --- CONFIGURATION ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger .env depuis le backend, sinon tenter le .env racine du projet
let result = dotenv.config({ path: path.join(__dirname, '.env') });
if (result.error) {
    // tenter le .env racine (un niveau au-dessus du backend)
    result = dotenv.config({ path: path.join(__dirname, '..', '.env') });
}

if (result.error) {
    console.error("❌ ERREUR: Impossible de charger le fichier .env ni le .env racine");
    process.exit(1);
}

// Debug: afficher la clé chargée (masquer partiellement si présente)
const loadedKey = process.env.DEESEEK_API_KEY || '<undefined>';
console.log('DEBUG: DEESEEK_API_KEY=', loadedKey.startsWith ? (loadedKey.slice(0,6) + '...' ) : loadedKey);

console.log('DEBUG: llmService exports =', Object.keys(llmService));

// --- TEST ---
async function runTest() {
    console.log("--- 🧪 DÉBUT DU TEST DEEPSEEK ---");

    // 1. Initialisation
    console.log("1. Vérification de disponibilité du service...");
    if (!llmService.isDeepseekAvailable()) {
        console.error("❌ ÉCHEC: Deepseek n'est pas marqué comme disponible.");
        process.exit(1);
    }
    console.log("✅ Deepseek est disponible.");

    // 3. Test d'appel réel
    const question = "Réponds simplement 'OUI' si tu me reçois.";
    console.log(`3. Envoi de la question: "${question}" ...`);

    try {
        const response = await llmService.answerQuestion(question);

        console.log("\n--- 📝 RÉPONSE REÇUE ---");
        console.log(response.answer);
        console.log("------------------------");

        if (response && response.success) {
            console.log("✅ SUCCÈS: Une réponse valide a été reçue.");
        } else {
            console.error("❌ ÉCHEC: La réponse n'est pas au format attendu.");
        }

    } catch (error) {
        console.error("❌ ERREUR CRITIQUE lors de l'appel:", error.message);
    }

    console.log("--- FIN DU TEST ---");
}

runTest();
