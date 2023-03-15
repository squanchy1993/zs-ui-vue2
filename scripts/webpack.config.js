
const chalk = require('chalk');
const { runWebpack, checkArgs } = require('./utils');
const { getPackagesSync } = require('@lerna/project');

(function() {
  try {
    const packages = getPackagesSync().map((pck) => pck.name).filter((name) => name.includes('@zs-ui-vue2'));
    const argvs = process.argv.slice(2);
    checkArgs(argvs, packages)
    // 检查是否有包

    const compileWatchMode = argvs.some((item) => ['-w', '-watch'].includes(item)) // 监听实时打包
    const isCompileAll = argvs.some((item) => ['-a', '-all'].includes(item)); // 编译全部组件

    // 打包所有包
    if (isCompileAll) {
      for (const p of packages) {
        runWebpack(p, compileWatchMode);
      }
      return false
    }

    // 仅仅打包传入的名字
    const wait_compile_compoment = argvs.filter((item) => item.indexOf('@zs-ui-vue2/') !== -1); // 编译传入的组件
    if (wait_compile_compoment) {
      for (const p of wait_compile_compoment) {
        runWebpack(p, compileWatchMode);
      }
    }
  } catch (error) {
    console.log(chalk.red(`打包错误: ${error.message}`));
  }
})()

