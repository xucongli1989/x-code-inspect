/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 63:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// CONCATENATED MODULE: external "path"
const external_path_namespaceObject = require("path");;
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_namespaceObject);
// CONCATENATED MODULE: external "fs"
const external_fs_namespaceObject = require("fs");;
var external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_namespaceObject);
// CONCATENATED MODULE: external "commander"
const external_commander_namespaceObject = require("commander");;
var external_commander_default = /*#__PURE__*/__webpack_require__.n(external_commander_namespaceObject);
// CONCATENATED MODULE: external "events"
const external_events_namespaceObject = require("events");;
// CONCATENATED MODULE: external "caller-path"
const external_caller_path_namespaceObject = require("caller-path");;
var external_caller_path_default = /*#__PURE__*/__webpack_require__.n(external_caller_path_namespaceObject);
// CONCATENATED MODULE: external "cfonts"
const external_cfonts_namespaceObject = require("cfonts");;
var external_cfonts_default = /*#__PURE__*/__webpack_require__.n(external_cfonts_namespaceObject);
// CONCATENATED MODULE: external "as-table"
const external_as_table_namespaceObject = require("as-table");;
var external_as_table_default = /*#__PURE__*/__webpack_require__.n(external_as_table_namespaceObject);
// CONCATENATED MODULE: external "x-js-kit"
const external_x_js_kit_namespaceObject = require("x-js-kit");;
var external_x_js_kit_default = /*#__PURE__*/__webpack_require__.n(external_x_js_kit_namespaceObject);
// CONCATENATED MODULE: external "update-notifier"
const external_update_notifier_namespaceObject = require("update-notifier");;
var external_update_notifier_default = /*#__PURE__*/__webpack_require__.n(external_update_notifier_namespaceObject);
// CONCATENATED MODULE: external "shelljs"
const external_shelljs_namespaceObject = require("shelljs");;
var external_shelljs_default = /*#__PURE__*/__webpack_require__.n(external_shelljs_namespaceObject);
// CONCATENATED MODULE: ./src/type.ts
/**
 * 插件类型
 */

/**
 * 插件选项类型
 */

/**
 * CLI选项类型
 */

/**
 * 检查结果
 */

/**
 * 主程序类型
 */

/**
 * 错误类型枚举
 */
var CheckerMessageTypeEnum;
/**
 * 主程序事件名称枚举
 */

(function (CheckerMessageTypeEnum) {
  CheckerMessageTypeEnum["INFO"] = "INFO";
  CheckerMessageTypeEnum["ERROR"] = "ERROR";
  CheckerMessageTypeEnum["WARN"] = "WARN";
})(CheckerMessageTypeEnum || (CheckerMessageTypeEnum = {}));

var CheckerEventNameEnum;
/**
 * 待检查的代码所运行的环境枚举
 */

(function (CheckerEventNameEnum) {
  CheckerEventNameEnum["START"] = "START";
  CheckerEventNameEnum["ITEM_START"] = "ITEM_START";
  CheckerEventNameEnum["END"] = "END";
  CheckerEventNameEnum["RESULT"] = "RESULT";
  CheckerEventNameEnum["ITEM_END"] = "ITEM_END";
  CheckerEventNameEnum["IGNORED"] = "IGNORED";
})(CheckerEventNameEnum || (CheckerEventNameEnum = {}));

var EnvEnum;

(function (EnvEnum) {
  EnvEnum["BROWSER"] = "BROWSER";
  EnvEnum["NODE"] = "NODE";
  EnvEnum["ES6"] = "ES6";
  EnvEnum["AMD"] = "AMD";
  EnvEnum["COMMONJS"] = "COMMONJS";
})(EnvEnum || (EnvEnum = {}));
// CONCATENATED MODULE: ./src/log.ts
__webpack_require__(884).nice;

var log = __webpack_require__(105).configure({
  tag: true,
  locate: false
});

