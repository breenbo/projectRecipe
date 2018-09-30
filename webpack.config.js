// module to have absolute path
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // file to look for all dependencies
  entry: [
    // 'babel-polyfill',
    './src/js/index.js'
  ],
  // where to save the bundled file : take an object as argument
  output: {
    // need absolute path to dist folder, so use path resolve method
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  devServer: {
    // identify the folder to be served
    contentBase: './dist'
  },
  // add plugins (receive array)
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    })
  ]
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       use: {
  //         loader: 'babel-loader'
  //       }
  //     }
  //   ]
  // }
}
