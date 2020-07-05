<template>
  <div>
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack" />

    <!-- 表单组件 -->
    <div class="register-panel">
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

      <div class="register-button">
        <van-button :loading="openLoading" @click="regiserAction" type="primary" size="large">马上注册</van-button>
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
      this.checkForm() && this.axiosRegisterUser();
    },
    async axiosRegisterUser() {
      const response = await axios({
        url: url.registerUser,
        method: "post",
        data: {
          userName: this.username,
          password: this.password
        }
      });
      console.log(response);
      if (response.data.code == 200) {
        this.$router.push("/login");
        Toast.success("注册成功");
        window.localStorage.removeItem("userName");
      } else {
        Toast.fail("注册失败");
        this.openLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.register-button {
  padding-top: 10px;
}
</style>