function redStyle(str) {
  return str.dim.red;
}
function greenStyle(str) {
  return str.dim.green;
}
function info() {
  log.info.apply(log, arguments);
}
function warn() {
  log.warn.apply(log, arguments);
}
function error() {
  log.error.apply(log, arguments);
}
// CONCATENATED MODULE: ./src/plugins/package-version/index.ts
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Plugin = /*#__PURE__*/function () {
  function Plugin() {
    _classCallCheck(this, Plugin);

    _defineProperty(this, "name", "x-package-version-strict-check");

    _defineProperty(this, "aliasName", "Package Version Checker");

    _defineProperty(this, "result", {
      title: this.aliasName,
      msgCount: 0,
      msgType: CheckerMessageTypeEnum.INFO
    });
  }

  _createClass(Plugin, [{
    key: "run",
    value: function run(options) {
      var cmd = "cd ".concat(options.commandArgs.codePath, " && x-package-version-strict-check");
      info("Executing command: ", cmd);
      var outStr = external_shelljs_default().exec(cmd, {
        silent: true
      }).stdout;

      if (!outStr.includes("everything is ok")) {
        this.result.msgType = CheckerMessageTypeEnum.ERROR;
        this.result.msgCount = 1;
        error(outStr);
      }

      if (this.isSuccess) {
        info("OK!");
      }
    }
  }, {
    key: "isSuccess",
    get: function get() {
      return this.result.msgType != CheckerMessageTypeEnum.ERROR;
    }
  }]);

  return Plugin;
}();

/* harmony default export */ const package_version = (new Plugin());
// CONCATENATED MODULE: ./src/plugins/eslint/index.ts
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { eslint_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function eslint_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function eslint_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function eslint_createClass(Constructor, protoProps, staticProps) { if (protoProps) eslint_defineProperties(Constructor.prototype, protoProps); if (staticProps) eslint_defineProperties(Constructor, staticProps); return Constructor; }

function eslint_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var eslint_Plugin = /*#__PURE__*/function () {
  function Plugin() {
    eslint_classCallCheck(this, Plugin);

    eslint_defineProperty(this, "name", "eslint");

    eslint_defineProperty(this, "aliasName", "Code Standard Checker");

    eslint_defineProperty(this, "result", {
      title: this.aliasName,
      msgCount: 0,
      msgType: CheckerMessageTypeEnum.INFO
    });
  }

  eslint_createClass(Plugin, [{
    key: "run",
    value: function run(options) {
      //项目中已有的配置文件
      var projectConfigPath = external_path_default().resolve(options.commandArgs.codePath, ".eslintrc.json");
      var projectIgnoreConfigPath = external_path_default().resolve(options.commandArgs.codePath, ".eslintignore"); //清空项目中的已有配置文件

      info("Clear project's config file about ESLint!");
      external_fs_default().writeFileSync(projectConfigPath, "");
      external_fs_default().writeFileSync(projectIgnoreConfigPath, ""); //默认的eslint配置文件

      var configPath = external_path_default().resolve(options.commandArgs.packagePath, "dist/config/.eslintrc.json");
      var ignoreConfigPath = external_path_default().resolve(options.commandArgs.packagePath, "dist/config/.eslintignore");
      var configObject = JSON.parse(external_fs_default().readFileSync(configPath).toString());
      var ignoreConfig = external_fs_default().readFileSync(ignoreConfigPath).toString() + "\n"; //生成配置文件（eslintignore）

      var ignorePathSet = new Set();

      if (options.commandArgs.checkDir) {
        ignorePathSet.add("/*"); //先要排除所有

        options.commandArgs.checkDir.split(',').forEach(function (x) {
          ignorePathSet.add("!/".concat(x)); //基于上面排除的范围内，再剔除
        });
      }

      if (options.commandArgs.ignoreCheckDir) {
        options.commandArgs.ignoreCheckDir.split(',').forEach(function (x) {
          ignorePathSet.add(x);
        });
      }

      var ignoreConfigStr = ignoreConfig + _toConsumableArray(ignorePathSet).map(function (x) {
        return "".concat(x, "\n");
      }).join('');

      external_fs_default().writeFileSync(projectIgnoreConfigPath, ignoreConfigStr);
      info("Updated file: ", projectIgnoreConfigPath, ignoreConfigStr); //生成配置文件（eslintrc.json）

      var eslintConfig = _objectSpread({}, configObject);

      if (options.commandArgs.eslint_global) {
        options.commandArgs.eslint_global.split(',').forEach(function (k) {
          eslintConfig.globals[k] = false;
        });
      }

      if (options.commandArgs.eslint_env) {
        options.commandArgs.eslint_env.split(',').forEach(function (k) {
          eslintConfig.env[k] = true;
        });
      }

      if (options.commandArgs.isDebug) {
        info(eslintConfig);
      }

      var eslintConfigStr = JSON.stringify(eslintConfig, null, 2);
      external_fs_default().writeFileSync(projectConfigPath, eslintConfigStr);
      info("Updated file: ", projectConfigPath); //开始运行检查

      var checkCmd = "cd ".concat(options.commandArgs.codePath, " && eslint ").concat(options.commandArgs.codePath, " --no-eslintrc -c ").concat(projectConfigPath, " --ignore-path ").concat(projectIgnoreConfigPath, "  --resolve-plugins-relative-to ").concat(options.commandArgs.packagePath, " --max-warnings 0 ");
      info("Executing command: ", checkCmd);
      var execResult = external_shelljs_default().exec(checkCmd, {
        silent: true
      });
      var outStr = execResult.stdout;

      if (execResult.code != 0) {
        error("Run eslint error, exit code :", execResult.code);
      }

      if (outStr) {
        this.result.msgType = CheckerMessageTypeEnum.ERROR;
        this.result.msgCount = 1;
        var matchList = /(\d+)\s+problems/.exec(outStr);

        if (matchList && matchList.length && matchList[1]) {
          this.result.msgCount = external_x_js_kit_default().common.convert.toInt(matchList[1]);
        }

        error(outStr);
        return;
      }

      if (this.isSuccess) {
        info("OK!");
      }
    }
  }, {
    key: "isSuccess",
    get: function get() {
      return this.result.msgType != CheckerMessageTypeEnum.ERROR;
    }
  }]);

  return Plugin;
}();

/* harmony default export */ const eslint = (new eslint_Plugin());
// CONCATENATED MODULE: ./src/plugins/prettier/index.ts
function prettier_toConsumableArray(arr) { return prettier_arrayWithoutHoles(arr) || prettier_iterableToArray(arr) || prettier_unsupportedIterableToArray(arr) || prettier_nonIterableSpread(); }

function prettier_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function prettier_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return prettier_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return prettier_arrayLikeToArray(o, minLen); }

