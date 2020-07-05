const mongoose = require("mongoose"); //引入Mongoose
const Schema = mongoose.Schema; //声明Schema
let ObjectId = Schema.Types.ObjectId; //声明Object类型
const bcrypt = require("bcrypt"); //引入加密工具
const SALT_WORK_FACTOR = 10; //加密强度

//创建我们的用户Schema
const userSchema = new Schema(
  {
    UserId: ObjectId,
    userName: { unique: true, type: String },
    password: String,
    createAt: { type: Date, default: Date.now() },
    lastLoginAt: { type: Date, default: Date.now() }
  },
  {
    collection: "user"
  }
);
//每次存储数据都要执行加密
userSchema.pre("save", function(next) {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

//密码对比的方法
userSchema.methods = {
  comparePassword: (_password, password) => {
    //客户端密码 数据库取出的密码
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch);
        else reject(err);
      });
    });
  }
};

//发布模型
mongoose.model("User", userSchema);
