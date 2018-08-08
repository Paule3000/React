// Trying to require the plugin then use it.
let  babelRelayPlugin = require('./src/babelRelayPlugin.js');

module.exports = {
  entry: "./js/app.js",  
  // entry: "./js/server.js",  
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader',
        query: { presets: ['react', 'es2015', 'stage-0'] }
      }
    ]
  },
  // plugins: [babelRelayPlugin]
  plugins: ['./src/babelRelayPlugin']
  // './src/babelRelayPlugin.js'
};
