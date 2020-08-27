const purge = require("./purge");
const theme = require("./theme");
const variants = require("./variants");
const plugins = require("./plugins");

module.exports = {
  purge,
  theme,
  variants,
  plugins,
  target: "relaxed",
  prefix: "",
  important: false,
  separator: ":",
  corePlugins: {
    preflight: true,
  },
};
