const path = require('path')

module.exports = {
  module: {
    rules: [
      // 使用 eslint-loader 进行 webpack 编译前代码校验
      // { enforce: "pre",
      //   test: /\.(js|jsx)$/,
      //   use: 'eslint-loader',
      //   exclude: [
      //     path.join(__dirname, '../node_modules')
      //   ]
      // }
      // ,

      // 定义编译 jsx 文件使用的loader(babel-loader)
      {
        test: /\.jsx$/,
        use: 'babel-loader',
      },
      // 定义 js 文件使用的 loader
      {
        test: /\.js$/,
        use: 'babel-loader',
        // 排除 node_modules 目录
        exclude: [
          'node_modules/'
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@material-ui/core': '@material-ui/core/es'
    }
  }
}
