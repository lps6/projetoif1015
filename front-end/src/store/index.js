import Vue from "vue";
import Vuex from "vuex";

import authentication from "@/store/modules/authentication/index";
import apoio from "@/store/modules/apoio/index";
import config from "@/store/modules/config/index";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { authentication, apoio, config }
});
