import js from '@eslint/js';
import globals from 'globals';

/** Keep scope tiny: handwritten Node only (skip bundled/minified theme JS). */
export default [
  js.configs.recommended,
  {
    files: ['themes/attila/scripts/**/*.js', 'themes/attila/Gruntfile.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        hexo: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
      'prefer-const': 'error',
    },
  },
];
