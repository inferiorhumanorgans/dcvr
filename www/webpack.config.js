const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || "development";

console.log(`Node environment: ${NODE_ENV}`);

let export_meta = {
  entry: "./bootstrap.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bootstrap.js",
  },
  devServer: {
    port: 8080,
    host: '0.0.0.0'
  },
  mode: NODE_ENV,
  plugins: [
    new CopyWebpackPlugin(['index.html'])
  ]
};

if (NODE_ENV === 'production') {
    export_meta.optimization = {
        minimizer: [
            new TerserPlugin({
                // Use multi-process parallel running to improve the build speed
                // Default number of concurrent runs: os.cpus().length - 1
                parallel: true,
                // Enable file caching
                // cache: true,
                sourceMap: true,
            })
        ],
    }
}

module.exports = export_meta
