### 项目创建

1. 项目创建, 完成项目创建
   `yarn create vite my-app --template vue-ts`

2. 手动安装 Eslint 配置 `npx eslint --init`

   > 开发项目时需要安装 vscode 插件 Volar，并且需要关闭 Vue2 的插件 Vetur
   >
   > 1. 校验语法并提示错误的行数
   > 2. 采用 js-modules
   > 3. 采用 vue 语法
   > 4. 项目使用 ts -- 选择 Yes
   > 5. 项目运行环境 -- 浏览器、node 都勾选
   >    为什么勾选 node 环境? 因为后面写单元测试肯定是运行在 node 环境中的
   > 6. 配置文件采用 js -- js 可以写一些注释更方便，也可以选择 yml
   > 7. 拒绝默认安装 -- 选择 YES。 安装采用的 pnpm 的方式

   ```JS
     module.exports = {
       "env": {
           // 针对哪些环境语法
           "browser": true,
           "es2021": true,
           "node": true
       },
       "extends": [
           // 集成了哪些规则，别人写好的规则直接拿来用
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
       "plugins": ["vue","@typescript-eslint"],
       "rules": {
        // 我们自己指定的规则
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

   - vscode 安装 eslint 插件， eslint 只是检查代码规范
   - package.json 中添加脚本`"lint": "eslint --fix --ext .ts,.tsx,.vue src --quiet"`

4. 配置 prettier
   > eslint 中集成 prettier 配置
   - 安装插件`yarn add prettier eslint-plugin-prettier @vue/eslint-config-prettier -D`
   - .eslintrc 中配置 prettier 配置
     - 1. eslint 中 extends 中添加 "@vue/prettier"继承负责
     - 2. rules 中添加 prettier 规则
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
   - Prettier 只是用来格式化代码。这里需要新建.prettierrc.js 文件，此文件为了让 Prettier
     插件能够识别用户配置，配置需与.eslintrc.js 中保持一致
   - 安装 Prettier 插件，设置 Default Formatter 选择 Prettier - Code formatter；并配
     置 Format On Save 为启用，保存时自动格式化
5. 安装 husky
   > 实际项目中，代码格式化一般是配合 git hook 使用；实现提交代码前，先进行校验
   ```
    git init # git仓库初始化
    pnpm install husky -D # 安装husky包
    npm set-script prepare "husky install" # 设置prepare命令脚本
    pnpm prepare # 执行prepare命令
    npx husky add .husky/pre-commit "pnpm lint" # 添加提交钩子
   ```
6. commitlint 提交规范信息
   - 安装依赖 pnpm install @commitlint/cli @commitlint/config-conventional -D
   - 添加钩子 npx husky add .husky/commit-msg 'npx --no-install commitlint --edit
     `echo "\$1"`'
   - commitlint 配置
     ```JS
        module.exports = {
          extends: ["@commitlint/config-conventional"],
          };
     ```
7. 安装 pnpm install vue-router

```JS
   import { createRouter, createWebHistory } from "vue-router"
   export default createRouter({
    history: createWebHistory()
    routes: [
      {
        path: '/home',
        component: () => import("@/views/Home.vue")
      },
      {
        path: '/about',
        component: () => import("@/views/About.vue")
      }
    ]
   })

  //  main中引入router
  import router from "@/router/index"
  createApp(App).use(router).mount("#app")

  // appVue中引入
  <router-link to="/home">Home</router-link>
  <router-link to="/about">About</router-link>
  <router-view></router-view>

  // 设置vite别名
   import path from "path"
   import {defineConfig} from "vite"
   import vue from "@vitejs/plugin-vue"
   export default defineConfig({
    resolve: {
      alias: {
        find: "@",
        replacement: path.resolve(__dirname, "src")
      }
    },
    plugins: [vue()]
   })
  //  这里如果报 path 模块类型错误 可以 pnpm install @types/node -D 增加类型提示

  // tsconfig配置
  {
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@/*": ["src/*"]
      }
    },

  }
```

8. pinia 集成 pnpm install pinia`

```JS
   import {defineStore} from "pinia"
   import {ref} from "vue"
   export default defineStore("counter", () => {
      const count = ref(0)
      const increment = () => {
          count.value++
      }
      return {
        count, increment
      }
   })
```

9. 页面整体布局是一个产品最外层的框架结构，往往会包含导航、侧边栏、面包屑以及内
   容等。
