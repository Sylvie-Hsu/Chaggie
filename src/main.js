import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import Routes from "./routes";
import SuiVue from "semantic-ui-vue";
import "semantic-ui-css/semantic.min.css";
import COS from "cos-js-sdk-v5";
import SecretIDKey from "./secretIDKey.js";
// import axios from "axios";

// Use packages
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(SuiVue);

Vue.prototype.$apiPath = "http://101.132.135.132/api/v3";

Vue.prototype.$cos = new COS(SecretIDKey);

// Vue.use(axios);
// Vue.prototype.$axios = axios;

// Register routes
const router = new VueRouter({
  routes: Routes
  // mode: "history"
});

// Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router: router
}).$mount("#app");