function prettier_iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function prettier_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return prettier_arrayLikeToArray(arr); }

function prettier_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function prettier_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function prettier_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function prettier_createClass(Constructor, protoProps, staticProps) { if (protoProps) prettier_defineProperties(Constructor.prototype, protoProps); if (staticProps) prettier_defineProperties(Constructor, staticProps); return Constructor; }

function prettier_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var prettier_Plugin = /*#__PURE__*/function () {
  function Plugin() {
    prettier_classCallCheck(this, Plugin);

    prettier_defineProperty(this, "name", "prettier");

    prettier_defineProperty(this, "aliasName", "Code Format Checker");

    prettier_defineProperty(this, "result", {
      title: this.aliasName,
      msgCount: 0,
      msgType: CheckerMessageTypeEnum.INFO
    });
  }

  prettier_createClass(Plugin, [{
    key: "run",
    value: function run(options) {
      //项目中已有的配置文件
      var projectConfigPath = external_path_default().resolve(options.commandArgs.codePath, ".prettierrc.json");
      var projectIgnoreConfigPath = external_path_default().resolve(options.commandArgs.codePath, ".prettierignore"); //清空项目中的已有配置文件

      info("Clear project's config file about Prettier!");
      external_fs_default().writeFileSync(projectConfigPath, "");
      external_fs_default().writeFileSync(projectIgnoreConfigPath, ""); //默认配置

      var configPath = external_path_default().resolve(options.commandArgs.packagePath, "dist/config/.prettierrc.json");
      var ignoreConfigPath = external_path_default().resolve(options.commandArgs.packagePath, "dist/config/.prettierignore");
      var configObject = JSON.parse(external_fs_default().readFileSync(configPath).toString());
      var ignoreConfig = external_fs_default().readFileSync(ignoreConfigPath).toString() + "\n"; //组装cmd脚本命令

      var ignorePathSet = new Set();

      if (options.commandArgs.checkDir) {
        ignorePathSet.add("/*"); //先要排除所有

        options.commandArgs.checkDir.split(',').forEach(function (x) {
          ignorePathSet.add("!/".concat(x)); //基于上面排除的范围内，再剔除
        });
      }

      if (options.commandArgs.ignoreCheckDir) {
        options.commandArgs.ignoreCheckDir.split(',').forEach(function (x) {
          ignorePathSet.add(x);
        });
      } //生成配置文件（prettierignore）


      var ignoreConfigStr = ignoreConfig + prettier_toConsumableArray(ignorePathSet).map(function (x) {
        return "".concat(x, "\n");
      }).join('');

      external_fs_default().writeFileSync(projectIgnoreConfigPath, ignoreConfigStr);
      info("Updated file: ", projectIgnoreConfigPath, ignoreConfigStr); //生成配置文件（prettierrc）

      external_fs_default().writeFileSync(projectConfigPath, JSON.stringify(configObject, null, 2));
      info("Updated file: ", projectConfigPath, configObject); //开始运行检查

      var cmd = "cd ".concat(options.commandArgs.codePath, " && prettier --check ./**/* --config ").concat(projectConfigPath, " --ignore-path ").concat(projectIgnoreConfigPath, " --no-editorconfig");
      info("Executing command: ", cmd);
      var execResult = external_shelljs_default().exec(cmd, {
        silent: true
      });

      if (execResult.code != 0) {
        var matchList = /^/gm.exec(execResult.stdout) || [];
        this.result.msgType = CheckerMessageTypeEnum.WARN;
        this.result.msgCount = matchList.length; //不准确，目前都为1

        warn(execResult.stdout);
      }

      if (this.isSuccess) {
        info("OK!");
      }
    }
  }, {
    key: "isSuccess",
    get: function get() {
      return this.result.msgType != CheckerMessageTypeEnum.ERROR;
    }
  }]);

  return Plugin;
}();

