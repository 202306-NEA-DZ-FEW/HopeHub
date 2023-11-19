// module.exports = {
//     presets: [["@babel/preset-env", { targets: { node: "current" } }], "@babel/preset-react"],
// };
// babel.config.js

module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "current",
                },
            },
        ],
        "@babel/preset-react", 
    ],
    plugins: ["@babel/plugin-syntax-jsx"],
};