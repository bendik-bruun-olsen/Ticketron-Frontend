import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import pluginReact from 'eslint-plugin-react'

export default {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
        globals: globals.browser,
        parser: '@typescript-eslint/parser',
    },
    plugins: ['@typescript-eslint', 'react'],
    extends: [
        // 'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'eslint:recommended',
    ],
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'error',
    },
}
