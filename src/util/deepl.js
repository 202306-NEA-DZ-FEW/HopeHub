import axios from "axios";

// Replace 'yourAuthKey' with your actual DeepL API key
const authKey = "2dabf37e-f0dc-d801-f8b4-91ba376060c9:fx";

async function translateText(text, targetLang) {
    try {
        console.log("Translating text:", text); // Debugging statement

        const response = await axios.post(
            "https://api-free.deepl.com/v2/translate",
            {
                text,
                target_lang: targetLang,
            },
            {
                headers: {
                    Authorization: `DeepL-Auth-Key ${authKey}`,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log("DeepL API response:", response.data); // Debugging statement

        // Extract the translated text from the response
        const translatedText = response.data.translations[0].text;

        console.log("Translated text:", translatedText); // Debugging statement

        return translatedText;
    } catch (error) {
        console.error("Translation error:", error);
        return null;
    }
}

export { translateText };
