const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

// Minifiers
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || "development";
const NODE_ADDR = process.env.NODE_ADDR || "127.0.0.1";
const NODE_PORT = process.env.NODE_PORT || 8080;

console.log(`Node environment: ${NODE_ENV}`);

let export_meta = {
  entry: "./bootstrap.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bootstrap.js",
  },
  devServer: {
    port: NODE_PORT,
    host: NODE_ADDR,
  },
  mode: NODE_ENV,
  plugins: [
    new CopyWebpackPlugin({
        patterns: ['index.html']
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
      rules: [
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          }
      ]
  },
  experiments: {
    asyncWebAssembly: true,
  }
};

if (NODE_ENV === 'production') {
    export_meta.optimization = {
        minimizer: [
            new CssMinimizerPlugin(),
            '...',
        ],
    }
}

module.exports = export_meta
