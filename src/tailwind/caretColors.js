const plugin = require("tailwindcss/plugin");
const { forIn } = require("lodash");

module.exports = plugin(function ({ addUtilities, theme, e }) {
  const caretColors = {};

  forIn(theme("colors"), (color, key) => {
    if (typeof color === "object") {
      forIn(color, (childColor, childKey) => {
        caretColors[`.${e(`caret-${key}-${childKey}`)}`] = {
          caretColor: childColor,
        };
      });
    } else {
      caretColors[`.${e(`caret-${key}`)}`] = { caretColor: color };
    }
  });

  addUtilities(caretColors, {
    respectPrefix: true,
    respectImportant: true,
  });
});
