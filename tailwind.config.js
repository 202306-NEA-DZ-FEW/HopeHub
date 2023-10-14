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
        MintGreen: '#BFDFDC',
        PowderBlue: '#99B4DF',
        JetBlack: '#363636',
        AntiFlashWhite: '#EEEEEE',
        LimeGreen: '#12CB02',
        EngineeringOrange: '#BD0B0B',
      },
      fontFamily: {
        
        opensans: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [
    require("daisyui")
  ],
}

