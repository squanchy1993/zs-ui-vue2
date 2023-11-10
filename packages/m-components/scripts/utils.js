const chalk = require('chalk');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// check argvs
exports.checkArgs = (argvs, packages) => {
  console.log('argvs', argvs)
  const allow_arvs = ['-a', '-all', '-watch', '-w', ...packages];

  // 检查传入的参数
  const isAllowed = argvs.some((item) => allow_arvs.includes(item));
  if (argvs.length === 0 || !isAllowed) {
    throw new Error(`打包参数错误! 只允许 ${allow_arvs.join(',')}`);
  }

  // 检查是否有包
  if (packages.length === 0) {
    throw new Error('当前暂无组件可以打包');
  }
};

// build dist
exports.runWebpack = async(componentName, entry, output, compileWatchMode) => {
  return new Promise((resolve, reject) => {
    const CONFIG = {
      mode: 'production',
      entry: path.resolve(__dirname, entry),
      output: {
        path: path.resolve(__dirname, output),
        filename: 'index.js',
        globalObject: `(typeof window !== 'undefined' ? window : this)`,
        libraryTarget: 'umd'
      },
      resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue']
      },
      module: {
        rules: [
          {
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env', // 预设：指示babel做怎么样的兼容处理
                  {
                    useBuiltIns: 'usage', // 按需加载
                    corejs: {
                      version: '3'
                    },
                    targets: 'defaults'
                  }
                ]
              ]
            }
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[name].[hash:7].[ext]'
            }
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'fonts/[name].[hash:7].[ext]'
            }
          },
          {
            test: /\.css$/,
            use: ['vue-style-loader', 'css-loader']
          },
          {
            test: /\.scss$/,
            use: ['vue-style-loader', 'css-loader', 'sass-loader']
          }
        ]
      },
      plugins: [
        new CleanWebpackPlugin(),
        new ProgressBarPlugin({
          format: chalk.green(`${componentName} building`) + '[:bar]' + chalk.green(':percent') + '(:elapsed seconds)',
          clear: false
        }),
        /* config.plugin('vue-loader') */
        new VueLoaderPlugin()
      ],
      externals: ['vue', 'element-ui', 'vue-loader'],
      stats: {
        errors: true,
        errorDetails: true
      }
    };

    const compiler = webpack(CONFIG);
    const compile_callback = (err, { compilation: { errors }}) => {
      if (err || errors.length > 0) {
        const error_msg = err || errors
        console.log(chalk.red(`${componentName} build fail`));
        throw new Error(error_msg)
      } else {
        const successMsg = `${componentName} build success`
        console.log(chalk.green(successMsg));
        resolve(successMsg)
      }
    };

    if (compileWatchMode) {
      compiler.watch({ aggregateTimeout: 600 }, compile_callback);
    } else {
      compiler.run(compile_callback);
    }
  })
};
