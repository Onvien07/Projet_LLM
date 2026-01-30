
import fetch from 'node-fetch';

async function checkServer() {
    try {
        const response = await fetch('http://localhost:3000/health');
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Server is ALIVE on port 3000');
            console.log('Health Data:', JSON.stringify(data, null, 2));
        } else {
            console.log('❌ Server responded with error:', response.status);
        }
    } catch (error) {
        console.log('❌ Server is NOT responding on port 3000');
    }
}

checkServer();
