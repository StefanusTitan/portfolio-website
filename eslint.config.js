import nextjs from '@next/eslint-plugin-next';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': nextjs
    },
    rules: {
      ...nextjs.configs.recommended.rules,
      // Add your custom rules here
    }
  }
];
