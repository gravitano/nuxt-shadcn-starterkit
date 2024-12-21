import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: true,
  rules: {
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 2,
      },
      multiline: {
        max: 1,
      },
    }],
    'vue/first-attribute-linebreak': ['error', {
      singleline: 'ignore',
      multiline: 'below',
    }],
  }
})
