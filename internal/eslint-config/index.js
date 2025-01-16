import { defineFlatConfig } from 'eslint-define-config'
import globals from 'globals'
import pluginJs from '@eslint/js'
import typescriptEslint from 'typescript-eslint'
import vueEslint from 'eslint-plugin-vue'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
// import unicorn from 'eslint-plugin-unicorn'
// import importEslit from 'eslint-plugin-import'

export default defineFlatConfig([
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...typescriptEslint.configs.recommended,
  ...vueEslint.configs['flat/recommended'],
  // unicorn,
  // ...importEslit,
  {
    files: ['**/__tests__/**'],
    rules: {
      'no-console': 'off',
      'vue/one-component-per-file': 'off',
    },
  },
  {
    files: ['*.d.ts'],
    rules: {
      'import/no-duplicates': 'off',
    },
  },
  {
    files: ['*.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  {
    files: ['**/*.md/*.js', '**/*.md/*.ts'],
    rules: {
      'no-console': 'off',
      'import/no-unresolved': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    files: ['*.js', '*.ts', '*.vue'],
    rules: {
      /** 驼峰命名 */
      camelcase: ['error', { properties: 'never' }],
      /** 禁止在代码中使用 console */
      'no-console': ['warn', { allow: ['error'] }],
      /** 禁止使用 debugger 语句 */
      'no-debugger': 'warn',
      /** 禁止在条件语句中使用常量条件，例如 if (true) 或 while (false)。 */
      'no-constant-condition': ['error', { checkLoops: false }],

      'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
      /** 禁止在 async 函数中直接返回 await 的结果 */
      'no-return-await': 'error',
      /** 禁止使用 var 声明变量 */
      'no-var': 'error',
      /** 禁止使用空的 catch 语句块。*/
      'no-empty': ['error', { allowEmptyCatch: true }],
      /** 强制使用 const 来声明不被重新赋值的变量 */
      'prefer-const': [
        'warn',
        { destructuring: 'all', ignoreReadBeforeAssign: true },
      ],
      /** 强制使用箭头函数，而不是传统的函数表达式，尤其是在回调函数中。 */
      'prefer-arrow-callback': [
        'error',
        { allowNamedFunctions: false, allowUnboundThis: true },
      ],
      'no-redeclare': 'error',

      // best-practice
      /** 当使用数组方法（如 forEach、map、filter 等）时，必须确保回调函数有返回值。 */
      'array-callback-return': 'error',
      /** 要求所有变量声明（如 let、const）只在块级作用域内使用。 */
      'block-scoped-var': 'error',
      /** 禁止使用 alert、confirm 和 prompt 等浏览器弹窗 */
      'no-alert': 'warn',
      /**禁止在 switch 语句中的 case 语句块内声明变量（不加花括号时）。 */
      'no-case-declarations': 'error',
      /** 禁止在字符串中使用换行符（即通过 + 拼接的多行字符串）。 */
      'no-multi-str': 'error',
      /** 禁止使用 with 语句。 */
      'no-with': 'error',
      /**禁止使用 void 操作符。 */
      'no-void': 'error',
      /** 要求按照一定的规则对 import 语句进行排序。 */
      'sort-imports': [
        'warn',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: false,
        },
      ],

      // ts
      /** 重复声明 */
      '@typescript-eslint/no-redeclare': 'error',
      /** 使用any */
      '@typescript-eslint/no-explicit-any': 'warn',
      /** 函数没有显式指定返回值 */
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      /** 使用非空断言 */
      '@typescript-eslint/no-non-null-assertion': 'off',
      /** 禁止在可选链（?.）后使用非空断言（!） */
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      /** 使用 @ts-ignore 注释 */
      '@typescript-eslint/ban-ts-comment': ['off', { 'ts-ignore': false }],
      /** 使用 require() 来导入模块 */
      '@typescript-eslint/no-require-imports': 'off',
      /** 出现未使用的表达式 10+20 */
      '@typescript-eslint/no-unused-expressions': 'off',

      // vue
      /** 使用v-html */
      'vue/no-v-html': 'error',
      'vue/require-default-prop': 'off',
      /** 组件必须多个单词 */
      'vue/require-explicit-emits': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/prefer-import-from-vue': 'off',
      'vue/no-v-text-v-html-on-component': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],

      // prettier
      'prettier/prettier': 'error',
    },
  },
  prettierRecommended,
])
