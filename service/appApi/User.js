const Router = require("koa-router");
let router = new Router();
const mongoose = require("mongoose");

router.get("/", async ctx => {
  ctx.body = "这是用户操作首页";
});

//编写注册接口
router.post("/register", async ctx => {
  //取得model
  const User = mongoose.model("User");
  // 把从前端接受的post数据封装成一个新的user对象
  let newUser = new User(ctx.request.body);
  await newUser
    .save()
    .then(() => {
      ctx.body = {
        code: 200,
        message: "注册成功"
      };
    })
    .catch(error => {
      ctx.body = {
        code: 500,
        message: error
      };
    });
});

//编写登录接口
router.post("/login", async ctx => {
  //取得model
  const User = mongoose.model("User");
  //得到前端传过来的数据
  let loginUser = ctx.request.body;
  let userName = loginUser.userName;
  let password = loginUser.password;
  //查找用户名是否存在 比对密码
  await User.findOne({ userName: userName })
    .exec()
    .then(async result => {
      if (result) {
        let newUser = new User();
        await newUser
          .comparePassword(password, result.password)
          .then(isMatch => {
            console.log(isMatch);
            ctx.body = { code: 200, message: isMatch };
          })
          .catch(error => {
            console.log(error);
            ctx.body = { code: 500, message: error };
          });
      } else {
        ctx.body = { code: 200, message: "用户名不存在" };
      }
    })
    .catch(error => {
      console.log(error);
      ctx.body = { code: 500, message: error };
    });
});

module.exports = router;
