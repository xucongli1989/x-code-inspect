# Introduction

This is a package for checking JavaScript projects. You only need to install this package to use detection tools such as ESLint. Most importantly, you don't need to do extra ESLint configuration, just use the built-in default configuration.

# Why use it

-   You don't set up common code checking tools for every project
-   Keep project style the same

# Check Range

-   Only check `./src` and `./*.{js,ts,mjs,cjs}`

# Usage

-   Open your project.

-   Remove the configuration files about `ESLint` and `Prettier` from project, because you no longer need them and this tool will creates them automatically.

-   `npm i --save-dev --save-exact x-code-inspect@latest`

-   And copy these dependencies to `devDependencies`

    ```javascript
        "@typescript-eslint/eslint-plugin": "4.8.2",
        "@typescript-eslint/parser": "4.8.2",
        "babel-eslint": "10.1.0",
        "eslint": "7.14.0",
        "eslint-config-airbnb": "18.2.1",
        "eslint-config-airbnb-typescript": "12.0.0",
        "eslint-plugin-import": "2.22.1",
        "eslint-plugin-jsx-a11y": "6.4.1",
        "eslint-plugin-react": "7.21.5",
        "eslint-plugin-react-hooks": "4.2.0",
        "prettier": "2.2.0",
        "typescript": "4.1.2",
        "x-package-version-strict-check": "1.7.0"
    ```

-   And add a script

    ```javascript
    "check":"x-code-inspect"
    ```

-   `npm i`

-   `npm run check`

# Preview

![](doc/imgs/1.gif)

# Environment

-   Node.js >= 10.13.0

# Built-in Inspectors

### project-basic

-   File `package.json` must include: `script.start`, `script.dist`
-   The project must contains directory: `src`, `dist`, `doc`

### x-package-version-strict-check

-   [Home Page](https://github.com/xucongli1989/x-package-version-strict-check)

### ESLint

-   [Home Page](https://eslint.org/)
-   [VS Code Plug-in](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint#review-details)

**Extra plug-ins:** `react`

### Prettier

-   [Home Page](https://prettier.io/docs/en/index.html)
-   [VS Code Plug-in](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode#review-details)

### Type Check

Via TypeScript

# CLI Options

##### -V, --version

output the version number

##### --debug

Run as debug. (default: false)

##### --path

Project's path that you want to check. (default: "./")

##### --eslint-global

Define global variate, see ESLint's doc. (default: "")

##### -h, --help

output usage information

# Change Log

[CHANGELOG.md](CHANGELOG.md)
