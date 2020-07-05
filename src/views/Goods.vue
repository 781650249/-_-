<template>
  <div>
    <div class="navBar">
      <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>

    <div class="imageDiv">
      <img :src="goodsInfo.IMAGE1" width="100%" alt />
    </div>

    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">￥{{goodsInfo.PRESENT_PRICE|monenyFilter}}</div>

    <!-- 商品分栏 -->
    <div>
      <van-tabs>
        <van-tab title="商品详情" swipeable sticky>
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评价">正在制作中</van-tab>
      </van-tabs>
    </div>

    <!-- 底部加购付款 -->
    <div class="goods-bottom">
      <div>
        <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "../serviceAPI.config";
import { Toast } from "vant";
import { monenyFilter, toMoney } from "../filter/monenyFilter";
export default {
  data() {
    return {
      goodsId: "775e575ce28a4f89b1dfe2c99eb08ae7",
      goodsInfo: {}
    };
  },
  created() {
    this.goodsId = this.$route.query.goodsId
      ? this.$route.query.goodsId
      : this.$route.params.goodsId;
    this.getInfo();
  },
  filters: {
    monenyFilter(moneny) {
      return toMoney(moneny);
    }
  },
  methods: {
    addGoodsToCart() {
      let cartInfo = localStorage.cartInfo
        ? JSON.parse(localStorage.cartInfo)
        : [];
      let isHaveGoods = cartInfo.find(cart => cart.goodsId == this.goodsId);
      if (!isHaveGoods) {
        //没有商品直接添加到数组中
        //重新组成添加到购物车的信息
        let newGoodsInfo = {
          goodsId: this.goodsInfo.ID,
          Name: this.goodsInfo.NAME,
          price: this.goodsInfo.PRESENT_PRICE,
          image: this.goodsInfo.IMAGE1,
          count: 1
        };
        cartInfo.push(newGoodsInfo); //添加到购物车
        localStorage.cartInfo = JSON.stringify(cartInfo); //将本地数据放入缓存中
        Toast.success("添加成功");
      } else {
        Toast.success("已有此商品");
      }
      this.$router.push({ name: "Cart" });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    async getInfo() {
      const response = await axios({
        url: url.getDetailGoodsInfo,
        method: "post",
        data: {
          goodsId: this.goodsId
        }
      });
      if ((response.data.code = 200 && response.data.message)) {
        console.log(response);
        this.goodsInfo = response.data.message;
      } else {
        Toast("服务器错误，数据获取失败");
      }
    }
  }
};
</script>

<style scoped>
.goods-bottom {
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
}
.goods-bottom > div {
  flex: 1;
  padding: 5px;
}

.detail {
  font-size: 0px;
}
.goods-name,
.goods-price {
  text-align: center;
  background-color: #fff;
}
</style>
