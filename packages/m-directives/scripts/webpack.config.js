
const chalk = require('chalk');
const { runWebpack } = require('./utils');

(async function() {
  try {
    const argvs = process.argv.slice(2);
    const packages = argvs.filter(item => item.includes('m-'))
    const entry = '../lib/index.js'
    const output = '../dist'
    const compileWatchMode = argvs.some((item) => ['-w', '-watch'].includes(item)) // 监听实时打包
    for (const p of packages) {
      await runWebpack(p, entry, output, compileWatchMode);
    }
  } catch (error) {
    console.log(chalk.red(`打包错误: ${error.message}`));
  }
})()

