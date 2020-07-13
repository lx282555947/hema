module.exports = {
  lintOnSave: false,
  devServer: {
    // watchOptions: {
    //     ignored: ['/node_modules/', '/src/api/'],
    //     poll: 1200,
    // },
    proxy: {
      '/api': {
        target:'http://39.96.10.189:8080',
        changeOrigin: true,
        pathRewrite: {'^/api' : '/api/private/v1'}
      }
    }
  }
}
