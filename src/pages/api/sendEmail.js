// pages/api/sendEmail.js
import fetch from "isomorphic-unfetch";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            // Forward the request to the actual API
            const response = await fetch(
                "https://sendmail-api-docs.vercel.app/api/send",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(req.body),
                }
            );

            // Check if the response is valid JSON
            const contentType = response.headers.get("content-type");
            const responseBody = await response.text(); // Get the response body as text

            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                res.status(response.status).json(data);
            } else {
                console.error(
                    "Error forwarding request: Invalid JSON response"
                );
                console.error("Response body:", responseBody);
                res.status(500).json({ error: "Internal Server Error" });
            }
        } catch (error) {
            console.error("Error forwarding request:", error);

            // Log more details about the error
            console.error("Original error message:", error.message);
            console.error("Original error stack:", error.stack);

            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
