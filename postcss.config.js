export default {
  plugins: {
    tailwindcss: { config: "./tailwindcss-config.js" },
    plugins: [require("tailwindcss"), require("autoprefixer")],
    autoprefixer: {},
  },
};
