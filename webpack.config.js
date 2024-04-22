const path = require('path');

module.exports = {
  entry: {
    bunny: './js/bunny.js',
    fly: './js/fly.js',
    eyes: './js/eyes.js',
  },
  output: { 
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    compress: true,
    port: 8080,
    open: true,
  },
}