import nextjs from '@next/eslint-plugin-next';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import js from '@eslint/js';

export default [
  { ignores: ['.next/**', 'node_modules/**'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      '@next/next': nextjs,
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      ...nextjs.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-uses-vars': 'error',
      'react/jsx-uses-react': 'error',
    },
  },
];
