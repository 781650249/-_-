const BASEURL = "http://yapi.demo.qunar.com/mock/83484/SmileVue/";
const LOCALURL = "http://localhost:3000/";
const URL = {
  getShoppingMallInfo: BASEURL + "index",
  getGoodsInfo: BASEURL + "getGoodsInfo",
  registerUser: LOCALURL + "user/register",
  loginUser: LOCALURL + "user/login",
  getDetailGoodsInfo: LOCALURL + "goods/getDetailGoodsInfo", //得到详情页信息
  getCategoryList: LOCALURL + "goods/getCategoryList", //得到大类列表
  getCategorySubList: LOCALURL + "goods/getCategorySubList", //得到小类列表
  getGoodsListByCategorySubID: LOCALURL + "goods/getGoodsListByCategorySubID" //得到小类商品信息
};

module.exports = URL;
