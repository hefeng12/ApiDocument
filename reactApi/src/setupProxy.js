const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware('/public', {
    target:'http://localhost:3001/',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/public": ""
    }
  }))
}