// webpack 是node写出来的，node 写法
let path = require('path')
let HtmlwebpackPlugin = require('html-webpack-plugin') // html打包插件
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCss = require('optimize-css-assets-webpack-plugin')
let UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
    // 起服务 webpack-dev-server
    devServer: {
        port: "3000", // 本地服务端口号，默认8080
        progress: true, // 进度条
        contentBase: './dist' // 服务入口
    },
    mode: 'development', // 模式，production:生产模式 development 开发模式，
    entry: './src/index.js', // 打包的入口
    output: {
        filename: 'bundle.js',
        publicPath: 'http://baidu.com', // 在css、js 图片
        // filename: 'bundle.[hash:8].js', // hash:8 只显示8位，如果文件不变，hash不变
        path: path.resolve(__dirname, 'dist') // __dirname以当前的路径作为主目录
    },
    optimization: {
        minimizer: [
            new OptimizeCss(),
            new UglifyJsWebpackPlugin({
                cache: true,
                sourceMap: true,
                parallel: true
            }),
        ],
    },
    plugins: [ // 数组，放着所有到的webpack的插件
        new HtmlwebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            hash: true,
            minify: false
            // minify: {
            //     removeAttributeQuotes: true, // 删除双引号
            //     collapseWhitespace: true, // 删除空格，变成一行
            // }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/main.css', // css抽离到文件名
            // filename: devMode ? '[name].css' : '[name].[hash].css',
            // chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        })
    ],
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: "eslint-loader",
            //         options: {
            //             enforce: 'pre' // 强制最先开始使用
            //         }
            //     },
            //     include: path.resolve(__dirname, 'src'),
            //     exclude: /node_modules/
            // },
            {
                test: /\.html$/, // img 标签引入
                use: [
                  {
                    loader: 'html-withimg-loader',
                  },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: '/img/', // 打包后的路径
                        esModule: false,
                        limit: 1,// 280kb
                        //publicPath: '' //只给图片加
                    }
                }
            },
            // {
            //     test: /\.(png|jpe?g|gif)$/i,
            //     use: {
            //         loader: 'file-loader',
            //         options: {
            //             esModule: false // 默认是true
            //         }
            //     }
            // },
            {
                test: /\.css$/,
                use: [
                    // {loader: "style-loader"}, // 跑服务时，将css直接出插入到html的head中
                    MiniCssExtractPlugin.loader,
                    {loader: "css-loader"}, // 处理import
                    {loader: "postcss-loader"},
                ]
            },
            {
                test: require.resolve('jquery'),
                use: 'expose-loader?$!'
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader', // es6转es5
                    options: {
                        presets: ['@babel/preset-env'], // 用最新的js,打包出最小的js,且可以指定浏览器
                        // plugins: ['@babel/plugin-proposal-class-properties', {"loose":true},
                        //     '@babel/plugin-transform-runtime' // 抽离打包公共方法
                        // ], // 解析class写法
                        plugins: [
                            ['@babel/plugin-proposal-decorators', { 'legacy': true } ], // @log语法
                            ['@babel/plugin-proposal-class-properties', { "loose" : true }], // es7语法
                            ['@babel/plugin-transform-runtime' ],// 抽离打包公共方法'
                            // ['@babel/runtime'],// 生产环境需要
                        ]
                    
                    }
                }],
                include: path.resolve(__dirname, 'src'), // 避免查找所有的js
                exclude: /node-modules/
            }
        ]
    }
}