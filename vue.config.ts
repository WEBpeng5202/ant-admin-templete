
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ?
    './' : '/',
  assetsDir: 'static',
  lintOnSave: false,
  devServer: {
    host: '192.168.1.137',
    // 设置默认端口
    port: 8080,
    // 设置代理
    proxy: {
      '/api': {
        // 目标 API 地址
        target: 'https://applet.youxi3.cn',
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        pathRewrite: {
          // '^/api': 'https://bestboots.com.cn'
          '^/api': 'https://applet.youxi3.cn/api',
        },
      },
    },
  },
  productionSourceMap: false,
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#1DA57A',
          'link-color': '#1DA57A',
          'border-radius-base': '2px',
        },
        javascriptEnabled: true
      }
    }
  }
};
