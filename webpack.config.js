// 引入一个包
const path = require('path')
// webpack中的所有配置信息都要写在model.exports中
const HTMLWebpackplugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  mode: 'development',
  // 指定入口文件
  entry: './src/index.ts',
  // 指定打包文件的所在目录
  output: {
    // 指定打包文件的目录
    path: path.resolve(__dirname, 'dist'),
    // 打包后文件的名字
    filename: 'bundle.js',
    // 告诉webpack不使用箭头函数
    environment:{
      arrowFunction:false
    }
  },
  // 指定webpack要使用的模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // test指定规则生效的文件
        test: /\.ts$/,
        // 要是有的loader
        use: [
          // 配置babel
          {
            // 指定加载器
            loader:'babel-loader',
            // 设置babel
            options:{
              // 设置预定义的环境
              presets:[
                [
                  // 指定环境插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets:{
                      // 指定浏览器的版本
                      "chrome":'88',
                      'ie':'11'
                    },
                    // 指定corejs的版本
                    "corejs":'3',
                    // 使用corejs的方式 'usage' 按需加载
                    "useBuiltIns":'usage'
                  }
                ]
              ]
            }
          },
          // 'babel-loader',
          'ts-loader',
        ],
        // 排除的文件夹
        exclude: /node-modules/,
      },
      // 设置less文件的处理
      {
        test:/\.less$/,
        use:[
          'style-loader',
          'css-loader',
          // 引入postcss
          {
            // 浏览器对于css的兼容性问题
            loader:'postcss-loader',
            options:{
              postcssOptions:{
                plugins:[
                  [
                    "postcss-preset-env",
                    {
                      browsers:'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
          'less-loader'
        ]
      }
    ],
  },
  // 配置webpack插件
  plugins: [
    // 该功能的用处就是先清空dist文件里的内容再生成相应的文件
    new CleanWebpackPlugin(),
    // 自动生成html文件，并引入相应的资源
    new HTMLWebpackplugin({
      // title:"这是一个自定义的title"
      template: './src/index.html',
    }),
  ],
  // 用来设置引用的模块的扩展名
  resolve:{
    // import {hi} from './app'
    extensions:['.ts','.js']
  }
}
