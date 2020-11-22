import Vue from "vue";
import VueMq from "vue-mq";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueTheMask from "vue-the-mask";
import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
import exportingInit from "highcharts/modules/exporting";
import VueSSE from "vue-sse";

Vue.config.productionTip = false;

Vue.use(VueTheMask);
Vue.use(HighchartsVue);
Vue.use(VueSSE);
exportingInit(Highcharts);

Vue.use(VueMq, {
  breakpoints: {
    // default breakpoints - customize this
    xs: 600,
    sm: 960,
    md: 1264,
    lg: 1904,
    xl: Infinity
  },
  defaultBreakpoint: "lg"
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
