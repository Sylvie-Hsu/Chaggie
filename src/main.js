import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import Routes from "./routes";
import SuiVue from "semantic-ui-vue";
import "semantic-ui-css/semantic.min.css";

// Use packages
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(SuiVue);

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
