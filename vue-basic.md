### 项目创建
  1. 项目创建
     `yarn create vite my-app --template vue-ts`
  2. Eslint配置 `npx eslint --init`
    ```JS
      module.exports = {
        "env": {
            // 针对哪些环境语法
            "browser": true,
            "es2021": true,
            "node": true
        },
        "extends": [
            // 集成哪些规则
            "eslint:recommended",
            "plugin:vue/vue3-essential",
            "plugin:@typescript-eslint/recommended" // typescript规则
        ],
        "overrides": [
        ],
        "parser": "vue-eslint-parser", // 解析.vue文件
        "parserOptions": {
            "parser": "@typescript-eslint/parser",  // 解析ts文件
            "ecmaVersion": "latest",
            "sourceType": "module"
        },
        "plugins": [
            "vue",
            "@typescript-eslint"
        ],
        "rules": {
        }
    }

    ```
  3. 创建.eslintignore
      ```txt
        node_modules
        dist
        *.css
        *.jpg
        *.jpeg
        *.png
        *.gif
        *.d.ts
      ```
    - 添加脚本`"lint": "eslint --fix --ext .ts,.tsx,.vue src --quiet"`

  4. 配置prettier
      - 安装插件`yarn add prettier eslint-plugin-prettier @vue/eslint-config-prettier -D`
      - .eslintrc中配置prettier配置
        - 1. 添加 "@vue/prettier"继承负责
        - 2. rules中添加prettier规则
           ```TXT
            "prettier/prettier": [
                "error",
                {
                    singleQuote: false, // 使用单引号
                    semi: false, // 末尾添加分号
                    tabWidth: 2,
                    trailingComma: "none",
                    useTabs: false,
                    endOfLine: "auto",
                },
            ],
           ```
