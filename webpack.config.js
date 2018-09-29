// module to have absolute path
const path = require('path')

module.exports = {
  // file to look for all dependencies
  entry: './src/js/entry.js',
  // where to save the bundled file : take an object as argument
  output: {
    // need absolute path to dist folder, so use path resolve method
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  }
}
