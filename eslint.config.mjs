import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    rules: {
      indent: ['warn', 2],
      quotes: ['error', 'single'],
      'jsx-quotes': ['error', 'prefer-double'],
    },
  },
]

export default eslintConfig