/* harmony default export */ const prettier = (new prettier_Plugin());
// CONCATENATED MODULE: ./src/plugins/project-basic/index.ts
function project_basic_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function project_basic_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function project_basic_createClass(Constructor, protoProps, staticProps) { if (protoProps) project_basic_defineProperties(Constructor.prototype, protoProps); if (staticProps) project_basic_defineProperties(Constructor, staticProps); return Constructor; }

function project_basic_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var project_basic_Plugin = /*#__PURE__*/function () {
  function Plugin() {
    project_basic_classCallCheck(this, Plugin);

    project_basic_defineProperty(this, "name", "project-basic");

    project_basic_defineProperty(this, "aliasName", "Basic Information Checker");

    project_basic_defineProperty(this, "result", {
      title: this.aliasName,
      msgCount: 0,
      msgType: CheckerMessageTypeEnum.INFO
    });
  }

  project_basic_createClass(Plugin, [{
    key: "run",
    value: function run(options) {
      //检查package.json文件（必须包含script.start,script.build）
      var packageJsonPath = external_path_default().resolve(options.commandArgs.codePath, "package.json");

      if (external_fs_default().existsSync(packageJsonPath)) {
        var packageJson = JSON.parse(external_fs_default().readFileSync(packageJsonPath).toString());

        if (!packageJson.scripts || !packageJson.scripts.start || !packageJson.scripts.build) {
          this.result.msgCount = 1;
          this.result.msgType = CheckerMessageTypeEnum.WARN;
          warn("File package.json must include: script.start,script.build!");
        }
      } //检查目录结构（必须包含src,dist,doc）


      if (!external_fs_default().existsSync(external_path_default().resolve(options.commandArgs.codePath, "src"))) {
        this.result.msgCount++;
        this.result.msgType = CheckerMessageTypeEnum.WARN;
        warn("The project must contains directory: src !");
      }

      if (!external_fs_default().existsSync(external_path_default().resolve(options.commandArgs.codePath, "dist"))) {
        this.result.msgCount++;
        this.result.msgType = CheckerMessageTypeEnum.WARN;
        warn("The project must contains directory: dist !");
      }

      if (!external_fs_default().existsSync(external_path_default().resolve(options.commandArgs.codePath, "doc"))) {
        this.result.msgCount++;
        this.result.msgType = CheckerMessageTypeEnum.WARN;
        warn("The project must contains directory: doc !");
      }

      if (this.isSuccess) {
        info("OK!");
      }
    }
  }, {
    key: "isSuccess",
    get: function get() {
      return this.result.msgType != CheckerMessageTypeEnum.ERROR;
    }
  }]);

  return Plugin;
}();

