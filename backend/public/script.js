const input = document.getElementById('question-input');
const sendBtn = document.getElementById('send-btn');
const responseArea = document.getElementById('response-area');
const statusMessage = document.getElementById('status-message');
const apiStatusDot = document.getElementById('api-status-dot');
const apiStatusText = document.getElementById('api-status-text');

// Check Health on Load
async function checkHealth() {
    try {
        const res = await fetch('/health');
        if (res.ok) {
            const data = await res.json();
            apiStatusDot.classList.add('online');
            apiStatusText.textContent = `Système Opérationnel (${data.ai_status?.any_active ? 'IA Connectée' : 'Mode Simulation'})`;
        } else {
            throw new Error('Erreur HTTP');
        }
    } catch (e) {
        apiStatusDot.classList.add('offline');
        apiStatusText.textContent = 'Serveur non joignable';
        console.error('Health check failed', e);
    }
}

// Ensure interface works even if previous listeners existed
sendBtn.onclick = handleSend;
input.onkeypress = (e) => {
    if (e.key === 'Enter') handleSend();
};

async function handleSend() {
    const question = input.value.trim();
    if (!question) return;

    // UI Updates
    input.value = '';
    input.disabled = true;
    sendBtn.disabled = true;
    statusMessage.textContent = 'Analyse en cours...';

    // Show user question immediately (optional, or just wait for answer)
    responseArea.innerHTML = `<p style="color: #94a3b8; font-style: italic; margin-bottom: 1rem;">"${question}"</p><div class="loading-spinner">Génération de la réponse...</div>`;
    responseArea.classList.remove('empty');

    try {
        const response = await fetch('/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: question })
        });

        const data = await response.json();

        if (response.ok) {
            // Typewriter effect could go here, but keep it simple for now
            responseArea.innerHTML = `<p style="color: #94a3b8; font-style: italic; margin-bottom: 1rem;">"${question}"</p>${formatResponse(data.answer)}`;
        } else {
            responseArea.innerHTML = `<p style="color: var(--error)">Erreur: ${data.message || 'Impossible de récupérer la réponse'}</p>`;
        }
    } catch (error) {
        responseArea.innerHTML = `<p style="color: var(--error)">Erreur réseau: ${error.message}</p>`;
    } finally {
        input.disabled = false;
        sendBtn.disabled = false;
        input.focus();
        statusMessage.textContent = '';
    }
}

function formatResponse(text) {
    // Simple conversion of newlines to breaks and protecting HTML
    if (!text) return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>");
}

// Initial Check
checkHealth();
