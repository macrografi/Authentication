import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(axios);


Vue.axios = Vue.prototype.$http = axios.create({
  baseUrl: "http://localhost:8080"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
