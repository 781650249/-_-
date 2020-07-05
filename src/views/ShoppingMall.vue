<template>
  <div>
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img class="imgBox" :src="imgBox" width="100%" alt />
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input" />
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>

    <!-- 轮播图区域 -->
    <div class="swiper-area">
      <van-swipe :autoplay="4000">
        <van-swipe-item v-for="(item, index) in bannerPicArray" :key="index">
          <img v-lazy="item.imageUrl" width="100%" alt />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="type-bar">
      <div class="type-item" v-for="(cate, index) in category" :key="index">
        <img v-lazy="cate.image" width="90%" />
        <span>{{ cate.mallCategoryName }}</span>
      </div>
    </div>

    <!--AD banner area-->
    <div class="ad-banner">
      <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%" />
    </div>

    <!-- 商品推荐区域 -->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper>
          <swiperSlide v-for="(item, index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" />
              <div>{{ item.goodsName }}</div>
              <div>
                <span style="text-decoration:line-through">￥{{ item.price }}</span>
                <span style="color:red">(￥{{ item.mallPrice }})</span>
              </div>
            </div>
          </swiperSlide>
        </swiper>
      </div>
    </div>

    <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
    <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
    <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>

    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!--这里需要一个list组件-->
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
              <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import floorComponent from "../components/floorComponent";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { toMoney } from "../filter/monenyFilter";
import goodsInfo from "../components/goodsInfoComponent";
import url from "../serviceAPI.config";
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 3
      },
      msg: "shopping Mall",
      imgBox: require("../../public/img/location.svg"),
      bannerPicArray: [
        {
          imageUrl:
            "https://img.alicdn.com/simba/img/TB14QPXgbuWBuNjSszgSuv8jVXa.jpg"
        },
        {
          imageUrl:
            "https://img.alicdn.com/simba/img/TB1LDWvmYj1gK0jSZFOSuw7GpXa.jpg"
        },
        {
          imageUrl:
            "//img.alicdn.com/tfs/TB1s13dvUH1gK0jSZSyXXXtlpXa-520-280.jpg_q90_.webp"
        }
      ],
      recommendGoods: [],
      category: [],
      adBanner: [], //广告条
      floor1: [], //楼层数据
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: [] //热卖商品
    };
  },
  filters: {
    monenyFilter(moneny) {
      return toMoney(moneny);
    }
    
  },
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfo
  },
  created() {
    console.log(2222);
    axios({
      url: url.getShoppingMallInfo,
      method: "get"
    })
      .then(response => {
        console.log(response, 111);
        if (response.status == 200) {
          this.category = response.data.data.category;
          this.adBanner = response.data.data.advertesPicture; //获得广告图片
          this.recommendGoods = response.data.data.recommend; //推荐商品
          this.floor1 = response.data.data.floor1; //楼层1数据
          this.floor2 = response.data.data.floor2; //楼层2数据
          this.floor3 = response.data.data.floor3; //楼层3数据
          this.floorName = response.data.data.floorName;
          this.hotGoods = response.data.data.hotGoods; //热卖商品
        }
      })
      .catch(error => {});
  }
};
</script>

<style scoped>
.hot-goods {
  height: 130rem;
  overflow: hidden;
  background-color: #fff;
}
.type-item {
  flex: 1;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
.imgBox {
  padding-top: 0.6rem;
  padding-left: 0.2rem;
  height: 1.5rem;
}
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}
.swiper-area {
  clear: both;
  max-height: 15rem;
  width: 20rem;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid #fff !important;
  background-color: #e5017d;
  color: #fff;
}
.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
}

.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}

.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
</style>
