const fs = require("fs");
fs.readFile("./data_json/goods.json", "utf8", function(err, data) {
  //将文件读取到程序中 然后遍历，将有用的数据提取出来
  let newData = JSON.parse(data);

  var pushData = [];
  newData.RECORDS.map(function(value, index) {
    if (value.IMAGE1 != null) {
      pushData.push(value);
    }
  });

  fs.writeFile("./data_json/newGoods.json", JSON.stringify(pushData), function(
    err
  ) {
    if (err) console.log("写文件操作失败");
    else console.log("写文件操作成功");
  });
});
