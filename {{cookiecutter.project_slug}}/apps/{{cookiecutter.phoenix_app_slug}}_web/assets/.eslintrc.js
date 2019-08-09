module.exports = {
  plugins: [
    "@typescript-eslint",
    "eslint-comments",
    "jest",
    "promise",
    "unicorn",
    "react",
    "react-hooks",
  ],
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:jest/recommended",
    "plugin:react/recommended",
    "plugin:promise/recommended",
    "plugin:unicorn/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
  ],
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  globals: {
    location: "readonly",
  },
  rules: {
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    "no-prototype-builtins": "off",
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    "react/destructuring-assignment": "off",
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
    "jsx-a11y/label-has-for": [
      "error",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
      },
    ],
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    "react/prop-types": 0,
    radix: 0,
    // we don't need to return or catch promises for our usage
    // see more here: https://gist.github.com/mwickett/2aecfdeea40daa07d39e11922ae1fe20#gistcomment-2153642
    "promise/always-return": 0,
    "promise/catch-or-return": 0,
    "unicorn/prevent-abbreviations": 0,
    "import/no-cycle": 0, // This option acts weird when using resolvers
    // "react-hooks/exhaustive-deps": "warn", // idk, this rule is highly unstable
    "react-hooks/rules-of-hooks": "error",
  },
  overrides: [
    {
      files: ["*.test.ts", "*.test.tsx"],
    },
  ],
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    "import/resolver": "webpack",
  },
}
