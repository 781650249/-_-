const mongoose = require("mongoose"); //数据库连接和初始化
const glob = require("glob");
const db = "mongodb://localhost/simle-db";
const { resolve } = require("path");

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, "./schema/", "**/*.js")).forEach(require); //一次性引入所有schema
};

exports.connect = () => {
  mongoose.set("useCreateIndex", true); //加上这个
  mongoose.connect("mongodb://localhost/smile-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  let maxLength = 0;

  return new Promise((resolve, reject) => {
    //增加数据库监听事件
    mongoose.connection.on("disconnected", () => {
      if (maxLength <= 3) {
        console.log("数据库断开");
        mongoose.connect(db);
      } else {
        reject();
        throw new Error("数据库出现问题,程序无法搞定，请人为修理");
      }
    });

    mongoose.connection.on("error", err => {
      if (maxLength <= 3) {
        console.log("数据库错误");
        mongoose.connect(db);
      } else {
        reject(err);
        throw new Error("数据库出现问题,程序无法搞定，请人为修理");
      }
    });

    mongoose.connection.once("open", () => {
      console.log("MongoDB connected successfully");
      resolve();
    });
  });
};
