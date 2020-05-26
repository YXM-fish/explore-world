## settings.json
```
{
    "editor.tabSize": 4,
    "editor.detectIndentation": false,
    "files.autoSave": "onWindowChange",

    "editor.fontSize": 16,
    "editor.autoClosingBrackets": "always",
    "editor.autoClosingQuotes": "beforeWhitespace",
    "editor.codeActionsOnSave": null,
    "editor.padding.bottom": 30,
    "editor.padding.top": 30,
    "editor.showFoldingControls": "mouseover",

    "workbench.preferredLightColorTheme": "One Monokai",
    "workbench.colorTheme": "One Monokai",
    "workbench.preferredDarkColorTheme": "One Monokai",
    "workbench.editor.highlightModifiedTabs": true,
    "window.autoDetectHighContrast": false,
    "explorer.sortOrder": "type",
    "extensions.closeExtensionDetailsOnViewChange": true,
    "terminal.integrated.cursorBlinking": true,
    "terminal.integrated.copyOnSelection": true,
    "terminal.integrated.cursorStyle": "line",
    "terminal.integrated.cursorWidth": 2,
    "breadcrumbs.enabled": true,

    "eslint.format.enable": true,
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true,
    "editor.formatOnType": true,

    "eslint.probe": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact",
        "html",
        "vue",
        "markdown"
    ],
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact",
        "html",
        "vue",
        "markdown"
    ],

    "[javascript]": {
        "editor.defaultFormatter": "dbaeumer.vscode-eslint"
    },
    "[json]": {
        "editor.defaultFormatter": "dbaeumer.vscode-eslint"
    },
    "[vue]": {
        "editor.defaultFormatter": "octref.vetur"
    },

    "vetur.completion.autoImport": true,
    "vetur.format.defaultFormatter.html": "prettyhtml",
    "vetur.format.defaultFormatter.css": "prettier",
    "vetur.format.defaultFormatter.postcss": "prettier",
    "vetur.format.defaultFormatter.scss": "prettier",
    "vetur.format.defaultFormatter.less": "prettier",
    "vetur.format.defaultFormatter.stylus": "stylus-supremacy",
    "vetur.format.defaultFormatter.js": "prettier",
    "vetur.format.defaultFormatter.ts": "prettier",
    "vetur.format.defaultFormatter.sass": "sass-formatter",
    "vetur.format.options.tabSize": 4,
    "vetur.format.options.useTabs": false,
    "vetur.format.defaultFormatterOptions": {
        "prettier": {
            "semi": false,
            "useTabs": false,
            "singleQuote": true,
            "tabWidth": 4,
            "vueIndentScriptAndStyle": true,
            "bracketSpacing": true,
            "arrowParens": "avoid",
            "trailingComma": "none"
        },
        "prettyhtml": {
            "wrapAttributes": false,
            "usePrettier": true,
            "tabWidth": 4,
            "useTabs": false,
            "printWidth": 200, 
            "singleQuote": false
        },
        
        "sass.format.debug": false,
        "sass.format.deleteEmptyRows": true,
        "sass.format.deleteWhitespace": true,
        "sass.format.convert": true,
        "sass.format.setPropertySpace": true
    },

    "prettier.useTabs": false,
    "prettier.singleQuote": true,
    "prettier.semi": false,
    "prettier.tabWidth": 4,
    "prettier.vueIndentScriptAndStyle": true,
    "prettier.bracketSpacing": true,
    "prettier.arrowParens": "avoid",
    "prettier.trailingComma": "none"
}
```
