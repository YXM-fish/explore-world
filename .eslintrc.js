module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
        allowImportExportEverywhere: true  //ignore eslint error: 'import' and 'export' may only appear at the top level
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: ["eslint:recommended", "plugin:vue/essential"],
    // required to lint *.vue files
    plugins: [
        'html',
        'vue'
    ],
    // add your custom rules here
    //it is base on https://github.com/vuejs/eslint-config-vue
    'rules': {
        // 强制箭头函数的箭头前后使用一致的空格
        'arrow-spacing': [2, {
            'before': true,
            'after': true
        }],
        // 强制在代码块中开括号前和闭括号后有空格
        'block-spacing': [2, 'always'],
        // 强制在代码块中使用一致的大括号风格
        'brace-style': [2, '1tbs', {
            'allowSingleLine': true
        }],
        // 强制使用骆驼拼写法命名约定
        'camelcase': [0, {
            'properties': 'always'
        }],
        // 禁止末尾逗号
        'comma-dangle': [2, 'never'],
        // 强制在逗号前后使用一致的空格
        'comma-spacing': [2, {
            'before': false,
            'after': true
        }],
        // 强制使用一致的逗号风格
        'comma-style': [2, 'last'],
        // 强制所有控制语句使用一致的括号风格，允许在单行中省略大括号，而if、else if、else、for、while 和 do，在其他使用中依然会强制使用大括号
        'curly': [2, 'multi-line'],
        // 要求点操作符和属性放在同一行
        'dot-location': [2, 'property'],
        // 要求文件末尾保留一行空行
        'eol-last': [2, 'always'],
        // 要求使用 === 和 !==作相等判断，但不对null使用该规则
        'eqeqeq': [2, 'always', {
            'null': 'ignore'
        }],
        // 强制 generator 函数中 * 号周围使用一致的空格
        'generator-star-spacing': [2, {
            'before': true,
            'after': true
        }],
        // 要求回调函数中有容错处理
        'handle-callback-err': [2, '^(err|error)$'],
        // 强制使用一致的缩进,4个空格
        'indent': ['error', 4, {
            'SwitchCase': 1,         // case 子句将相对于 switch 语句缩进 4 个空格
            'VariableDeclarator': 1, // 多行变量声明将会缩进 4 个空格
            'MemberExpression': 1,   // 多行属性将将缩进 4 个空格
        }],
        "vue/script-indent": ["error", 4, {  // script标签缩进设置
            "baseIndent": 0,
            'switchCase': 1,
        }],
        // 强制所有不包含单引号的 JSX 属性值使用单引号
        'jsx-quotes': [2, 'prefer-single'],
        // 强制在对象字面量的键和值之间使用一致的空格
        'key-spacing': [2, {
            'beforeColon': false,
            'afterColon': true
        }],
        // 强制关键字周围空格的一致性 
        'keyword-spacing': [2, {
            'before': true,
            'after': true
        }],
        // 要求构造函数首字母大写
        'new-cap': [2, {
            'newIsCap': true,
            'capIsNew': false
        }],
        // 要求调用无参构造函数时带括号
        'new-parens': 2,
        // 禁止使用 Array 构造函数
        'no-array-constructor': 2,
        // 禁用 caller 或 callee
        'no-caller': 2,
        // 不允许修改类声明的变量
        'no-class-assign': 2,
        // 禁用 eval()
        'no-eval': 2,
        // 只在 函数表达式周围禁止不必要的圆括号
        'no-extra-parens': [2, 'functions'],
        // 禁用隐式的eval()
        'no-implied-eval': 2,
        // 禁用迭代器
        'no-iterator': 2,
        // 禁用与变量同名的标签
        'no-label-var': 2,
        // 禁用标签语句
        'no-labels': [2, {
            'allowLoop': false,
            'allowSwitch': false
        }],
        // 禁用不必要的嵌套块
        'no-lone-blocks': 2,
        // 禁止使用 空格 和 tab 混合缩进
        'no-mixed-spaces-and-tabs': [2, 'smart-tabs'],
        // 禁止出现多个空格,忽略行尾注释前的多个空格
        'no-multi-spaces': [2, {
            "ignoreEOLComments": true
        }],
        // 禁止多行字符串
        'no-multi-str': 2,
        // 不允许多个空行
        'no-multiple-empty-lines': 2,
        // 不允许 new require
        'no-new-require': 2,
        // 禁止在字符串字面量中使用八进制转义序列
        'no-octal-escape': 2,
        // 当使用 _dirname 和 _filename 时不允许字符串拼接
        'no-path-concat': 2,
        // 禁用__proto__
        'no-proto': 2,
        // 禁止出现赋值语句，除非使用括号把它们括起来
        'no-return-assign': [2, 'except-parens'],
        // 禁止自身比较
        'no-self-compare': 2,
        // 不允许使用逗号操作符
        'no-sequences': 2,
        // 要求或禁止在函数标识符和其调用之间有空格
        'no-spaced-func': 2,
        // 限制可以被抛出的异常 
        'no-throw-literal': 2,
        // 禁用行尾空白
        'no-trailing-spaces': 2,
        // 不允许初始化变量值为 undefined
        'no-undef-init': 2,
        // 禁用一成不变的循环条件
        'no-unmodified-loop-condition': 2,
        // 禁止未使用过的变量 
        'no-unused-vars': [2, {
            'vars': 'all',
            'args': 'none'
        }],
        // 禁用不必要的 .call() 和 .apply()
        'no-useless-call': 2,
        // 禁止在对象中使用不必要的计算属性
        'no-useless-computed-key': 2,
        // 禁用不必要的构造函数
        'no-useless-constructor': 2,
        // 禁止属性前有空白 
        'no-whitespace-before-property': 2,
        // 强制函数中的变量在一起声明或分开声明
        'one-var': [2, {
            'initialized': 'never'
        }],
        // 强制操作符使用一致的换行符风格
        'operator-linebreak': [2, 'after', {
            'overrides': {
                '?': 'before',
                ':': 'before'
            }
        }],
        // 禁止块语句和类的开始或末尾有空行
        'padded-blocks': [2, 'never'],
        // 强制使用一致的反勾号、双引号或单引号
        'quotes': [2, 'single', {
            'avoidEscape': true,
            'allowTemplateLiterals': true
        }],
        // 禁止使用分号代替 ASI
        'semi': [2, 'never'],
        // 强制分号前后有空格
        'semi-spacing': [2, {
            'before': false,
            'after': true
        }],
        // 要求语句块之前的空格
        'space-before-blocks': [2, 'always'],
        // 禁止函数圆括号之前有一个空格
        'space-before-function-paren': [2, 'never'],
        // 禁止圆括号内的空格
        'space-in-parens': [2, 'never'],
        // 要求中缀操作符周围有空格
        'space-infix-ops': 2,
        // 要求或禁止在一元操作符之前或之后存在空格
        'space-unary-ops': [2, {
            'words': true,
            'nonwords': false
        }],
        // 要求或禁止在注释前有空白
        'spaced-comment': [2, 'always', {
            'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
        }],
        // 强制模板字符串中空格的使用
        'template-curly-spacing': [2, 'never'],
        // 需要把立即执行的函数包裹起来
        'wrap-iife': [2, 'any'],
        // 禁止Yoda条件
        'yoda': [2, 'never'],
        // 禁用 debugger
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // 强制在花括号中使用一致的空格
        'object-curly-spacing': [2, 'always', {
            objectsInObjects: false
        }],
        // 禁止在括号内使用空格
        'array-bracket-spacing': [2, 'never']
    }
}