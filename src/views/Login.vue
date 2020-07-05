<template>
  <div>
    <van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="goBack" />

    <!-- 表单组件 -->
    <div class="Login-panel">
      <van-field
        v-model="username"
        label="用户名"
        clearable
        :error-message="usernameErrorMsg"
        left-icon="contact"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username = ''"
      />

      <van-field
        v-model="password"
        type="password"
        clearable
        left-icon="closed-eye"
        label="密码"
        :error-message="passwordErrorMsg"
        placeholder="请输入密码"
        required
      />

      <div class="Login-button">
        <van-button :loading="openLoading" @click="regiserAction" type="primary" size="large">登录</van-button>
      </div>
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
      username: "",
      password: "",
      openLoading: false,
      usernameErrorMsg: "",
      passwordErrorMsg: ""
    };
  },
  created() {
    const a = JSON.parse(localStorage.getItem("userName"));
    if (a) {
      Toast.success("您已经登录");
      this.$router.push("/");
    }
  },

  methods: {
    checkForm() {
      let isOk = true;
      if (this.username.length < 5) {
        this.usernameErrorMsg = "用户名不能小于5位";
        isOk = false;
      } else {
        this.usernameErrorMsg = "";
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = "密码不能小于6位";
        isOk = false;
      } else {
        this.passwordErrorMsg = "";
      }
      return isOk;
    },
    goBack() {
      this.$router.go(-1);
    },
    regiserAction() {
      this.checkForm() && this.axiosLoginUser();
    },
    async axiosLoginUser() {
      this.openLoading = true;
      const response = await axios({
        url: url.loginUser,
        method: "post",
        data: {
          userName: this.username,
          password: this.password
        }
      });
      console.log(response, 1111);
      if (response.data.code == 200) {
        //保存用户信息
        new Promise((resolve, reject) => {
          // localStorage.userInfo = { userName: this.username };
          const userInfo = localStorage.setItem(
            "userName",
            JSON.stringify(this.username)
          );
          setTimeout(() => {
            resolve();
          }, 500);
        })
          .then(() => {
            Toast.success("登录成功");
            this.$router.push("/");
          })
          .catch(err => {
            Toast.fail("登录状态保持失败");
            console.log(err);
          });
      } else {
        Toast.fail("登录失败");
        this.openLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.Login-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.Login-button {
  padding-top: 10px;
}
</style>