/* harmony default export */ const project_basic = (new project_basic_Plugin());
// CONCATENATED MODULE: ./src/plugins/index.ts
;



var pluginList = [project_basic, package_version, eslint, prettier];
/* harmony default export */ const plugins = (pluginList);
// CONCATENATED MODULE: ./src/index.ts
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function src_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function src_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function src_createClass(Constructor, protoProps, staticProps) { if (protoProps) src_defineProperties(Constructor.prototype, protoProps); if (staticProps) src_defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function src_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













var defaultEnvList = [EnvEnum.AMD, EnvEnum.BROWSER, EnvEnum.COMMONJS, EnvEnum.COMMONJS, EnvEnum.ES6, EnvEnum.NODE];
var commandArgs = {};
commandArgs.execFileRootPath = external_caller_path_default()();
commandArgs.packagePath = external_path_default().resolve(commandArgs.execFileRootPath, "../../"); //package.json

var packageJson = JSON.parse(external_fs_default().readFileSync(external_path_default().resolve(commandArgs.packagePath, "package.json")).toString()); //初始化环境变量

process.env.PATH = external_path_default().resolve(commandArgs.packagePath, "node_modules/.bin") + (external_path_default()).delimiter + process.env.PATH; //命令

var pluginNameStr = plugins.map(function (k) {
  return k.name;
}).join(", ");
external_commander_default().version(packageJson.version);
external_commander_default().option('--debug', "Run as debug.", false).option('--path <type>', 'Project\'s path that you want to check.', "./").option('--check-dir <type>', 'Specify a directory to be scanned by code (e.g. by plug-ins such as eslint), the default is root value of --path. (multiple are separated by ,).', "").option('--ignore-check-dir <type>', 'Specify a directory to be no scanned by code (e.g. by plug-ins such as eslint), (multiple are separated by ,).', "").option('--ignore-plugin <type>', "Ignored plugin name list (multiple are separated by ,), all plugins are [".concat(pluginNameStr, "]."), "").option("--enable-plugin <type>", "Enable plugin name list (multiple are separated by ,), all plugins are [".concat(pluginNameStr, "]."), "").option('--eslint-global <type>', 'Define global variate, see eslint doc.', "").option('--eslint-env <type>', 'The environment in which the code to be checked is running, see eslint doc.', "amd,browser,commonjs,commonjs,es6,node").parse(process.argv);
commandArgs.isDebug = (external_commander_default()).debug;
commandArgs.codePath = external_path_default().resolve((external_commander_default()).path);
commandArgs.checkDir = (external_commander_default()).checkDir;
commandArgs.ignoreCheckDir = (external_commander_default()).ignoreCheckDir;
commandArgs.ignorePluginNameList = (external_commander_default()).ignorePlugin ? external_commander_default().ignorePlugin.toLowerCase().split(',') : [];
commandArgs.enablePluginNameList = (external_commander_default()).enablePlugin ? external_commander_default().enablePlugin.toLowerCase().split(',') : [];
commandArgs.eslint_global = (external_commander_default()).eslintGlobal;
commandArgs.eslint_env = (external_commander_default()).eslintEnv || defaultEnvList.join(",").toLowerCase(); //配置处理

var errorMsgList = [];

(function () {
  external_cfonts_default().say(packageJson.name, {
    font: "simple"
  });
  info(">>>>>>>>>>>>>>>>  Welcome to use ".concat(packageJson.name, " ").concat(packageJson.version, "<<<<<<<<<<<<<<<<<")); //检查更新

  external_update_notifier_default()({
    pkg: packageJson,
    updateCheckInterval: 0,
    shouldNotifyInNpmScript: true
  }).notify(); //打印当前命令

  info("Executing command: ", process.argv.join(" ")); //打印当前配置信息

  if (commandArgs.isDebug) {
    info("Current config is :", commandArgs);
  } //代码路径检查


  if (!commandArgs.codePath) {
    errorMsgList.push("Please specify the code path to check!");
    return;
  }

  if (!external_fs_default().existsSync(commandArgs.codePath)) {
    errorMsgList.push("Code path [".concat(commandArgs.codePath, "] does not exist!"));
    return;
  }
})();

if (errorMsgList.length) {
  error(errorMsgList.join("\\n"));
  process.exit(1);
} //执行代码检查插件


var Checker = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Checker, _EventEmitter);

  var _super = _createSuper(Checker);

  function Checker() {
    var _this;

    src_classCallCheck(this, Checker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    src_defineProperty(_assertThisInitialized(_this), "pluginList", []);

    src_defineProperty(_assertThisInitialized(_this), "timeSpent", 0);

    return _this;
  }

  src_createClass(Checker, [{
    key: "process",
    value: function process() {
      var _this2 = this;

      var sw = new (external_x_js_kit_default()).timer.stopWatch();
      var resultList = []; //开始处理

      this.emit(CheckerEventNameEnum.START);
      sw.start();
      this.pluginList.forEach(function (plugin) {
        //开始准备运行插件
        _this2.emit(CheckerEventNameEnum.ITEM_START, plugin.name); //运行插件


        var pLowerName = plugin.name.toLowerCase();

        if (commandArgs.ignorePluginNameList.includes(pLowerName) || commandArgs.enablePluginNameList.length && !commandArgs.enablePluginNameList.includes(pLowerName)) {
          plugin.result.msgType = CheckerMessageTypeEnum.INFO;

          _this2.emit(CheckerEventNameEnum.IGNORED);
        } else {
          plugin.run({
            commandArgs: commandArgs
          });
          resultList.push(plugin.result);
        } //插件运行结束


        _this2.emit(CheckerEventNameEnum.ITEM_END, plugin);
      });
      sw.stop();
      this.timeSpent = sw.value / 1000;
      this.emit(CheckerEventNameEnum.RESULT, resultList);
      this.emit(CheckerEventNameEnum.END, this.pluginList.every(function (k) {
        return k.isSuccess;
      }));
    }
  }]);

  return Checker;
}(external_events_namespaceObject.EventEmitter);

