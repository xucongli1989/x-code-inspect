const path = require('path')
const webpack = require("webpack")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const shell = require("shelljs")
const EventHooksPlugin = require('event-hooks-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const config = {
    entry: {
        index: "./src/index.ts"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    target: 'node',
    node: {
        __dirname: true
    },
    externals: [
        nodeExternals()
    ],
    resolve: {
        extensions: [".ts", ".js", ".json"]
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }, {
                test: /\.art.html$/,
                loader: "art-template-loader"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ["dist"]
        }),
        new webpack.HotModuleReplacementPlugin(),
        new EventHooksPlugin({
            done: () => {
                //复制配置文件
                shell.cp("-r", path.resolve("./src/config"), path.resolve("./dist/config"))
            }
        })
    ],
    optimization: {
        minimize: false
    }
}
module.exports = config