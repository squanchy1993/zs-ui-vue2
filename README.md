<!--
 * @Author: your name
 * @Date: 2022-04-13 22:37:59
 * @LastEditTime: 2022-11-01 20:08:41
 * @LastEditors: DESKTOP-58041OI\zzs squanchy@yeah.net
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zs-ui-vue\README.md
-->

### 命令行
```
// 发布
lerna publish

// 创建组建
lerna create @zs-ui-vue/m-page-list

// 添加公共依赖
lerna add lodash

// 添加公共依赖 
lerna add lodash --scope=@zs-ui-vue/m-form-item

lerna bootstrap --hoist #将所有 package 的依赖引到 根目录的 node_modules 中，节省空间
lerna clean 清除 lerna bootstrap 添加上依赖包括本地的
发布时会自动带上最新的 本地依赖版本号

// 打包
yarn run compile @zs-ui-vue/m-form
```
### 发布
// 发布前准备
npm 源切换到 npm原来的源 登录npm 账户 npm login

// 发布方式一
推送前先push到远程先 然后再进行 lerna publish
不先push也行，lerna publish 会带上新内容进行 发布
从lerna boostrap(依赖包安装) --> 开发模块 --> git commit --> lerna changed(查看包变化) --> lerna publish。

// 发布方式二
lerna publish from-git
自己打tag、打好后 执行命令就不会再次打tag 推送了

### 发布失败
由于lerna 发布会推送新的版本号和tag到origin端；

要删除tag并且，回滚版本号再进行推送

先删除标签，git 回滚版本号，再进行发布


### 关于提交

### sourceTree 
正常使用 代码检查、提交检查

### 命令行
commitizen
git add . 
yarn commit

### note
lerna publish 有问题 会出发 husky里面的 钩子函数导致无法commit --- 解决在lerna.json中设置默认提交信息，

### npm 取消包的发布
`npm unpublish @zs-ui-vue/m-form-item --force`