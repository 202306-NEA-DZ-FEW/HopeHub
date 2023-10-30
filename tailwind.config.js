/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                Primary: "#BFDFDC",
                Accent: "#99B4DF",
                NeutralBlack: "#363636",
                NeutralWhite: "#EEEEEE",
                BgWhite: "#F4F4F4",
                Success: "#12CB02",
                Error: "#BD0B0B",
                Dark_Primary: "#607595",
                Dark_Neutral: "#101729",
                Dark_Accent: "#1E3B59",
            },
            fontFamily: {
                poppins: ["Poppins"],
                aclonica: ["Aclonica"],
                opensans: ["Open Sans", "sans-serif"],
            },
        },
    },
    plugins: [require("daisyui")],
};
