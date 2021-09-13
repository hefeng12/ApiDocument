const Koa = require('koa');
const path = require('path');
const fs = require("fs");
const { createProxyMiddleware } = require('http-proxy-middleware');
const k2c = require('koa2-connect');
const cors = require('koa2-cors');

const koaStatic = require('koa-static');
const koaMount = require('koa-mount');

const allModules = require('./apis/index');


const app = new Koa();;
const port = process.env.PORT || 3001;
app.use(koaMount('/', koaStatic('./dist')));
// app.use(koaStatic(path.join(__dirname+'./dist')));
const router = require('koa-router')()

// router.get('/', async (ctx, next) => {
//     ctx.type = "html";
//     ctx.body = fs.readFileSync("./dist/index.html");
// })
router.get('/apis', async (ctx, next) => {
  let res = {
    code:200,
    msg:'成功',
    data:allModules
  }
  // ctx.body = JSON.stringify(res);
  ctx.body = res;
})
app.use(
  cors({
      origin: '*', // 允许来自所有域名请求
      maxAge: 5, //指定本次预检请求的有效期，单位为秒。
      credentials: true, //是否允许发送Cookie
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法'
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
);
app.use(router.routes(), router.allowedMethods())
app.use(async (ctx, next) => {
    const url = ctx.path;
    if (url.startsWith('/api')) {
      ctx.respond = false;
      await k2c(
        createProxyMiddleware({
          target: 'http://localhost:3002',
          changeOrigin: true,
          secure: false,
        }),
      )(ctx, next);
    }
    return await next();
  });

app.listen(port, () => {
  console.log(` Your application is running here: http://localhost:${port}`);
});