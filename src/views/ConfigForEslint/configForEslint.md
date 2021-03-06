## .eslintrc.js

```
    module.exports = {
        root: true,
        parserOptions: {
            parser: 'babel-eslint',
            sourceType: 'module',
            allowImportExportEverywhere: true
        },
        env: {
            browser: true,
            node: true,
            es6: true
        },
        extends: ['eslint:recommended', 'plugin:vue/essential'],
        plugins: [
            'html',
            'vue'
        ],
        'rules': {
            'arrow-spacing': [2, {
                'before': true,
                'after': true
            }],
            'block-spacing': [2, 'always'],
            'brace-style': [2, '1tbs', {
                'allowSingleLine': true
            }],
            'camelcase': [0, {
                'properties': 'always'
            }],
            'comma-dangle': [2, 'never'],
            'comma-spacing': [2, {
                'before': false,
                'after': true
            }],
            'comma-style': [2, 'last'],
            'curly': [2, 'multi-line'],
            'dot-location': [2, 'property'],
            'eol-last': [2, 'always'],
            'eqeqeq': [2, 'always', {
                'null': 'ignore'
            }],
            'generator-star-spacing': [2, {
                'before': true,
                'after': true
            }],
            'handle-callback-err': [2, '^(err|error)$'],
            'indent': ['error', 4, {
                'SwitchCase': 1,
                'VariableDeclarator': 1,
                'MemberExpression': 1
            }],
            'vue/script-indent': ['error', 4, {
                'baseIndent': 0,
                'switchCase': 1
            }],
            'jsx-quotes': [2, 'prefer-single'],
            'key-spacing': [2, {
                'beforeColon': false,
                'afterColon': true
            }],
            'keyword-spacing': [2, {
                'before': true,
                'after': true
            }],
            'new-cap': [2, {
                'newIsCap': true,
                'capIsNew': false
            }],
            'new-parens': 2,
            'no-array-constructor': 2,
            'no-caller': 2,
            'no-class-assign': 2,
            'no-eval': 2,
            'no-extra-parens': [2, 'functions'],
            'no-implied-eval': 2,
            'no-iterator': 2,
            'no-label-var': 2,
            'no-labels': [2, {
                'allowLoop': false,
                'allowSwitch': false
            }],
            'no-lone-blocks': 2,
            'no-mixed-spaces-and-tabs': [2, 'smart-tabs'],
            'no-multi-spaces': [2, {
                'ignoreEOLComments': true
            }],
            'no-multi-str': 2,
            'no-multiple-empty-lines': 2,
            'no-new-require': 2,
            'no-octal-escape': 2,
            'no-path-concat': 2,
            'no-proto': 2,
            'no-return-assign': [2, 'except-parens'],
            'no-self-compare': 2,
            'no-sequences': 2,
            'no-spaced-func': 2,
            'no-throw-literal': 2,
            'no-trailing-spaces': 2,
            'no-undef-init': 2,
            'no-unmodified-loop-condition': 2,
            'no-unused-vars': [2, {
                'vars': 'all',
                'args': 'none'
            }],
            'no-useless-call': 2,
            'no-useless-computed-key': 2,
            'no-useless-constructor': 2,
            'no-whitespace-before-property': 2,
            'one-var': [2, {
                'initialized': 'never'
            }],
            'operator-linebreak': [2, 'after', {
                'overrides': {
                    '?': 'before',
                    ':': 'before'
                }
            }],
            'padded-blocks': [2, 'never'],
            'quotes': [2, 'single', {
                'avoidEscape': true,
                'allowTemplateLiterals': true
            }],
            'semi': [2, 'never'],
            'semi-spacing': [2, {
                'before': false,
                'after': true
            }],
            'space-before-blocks': [2, 'always'],
            'space-before-function-paren': [2, 'never'],
            'space-in-parens': [2, 'never'],
            'space-infix-ops': 2,
            'space-unary-ops': [2, {
                'words': true,
                'nonwords': false
            }],
            'spaced-comment': [2, 'always', {
                'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
            }],
            'template-curly-spacing': [2, 'never'],
            'wrap-iife': [2, 'any'],
            'yoda': [2, 'never'],
            'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
            'object-curly-spacing': [2, 'always', {
                objectsInObjects: false
            }],
            'array-bracket-spacing': [2, 'never']
        }
    }
```
