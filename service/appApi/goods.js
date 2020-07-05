const Router = require("koa-router");
let router = new Router();

const mongoose = require("mongoose");
const fs = require("fs");

router.get("/insertAllGoodsInfo", async ctx => {
  fs.readFile("./data_json/newGoods.json", "utf8", (err, data) => {
    //fs读的是相对路径
    data = JSON.parse(data);
    const Goods = mongoose.model("Goods");
    data.map((value, index) => {
      let newGoods = new Goods(value);
      newGoods
        .save()
        .then(() => {
          console.log("成功");
        })
        .catch(error => {
          console.log(error);
        });
    });
  });
  ctx.body = "开始导入数据";
});

//编写获取商品详细信息的接口
router.post("/getDetailGoodsInfo", async ctx => {
  try {
    let goodsId = ctx.request.body.goodsId;
    const Goods = mongoose.model("Goods");
    const result = await Goods.findOne({ ID: goodsId }).exec();
    console.log(result);
    ctx.body = { code: 200, message: result };
  } catch (err) {
    ctx.body = { code: 500, message: err };
  }
});

//获取大类数据商品列表的接口
router.get("/getCategoryList", async ctx => {
  try {
    const Category = mongoose.model("Category");
    let result = await Category.find().exec();
    ctx.body = { code: 200, message: result };
  } catch (err) {
    ctx.body = { code: 500, message: err };
  }
});

//获取小类数据商品列表的接口
router.post("/getCategorySubList", async ctx => {
  try {
    let categoryId = ctx.request.body.categoryId;
    const CategorySub = mongoose.model("CategorySub");
    const result = await CategorySub.find({
      MALL_CATEGORY_ID: categoryId
    }).exec();
    ctx.body = { code: 200, message: result };
  } catch (err) {
    ctx.body = { code: 500, message: err };
  }
});

//通过id搜索商品分类
router.post("/getGoodsListByCategorySubID", async ctx => {
  try {
    console.log(ctx.request.body.categorySubId);
    let categorySubId = ctx.request.body.categorySubId; //小类别
    let page = ctx.request.body.page;
    let num = 10;
    let start = (page - 1) * num;
    const Goods = mongoose.model("Goods");
    let result = await Goods.find({ SUB_ID: categorySubId })
      .skip(start)
      .limit(num)
      .exec();
    ctx.body = { code: 200, message: result };
  } catch (err) {
    ctx.body = { code: 500, message: err };
  }
});

module.exports = router;
