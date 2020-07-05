const Router = require("koa-router");
let router = new Router();

const mongoose = require("mongoose");
const fs = require("fs");

router.get("/insertAllcategorySub", async ctx => {
  fs.readFile("./data_json/category_sub.json", "utf8", (err, data) => {
    data = JSON.parse(data);
    const categorySub = mongoose.model("categorySub");
    data.RECORDS.map((value, index) => {
      let newcategorySub = new categorySub(value);
      newcategorySub
        .save()
        .then(() => {
          console.log("成功");
        })
        .catch(error => {
          console.log("失败" + error);
        });
    });
  });
  ctx.body = "开始插入数据";
});

module.exports = router;
