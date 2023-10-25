// proxy.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001; // Set the port you want to use

app.use(express.json());

// Define a route that proxies requests to the DeepL API
app.post('/api/deeplProxy', async (req, res) => {
    const { text, target_lang } = req.body;

    try {
        const response = await axios.post(
            'api/deeplProxy',
            {
                text,
                target_lang,
            },
            {
                headers: {
                    'Authorization': '2dabf37e-f0dc-d801-f8b4-91ba376060c9:fx', // Replace with your DeepL API key
                    'Content-Type': 'application/json',
                },
            }
        );

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { error: 'Unknown error' });
    }
});

app.listen(port, () => {
    console.log(`Proxy server is running on port ${port}`);
});
