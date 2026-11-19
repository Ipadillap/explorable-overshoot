import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
    {
        files: ['src/chapters/**/*.{ts,tsx}', 'src/narrative/**/*.{ts,tsx}', 'src/app/**/*.{ts,tsx}', 'src/dev/**/*.{ts,tsx}'],
        rules: {
            'no-restricted-imports': ['error', {
                patterns: [{
                    group: [
                        '**/simulation/ui/**',
                        '**/simulation/domain/**',
                        '**/simulation/application/**',
                        '**/simulation/rendering/**',
                    ],
                    message: 'Importa la simulación solo desde simulation/index.ts',
                }],
            }],
        },
    },
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
