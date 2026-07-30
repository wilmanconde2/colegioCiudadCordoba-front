import js from '@eslint/js'
import globals from 'globals'
import eslintReact from '@eslint-react/eslint-plugin'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  {
    ignores: [
      'dist',
      '.netlify',
      'node_modules',
    ],
  },

  {
    files: ['**/*.{js,jsx}'],

    languageOptions: {
      ecmaVersion: 'latest',

      globals: {
        ...globals.browser,
      },

      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
    },

    plugins: {
      '@eslint-react': eslintReact,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    rules: {
      /*
       * JavaScript
       */
      ...js.configs.recommended.rules,

      /*
       * React
       *
       * Replaces the legacy:
       * eslint-plugin-react
       *
       * with:
       * @eslint-react/eslint-plugin
       */
      ...eslintReact.configs.recommended.rules,

      /*
       * React Hooks
       */
      ...reactHooks.configs.flat.recommended.rules,

      /*
       * Vite / React Fast Refresh
       */
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],
    },
  },

  /*
   * Netlify Functions run in Node.js, not the browser.
   */
  {
    files: ['netlify/functions/**/*.js'],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
]