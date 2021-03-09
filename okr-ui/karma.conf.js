var webpackConfig = require("@vue/cli-servise/webpack.config");

module.exports = function(config) {
  config.set({
    frameworks: ["mocha"],

    files: ["test/**/*.spec.js"],

    preprocessors: {
      "**/*.spec.js": ["webpack", "sourcemap"]
    },
    autoWatch: true,
    webpack: webpackConfig,
    reporters: ["spec"],
    browsers: ["ChromeHeadless"] // 打开一个无头的浏览器， 单纯用Chrome会闪动
  });
};
