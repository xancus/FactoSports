import path from 'node:path'
import { fixupConfigRules } from '@eslint/compat'
import { fileURLToPath } from 'node:url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname
})

const config = [
  ...fixupConfigRules(compat.extends('next/core-web-vitals', './node_modules/standard/eslintrc.json')),
  {
    files: ['**/*.{js,mjs,cjs,jsx}']
  },
  {
    rules: {
      'react/prop-types': 0,
      semi: ['error', 'never'],
      'react/react-in-jsx-scope': 0,
      camelcase: 0,
      '@next/next/no-img-element': 'off',
      'no-throw-literal': 'off',
      quotes: ['error', 'single']
    }
  }
]

export default config
