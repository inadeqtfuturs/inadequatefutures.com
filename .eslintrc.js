module.exports = {
  'extends': [
    'airbnb',
    'prettier'
  ],
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'jest': true,
    'node': true
  },
  'parserOptions': {
    'ecmaVersion': 2020
  },
  'ignorePatterns': ['src/utils/mdx/plugins'],
  'rules': {
    'jsx-a11y/href-no-hash': ['off'],
    'react/jsx-filename-extension': ['warn', { 'extensions': ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': ['off'],
    'react/no-unescaped-entities': ['error', { 'forbid': ['>', '}'] }],
    'react/forbid-prop-types': ['off'],
    'import/prefer-default-export': ['off'],
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'max-len': [
      'warn',
      {
        'code': 80,
        'tabWidth': 2,
        'comments': 80,
        'ignoreComments': false,
        'ignoreTrailingComments': true,
        'ignoreUrls': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'ignoreRegExpLiterals': true
      }
    ]
  },
  'settings': {
    'import/resolver': {
      alias: {
        map: [
          ['@components', './src/components'],
          ['@context', './src/context'],
          ['@containers', './src/containers'],
          ['@hooks', './src/hooks'],
          ['@lib', './src/lib'],
          ['@mdx', './src/utils/mdx/next-mdx-relations.config.js'],
          ['@stitches', './stitches.config.js'],
          ['@utils', './src/utils'],
        ],
        extensions: ['.js', '.jsx'],
      }
    }
  }
};
