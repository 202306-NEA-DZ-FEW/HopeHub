/** @type {import('tailwindcss').Config} */
module.exports = {
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
                Success: "#12CB02",
                Error: "#BD0B0B",
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
