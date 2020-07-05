import Vue from "vue";
import VueRouter from "vue-router";
import ShoppingMall from "../views/ShoppingMall.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Goods from "../views/Goods.vue";
import Cart from "../views/Cart.vue";
import Main from "../views/Main.vue";
import Contact from "../views/Contact.vue";
import CategoryList from "../views/CategoryList.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // name: "Main",
    component: Main,
    children: [
      {
        path: "/",
        name: "ShoppingMall",
        component: ShoppingMall
      },
      {
        path: "/categoryList",
        name: "CategoryList",
        component: CategoryList
      },
      {
        path: "/cart",
        name: "Cart",
        component: Cart
      },
      {
        path: "/contact",
        name: "Contact",
        component: Contact
      }
    ]
  },

  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/goods",
    name: "Goods",
    component: Goods
  }
];

const router = new VueRouter({
  routes
});

export default router;
