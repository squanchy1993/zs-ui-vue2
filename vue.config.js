/*
 * @Author: your name
 * @Date: 2022-04-26 10:42:51
 * @LastEditTime: 2022-04-26 13:20:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /zs-ui-vue2/vue.config.js
 */
'use strict';
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  configureWebpack: {
    name: 'atest',
    resolve: {
      alias: {
        '@': resolve('src'),
        '@packages': resolve('packages')
      }
    }
  },
  chainWebpack(config) {
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ]);
  }
};
