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
  }
};
