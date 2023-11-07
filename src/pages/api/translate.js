import { Translate } from "@google-cloud/translate";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { text, targetLanguage } = req.body;
            const translate = new Translate();

            const [translation] = await translate.translate(
                text,
                targetLanguage
            );
            res.status(200).json({ translation });
        } catch (error) {
            console.error("Error translating text:", error);
            res.status(500).json({ error: "Translation error" });
        }
    } else {
        res.status(405).end(); // Method not allowed
    }
}
