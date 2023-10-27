import { Translate } from "@google-cloud/translate";

// Initialize the Google Cloud Translation client with the API key from the environment variable
const translate = new Translate({
    credentials: { private_key: process.env.GOOGLE_TRANSLATE_API_KEY },
});

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { text, targetLang } = req.body;

        try {
            // Translate the text
            const [translation] = await translate.translate(text, targetLang);
            res.status(200).json({ translation });
        } catch (error) {
            console.error("Translation error:", error);
            res.status(500).json({ error: "Translation error" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
