module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "@vue/prettier",
    "./.eslintrc-auto-import.json"
  ],
  overrides: [],
  parser: "vue-eslint-parser", // 解析.vue文件
  parserOptions: {
    parser: "@typescript-eslint/parser", // 解析.ts文件
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "prettier/prettier": [
      // 添加prettier规则
      "error",
      {
        singleQuote: false, // 使用单引号
        semi: false, // 末尾添加分号
        tabWidth: 2,
        printWidth: 80,
        trailingComma: "none",
        useTabs: false,
        endOfLine: "auto"
      }
    ]
  }
}
