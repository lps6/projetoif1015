/* eslint-disable no-unused-vars */
import { api } from "@/services";

export default {
  // levar para o topo da página
  topoPagina() {
    document.documentElement.scrollTop = 0;
  },
  expandDrawer({ commit }, value) {
    commit("SET_EXPANDEDDRAWER", value);
  },
  // payload = {index: index of the item, value: true/false}
  expandSons({ commit }, payload) {
    commit("SET_EXPANDEDSONS", payload);
  },
  expandContent({ commit }) {
    commit("SET_EXPANDEDCONTENT");
  }
};
