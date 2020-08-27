const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addBase, theme, config }) {
  const isDark = theme("screens.isDark.raw");

  addBase({
    html: {
      fontFamily: config("theme.fontFamily.poppins"),
    },
    body: {
      backgroundColor: config("theme.colors.white"),
      color: config("theme.colors.black"),
      [`@media ${isDark}`]: {
        backgroundColor: config("theme.colors.black"),
        color: config("theme.colors.white"),
      },
    },
    h1: {
      fontSize: config("theme.fontSize.4xl"),
      lineHieght: config("theme.lineHeight.tight"),
      marginBottom: config("theme.spacing.3"),
    },
    h2: {
      fontSize: config("theme.fontSize.3xl"),
      lineHieght: config("theme.lineHeight.tight"),
      marginBottom: config("theme.spacing.2"),
    },
    h3: {
      fontSize: config("theme.fontSize.2xl"),
      lineHieght: config("theme.lineHeight.tight"),
      marginBottom: config("theme.spacing.1"),
    },
    p: {
      display: "block",
      marginBottom: config("theme.spacing.1"),
      lineHeight: 1.7,
    },
  });
});
