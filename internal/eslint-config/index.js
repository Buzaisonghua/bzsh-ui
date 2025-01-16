import { defineFlatConfig  } from 'eslint-define-config'
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";


export default defineFlatConfig ([
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    files: ['*.json', '*.json5', '*.jsonc'],
    parser: 'jsonc-eslint-parser',
  },
  {
    files: ['**/__tests__/**'],
    rules: {
      'no-console': 'off',
      'vue/one-component-per-file': 'off',
    },
  },
  {
    files: ['package.json'],
    parser: 'jsonc-eslint-parser',
    rules: {
      'jsonc/sort-keys': [
        'error',
        {
          pathPattern: '^$',
          order: [
            'name',
            'version',
            'private',
            'packageManager',
            'description',
            'type',
            'keywords',
            'homepage',
            'bugs',
            'license',
            'author',
            'contributors',
            'funding',
            'files',
            'main',
            'module',
            'exports',
            'unpkg',
            'jsdelivr',
            'browser',
            'bin',
            'man',
            'directories',
            'repository',
            'publishConfig',
            'scripts',
            'peerDependencies',
            'peerDependenciesMeta',
            'optionalDependencies',
            'dependencies',
            'devDependencies',
            'engines',
            'config',
            'overrides',
            'pnpm',
            'husky',
            'lint-staged',
            'eslintConfig',
          ],
        },
        {
          pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
          order: { type: 'asc' },
        },
      ],
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
    files: ['*.vue'],
    parser: 'vue-eslint-parser',
    parserOptions: {
      parser: '@typescript-eslint/parser',
      extraFileExtensions: ['.vue'],
      ecmaVersion: 'latest',
      ecmaFeatures: {
        jsx: true,
      },
    },
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { disallowTypeAnnotations: false },
      ],
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
    files: ['*.js', '*.ts'],
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
    },
   },
])