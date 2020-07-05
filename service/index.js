const Koa = require("koa");
const app = new Koa();
const { connect, initSchemas } = require("./database/init");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
app.use(bodyParser());
const cors = require("koa2-cors");
app.use(cors()); //后端设置跨域
let user = require("./appApi/User");
let goods = require("./appApi/goods");
let category = require("./appApi/category");
let categorySub = require("./appApi/categorySub");

//装载路由
let router = new Router();
router.use("/user", user.routes());
router.use("/goods", goods.routes());
router.use("/category", category.routes());
router.use("/categorySub", categorySub.routes());

//加载路由中间件
app.use(router.routes());
app.use(router.allowedMethods());

(async () => {
  await connect();
  initSchemas();
})();

app.use(async ctx => {
  ctx.body = "hello world";
});

app.listen("3000", function() {
  console.log("3000端口正在监听中");
});
