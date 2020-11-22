import Vue from "vue";
import Vuex from "vuex";

import authentication from "@/store/modules/authentication/index";
import apoio from "@/store/modules/apoio/index";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { authentication, apoio }
});
