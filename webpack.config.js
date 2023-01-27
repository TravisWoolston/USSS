const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  target: 'web',
  devServer: {
    port: '5000',
    static: {
      directory: path.join(__dirname, 'public')
},
    open: true,
    hot: true,
    liveReload: true,
  },
  resolve: {
    alias: {
        [path.join(__dirname, 'node_modules/sqlite3/lib/sqlite3-binding.js')]: path.join(__dirname, 'path/to/local/sqlite3-binding.js')
      },
    extensions: ['.js', '.jsx', '.json'],
    fallback: {
        util: require.resolve("util/"),
        "http": require.resolve("stream-http"),
        "stream": require.resolve("stream-browserify"),
        "zlib": require.resolve("browserify-zlib"),
        "crypto": require.resolve("crypto-browserify"),
        "url": false,
        "assert": false,
        "buffer": false,
        "fs": false,
        "async_hooks": false,
        "querystring": false,
        "net": false
      }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, 
        exclude: /node_modules/, 
        use: 'babel-loader', 
      },
    ],
    
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      process: 'process/browser',
    }),
  ],
  externals: { 'sqlite3':'commonjs sqlite3', },
};