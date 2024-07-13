const path = require("path");

module.exports = {
  entry: "./index.js", // Entry point of your application
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this rule to .js files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: "babel-loader", // Use Babel loader for transpilation
          options: {
            presets: ["@babel/preset-env"], // Use the preset defined in .babelrc
          },
        },
      },
    ],
  },
  mode: "development", // Set the mode to development or production
};
