import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import {
  Button,
  Col,
  Row,
  Swipe,
  SwipeItem,
  Lazyload,
  List,
  Field,
  NavBar,
  Tab,
  Tabs,
  PullRefresh,
  Tabbar,
  TabbarItem,
  Stepper,
  Steps,
  Step
} from "vant";
Vue.use(Button)
  .use(Step)
  .use(Steps)
  .use(Col)
  .use(Row)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(List)
  .use(Field)
  .use(NavBar)
  .use(Tab)
  .use(Tabs)
  .use(PullRefresh)
  .use(TabbarItem)
  .use(Tabbar)
  .use(Stepper);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
