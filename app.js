const Koa = require('koa');

const path =require('path');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const templating = require('./templating');

const convert = require('koa-convert');

const static = require('koa-static');

const isProduction = process.env.NODE_ENV === 'production';

const app = new Koa();

// 打印请求路由
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  let start = new Date().getTime();
  let execTime;
  await next();
  execTime = new Date().getTime() - start;
  ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// 缓存静态文件
app.use(convert(static(
  path.join(__dirname, './static')
)));

// bodyparser
app.use(bodyParser());

// 挂载 nunjucks
app.use(templating('', {
  noCache: !isProduction,
  watch: !isProduction
}));

// 新增控制器
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');