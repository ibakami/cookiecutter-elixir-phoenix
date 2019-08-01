// Some settings automatically inherited from .editorconfig

module.exports = {
  semi: false,
  trailingComma: "all",
  overrides: [
    {
      files: ".editorconfig",
      options: { parser: "yaml" },
    },
    {
      files: "LICENSE",
      options: { parser: "markdown" },
    },
  ],
}
