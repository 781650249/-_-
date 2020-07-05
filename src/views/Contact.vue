<template>
  <div>
    <div class="person">
      <div class="navbar-div">
        <van-nav-bar title="个人中心" />
      </div>
      <div class="bg">
        <img class="my" :src="imgBox" alt />

        <div class="name">{{obj.userName}}</div>
      </div>

      <!-- 登录注册 -->
      <div class="per">
        <van-button @click="goLogin" v-if="this.obj.userName" plain class="login" type="primary">退出</van-button>
        <van-button @click="goLogin" v-else plain class="login" type="primary">登录</van-button>
        <van-button @click="goRegister" plain class="register" type="info">注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: "",
      active: 1,
      obj: {
        userName: null
      },
      imgBox: require("../../public/per.jpg")
    };
  },

  created() {
    this.getUserIfor();
  },
  methods: {
    getUserIfor() {
      window.localStorage.getItem("userName") &&
        (this.obj.userName = window.localStorage.getItem("userName"));
    },
    goLogin() {
      window.localStorage.removeItem("userName");
      this.$router.push("/login");
    },
    goRegister() {
      this.$router.push("/register");
    }
  }
};
</script>

<style scoped>
.per {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
  position: fixed;
  bottom: 50px;
  left: 0;
}

.login,
.register {
  flex: 1;
  padding: 5px;
}
.bg {
  text-align: center;
}
.name {
  font-size: 14px;
  text-align: center;
}

.my {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}
</style>