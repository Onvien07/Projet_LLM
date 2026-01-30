
import fetch from 'node-fetch';

async function testApi() {
    console.log('Sending 2+2 to http://localhost:3000/ask ...');
    try {
        const response = await fetch('http://localhost:3000/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: '2+2' })
        });

        console.log('Status:', response.status);
        const data = await response.json();
        console.log('Response Body:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testApi();
