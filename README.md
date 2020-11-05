# Introduction

This is a package for checking JavaScript projects. You only need to install this package to use detection tools such as ESLint. Most importantly, you don't need to do extra ESLint configuration, just use the built-in default configuration.

# Purpose

-  Zero configuration
-  Keep project style the same
-  You don't have to worry about the details, just look at the final report

# Environment

- Node.js >= 10.13.0

#  Plug-ins

### project-basic

- File package.json must include: `script.start`,`script.build`
- The project must contains directory: `src`,`dist`,`doc`

### x-package-version-strict-check

- [Home Page](https://github.com/xucongli1989/x-package-version-strict-check)

### ESLint

- [Home Page](https://eslint.org/)
- [VS Code Plug-in](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint#review-details)
- [Rules in used](src/config/eslint_light.json)

**Extra plug-ins:**  `react`, `jsdoc`

### Prettier

- [Home Page]( https://prettier.io/docs/en/index.html )
- [VS Code Plug-in]( https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode#review-details )

# CLI Options

```
  -V, --version              output the version number
  --debug                    Run as debug. (default: false)
  --path <type>              Project's path that you want to check. (default: "./")
  --project-name <type>      Name of project. (default: "")
  --out <type>               Report output path. (default: "./out")
  --disable-out              No report information is exported to output path. (default: false)
  --root-url <type>          Root url of http access. (default: "")
  --detail-url <type>        Detail url link of the process. (default: "")
  --check-dir <type>         Specify a directory to be scanned by code (e.g. by plug-ins such as eslint), the default is root value of --path. (multiple are separated by ,). (default: "")
  --ignore-check-dir <type>  Specify a directory to be no scanned by code (e.g. by plug-ins such as eslint), (multiple are separated by ,). (default: "")
  --ignore-plugin <type>     Ignored plugin name list (multiple are separated by ,), all plugins are [project-basic, x-package-version-strict-check, eslint, prettier]. (default: "prettier")
  --enable-plugin <type>     Enable plugin name list (multiple are separated by ,), all plugins are [project-basic, x-package-version-strict-check, eslint, prettier]. (default: "")
  --eslint-global <type>     Define global variate, see eslint doc. (default: "")
  --eslint-env <type>        The environment in which the code to be checked is running, see eslint doc. (default: "amd,browser,commonjs,commonjs,es6,node")
  -h, --help                 output usage information
```

# Sample

- Open your project.

- Remove the configuration files about `eslint` and `prettier` from project, because you no longer need them and this tool will creates them automatically.

- `npm i --save-dev --save-exact x-code-inspect@latest`

- Add a script in `package.json`

  ```bash
  "check":"x-code-inspect --disable-out"
  ```

- `npm run check`

# Change Log

[CHANGELOG.md](CHANGELOG.md)

