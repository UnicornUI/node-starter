const path = require("path");
// 支持热加载html 文件的修改
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 文件拷贝的插件
const CopyPlugin = require("copy-webpack-plugin");
// 每次打包都清除之前打包的文件插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // 当前的打包的模式, 生产版本的文件比较纯净，开发版本打包有大量的附加信息
  mode: "development",
  // 文件入口，
  entry: {
    app: "./src/app.js",
  },
  // js 文件的打包之后的存放位置与文件名称
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "[name]-[hash:8].js",
  },
  // 插件
  plugins: [
    // 打包 HTML 文件的插件
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public/index.html"),
      filename: "index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./public/*.ico",
          // 不使用绝对路径时，这里定义的路径是相对于配置的 output。path
          to: "favicon.ico",
        },
        {
          from: "./public/lib",
          to: "lib",
        },
      ],
    }),
    // 打包之前清理已经存在的打包结果`./dist`
    new CleanWebpackPlugin(),
  ],

  module: {
    // 配置打包的规则与加载器
    rules: [
      {
        test: /\.art$/,
        use: {
          loader: "art-template-loader",
        },
      },
    ],
  },

  devServer: {
    contentBase: path.join(__dirname, "./dist"),
    compress: true,
    port: 3000,
    open: true,
  },
};
