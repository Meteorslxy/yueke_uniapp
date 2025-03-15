const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        { // 使用数组格式配置
          from: path.join(__dirname, 'cloudfunctions'),
          to: path.join(__dirname, 'unpackage/dist', 
            process.env.NODE_ENV === 'production' ? 'build' : 'dev',
            'mp-weixin', 
            'cloudfunctions'
          )
        }
      ])
    ]
  }
}