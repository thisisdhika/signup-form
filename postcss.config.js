module.exports = {
  plugins: [
    require("tailwindcss")("./src/tailwind/index.js"),
    require("autoprefixer")({ remove: false }),
    require("postcss-flexbugs-fixes")({}),
    require("postcss-preset-env")({
      autoprefixer: {
        flexbox: "no-2009",
      },
      stage: 3,
      features: {
        "custom-properties": false,
      },
    }),
  ],
};
