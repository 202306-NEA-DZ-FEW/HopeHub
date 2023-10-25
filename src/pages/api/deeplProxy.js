import axios from "axios";

export default async (req, res) => {
    if (req.method === "POST") {
        const { text, target_lang } = req.body;

        try {
            const response = await axios.post(
                "/api/deeplProxy",
                {
                    text,
                    target_lang,
                },
                {
                    headers: {
                        Authorization:
                            "2dabf37e-f0dc-d801-f8b4-91ba376060c9:fx", // Replace with your API key
                        "Content-Type": "application/json",
                    },
                }
            );

            res.status(response.status).json(response.data);
        } catch (error) {
            res.status(error.response?.status || 500).json(
                error.response?.data || { error: "Unknown error" }
            );
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
};
