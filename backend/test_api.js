const fs = require('fs');

const testApi = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/ai/enhance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: 'Testing',
                type: 'summary'
            })
        });

        const data = await response.json();
        fs.appendFileSync('output_api.txt', 'API Result 2: ' + JSON.stringify(data) + '\\n');
    } catch (error) {
        fs.appendFileSync('output_api.txt', 'API Error 2: ' + error.message + '\\n');
    }
};

testApi();
