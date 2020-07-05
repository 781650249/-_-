<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表" />
    </div>

    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li
                v-for="(item,index)  in categoryList"
                @click="clickCategory(index,item.ID)"
                :class="{categoryActive:categoryIndex==index}"
                :key="index"
              >{{item.MALL_CATEGORY_NAME}}</li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs @click="onClickCategorySub" v-model="active">
              <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
            </van-tabs>
          </div>

          <div id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" @load="onLoad">
                <div
                  class="list-item"
                  @click="goGoodsInfo(item.ID)"
                  v-for="(item,index) in goodList"
                  :key="index"
                >
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg" />
                  </div>
                  <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div>￥{{item.ORI_PRICE}}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "../serviceAPI.config";
import { Toast } from "vant";
export default {
  data() {
    return {
      categoryList: [],
      categoryIndex: 0,
      active: 0,
      categorySub: [],
      List: [],
      loading: false, //是否上拉刷新
      finished: false, //下拉加载是否没有数据了
      isRefresh: false, //是否下拉加载
      categorySubId: "", //商品分类id
      page: 1,
      goodList: [], //商品列表信息
      errorImg: 'this.src="' + require("../../src/assets/errorimg.jpg") + '"'
    };
  },
  created() {
    this.getCategoryList();
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height = winHeight - 46 + "px";
    document.getElementById("list-div").style.height = winHeight - 90 + "px";
    document.getElementById("list-div").style.height =
      winHeight - 90 - 50 + "px";
  },
  methods: {
    goGoodsInfo(id) {
      this.$router.push({ name: "Goods", params: { goodsId: id } });
    },
    /* 点击子类获取商品信息 */
    onClickCategorySub(index, title) {
      this.categorySubId = this.categorySub[index].ID;
      this.goodList = [];
      this.finished = false;
      this.page = 1;
      this.onLoad();
    },

    /* 点击tab栏获取不同的商品信息 */
    clickCategory(index, categoryId) {
      console.log(index);
      this.categoryIndex = index;
      this.page = 1;
      this.finished = false;
      this.goodList = [];
      this.getCategorySubByCategoryId(categoryId);
    },
    /* 获取tab栏对应的数据详情*/
    async getGoodList() {
      const response = await axios({
        url: url.getGoodsListByCategorySubID,
        method: "post",
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      });
      console.log(response, "数据详情");
      if (response.data.code === 200 && response.data.message) {
        this.page++;
        this.goodList = this.goodList.concat(response.data.message);
      } else {
        this.finished = true;
      }
      this.loading = false;
    },
    /* 上拉加载 */
    onLoad() {
      setTimeout(() => {
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        this.getGoodList();
        console.log("再次加载数据");
      }, 1000);
    },
    /* 下拉加载数据包 */
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = true;
        this.finished = false; //达到40条时设为false还可以下拉刷新
        this.goodList = [];
        this.page = 1;
        this.onLoad();
      }, 2000);
    },

    onClickLeft() {
      this.$router.push(-1);
    },
    /* 获取大类列表 */
    async getCategoryList() {
      const response = await axios({
        url: url.getCategoryList,
        method: "get"
      });
      if (response.data.code == 200 && response.data.message) {
        this.categoryList = response.data.message;
        this.getCategorySubByCategoryId(this.categoryList[0].ID); //初始获取字类列表
      } else {
        Toast("服务器错误，数据获取失败");
      }
    },
    /* 获取大类列表对应的tab栏 */
    async getCategorySubByCategoryId(categoryId) {
      const response = await axios({
        url: url.getCategorySubList,
        method: "post",
        data: { categoryId: categoryId }
      });
      if (response.data.code == 200 && response.data.message) {
        this.categorySub = response.data.message;
        this.active = 0;
        this.categorySubId = this.categorySub[0].ID;
        this.onLoad();
      } else {
        Toast("服务器错误，数据取得失败");
      }
    }
  }
};
</script>

<style scoped>
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
.list-item {
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
}
#list-div {
  overflow: scroll;
}
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #abcdef;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}

.categoryActive {
  background-color: #abcdef;
}
</style>