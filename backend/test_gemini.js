require('dotenv').config({ path: './.env' });

(async () => {
    try {
        const key = process.env.GEMINI_API_KEY;
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error(data.error);
        } else {
            console.log("Available Models:", data.models?.map(m => m.name).join(', '));
        }
    } catch (e) {
        console.error(e);
    }
})();
