
const chalk = require('chalk');
const { runWebpack } = require('./utils');

(async function() {
  try {
    const argvs = process.argv.slice(2);
    const compileWatchMode = argvs.some((item) => ['-w', '-watch'].includes(item)) // 监听实时打包
    runWebpack('m-components', '../lib/index.js', '../dist', compileWatchMode);
  } catch (error) {
    console.log(chalk.red(`打包错误: ${error.message}`));
  }
})()

