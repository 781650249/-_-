const Router = require("koa-router");
let router = new Router();

const mongoose = require("mongoose");
const fs = require("fs");

router.get("/insertAllCategory", async ctx => {
  fs.readFile("./data_json/category.json", "utf8", (err, data) => {
    data = JSON.parse(data);
    const Category = mongoose.model("Category");
    data.RECORDS.map((value, index) => {
      let newCategory = new Category(value);
      newCategory
        .save()
        .then(() => {
          console.log("成功");
        })
        .catch(error => {
          console.log("失败" + error);
        });
    });
  });

  ctx.body = "开始导入数据";
});

module.exports = router;