var checker = new Checker();
checker.pluginList = plugins;
checker.on(CheckerEventNameEnum.START, function () {
  info("Start code checking...");
});
checker.on(CheckerEventNameEnum.ITEM_START, function (name) {
  info("Running plugin: [".concat(name, "]"));
});
checker.on(CheckerEventNameEnum.END, function (isAllSuccess) {
  info(">>>>>>>>>>>>>>>>  Code checked!  <<<<<<<<<<<<<<<<<");

  if (!isAllSuccess) {
    process.exit(1);
  }
});
checker.on(CheckerEventNameEnum.RESULT, function (resultList) {
  info(external_as_table_default()(resultList));
});
checker.on(CheckerEventNameEnum.ITEM_END, function (plugin) {
  if (plugin.isSuccess) {
    info("Plugin execute [".concat(plugin.name, "] Succeeded!"));
  } else {
    error("Plugin execute [".concat(plugin.name, "] Failed!"));
  }
});
checker.on(CheckerEventNameEnum.IGNORED, function () {
  info("This plugin has been ignored");
});
checker.process();

/***/ }),

/***/ 884:
/***/ ((module) => {

module.exports = require("ansicolor");;

/***/ }),

/***/ 105:
/***/ ((module) => {

module.exports = require("ololog");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 		__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 		module = execOptions.module;
/******/ 		execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => "" + __webpack_require__.h() + ".hot-update.json";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "793be9b86cc8a67ce11c"
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises;
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: currentChildModule !== moduleId,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 					else hot._acceptedDependencies[dep] = callback || function () {};
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				registeredStatusHandlers[i].call(null, newStatus);
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 					blockingPromises.push(promise);
/******/ 					waitForBlockingPromises(function () {
/******/ 						setStatus("ready");
/******/ 					});
/******/ 					return promise;
/******/ 				case "prepare":
/******/ 					blockingPromises.push(promise);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises.length === 0) return fn();
/******/ 			var blocker = blockingPromises;
/******/ 			blockingPromises = [];
/******/ 			return Promise.all(blocker).then(function () {
/******/ 				return waitForBlockingPromises(fn);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			setStatus("check");
/******/ 			return __webpack_require__.hmrM().then(function (update) {
/******/ 				if (!update) {
/******/ 					setStatus(applyInvalidatedModules() ? "ready" : "idle");
/******/ 					return null;
/******/ 				}
/******/ 		
/******/ 				setStatus("prepare");
/******/ 		
/******/ 				var updatedModules = [];
/******/ 				blockingPromises = [];
/******/ 				currentUpdateApplyHandlers = [];
/******/ 		
/******/ 				return Promise.all(
/******/ 					Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 						promises,
/******/ 						key
/******/ 					) {
/******/ 						__webpack_require__.hmrC[key](
/******/ 							update.c,
/******/ 							update.r,
/******/ 							update.m,
/******/ 							promises,
/******/ 							currentUpdateApplyHandlers,
/******/ 							updatedModules
/******/ 						);
/******/ 						return promises;
/******/ 					},
/******/ 					[])
/******/ 				).then(function () {
/******/ 					return waitForBlockingPromises(function () {
/******/ 						if (applyOnUpdate) {
/******/ 							return internalApply(applyOnUpdate);
/******/ 						} else {
/******/ 							setStatus("ready");
/******/ 		
/******/ 							return updatedModules;
/******/ 						}
/******/ 					});
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error("apply() is only allowed in ready status");
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				setStatus("abort");
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			// handle errors in accept handlers and self accepted module load
/******/ 			if (error) {
/******/ 				setStatus("fail");
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw error;
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			if (queuedInvalidatedModules) {
/******/ 				return internalApply(options).then(function (list) {
/******/ 					outdatedModules.forEach(function (moduleId) {
/******/ 						if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 					});
/******/ 					return list;
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			setStatus("idle");
/******/ 			return Promise.resolve(outdatedModules);
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			826: 1
/******/ 		};
/******/ 		
/******/ 		// no chunk install function needed
/******/ 		
/******/ 		// no chunk loading
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			var update = require("./" + __webpack_require__.hu(chunkId));
/******/ 			var updatedModules = update.modules;
/******/ 			var runtime = update.runtime;
/******/ 			for(var moduleId in updatedModules) {
/******/ 				if(__webpack_require__.o(updatedModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = updatedModules[moduleId];
/******/ 					if(updatedModulesList) updatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 		}
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.requireHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				if (
/******/ 					__webpack_require__.c[outdatedModuleId] &&
/******/ 					__webpack_require__.c[outdatedModuleId].hot._selfAccepted &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!__webpack_require__.c[outdatedModuleId].hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: __webpack_require__.c[outdatedModuleId].hot._requireSelf,
/******/ 						errorHandler: __webpack_require__.c[outdatedModuleId].hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (options.onErrored) {
/******/ 											options.onErrored({
/******/ 												type: "accept-errored",
/******/ 												moduleId: outdatedModuleId,
/******/ 												dependencyId: dependenciesForCallbacks[k],
/******/ 												error: err
/******/ 											});
/******/ 										}
/******/ 										if (!options.ignoreErrored) {
/******/ 											reportError(err);
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err);
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 									}
/******/ 									reportError(err);
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.require = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.require = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.requireHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						!__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						__webpack_require__.o(installedChunks, chunkId) &&
/******/ 						installedChunks[chunkId] !== undefined
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = function() {
/******/ 			return Promise.resolve().then(function() {
/******/ 				return require("./" + __webpack_require__.hmrF());
/******/ 			}).catch(function(err) { if(err.code !== "MODULE_NOT_FOUND") throw err; });
/******/ 		}
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__(63);
/******/ })()
;
//# sourceMappingURL=index.js.map