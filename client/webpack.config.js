const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = { 
    mode: 'development',
    entry: "./src/index.js", 
    devtool: 'inline-source-map',
    output: { 
      filename: "bundle.js", 
      path: path.join(__dirname, "/dist") 
    },
    module: { 
      rules: [ 
        { 
          test: /\.(js|jsx)?$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          // query: {
          //   presets: ["@babel/preset-env", "@babel/preset-react"]
          // }
        } 
      ] 
    }, 
    optimization: {
      minimize: false
    },
    externals: { 
      "react": "React", 
      "react-dom": "ReactDOM" 
    } 
  } 