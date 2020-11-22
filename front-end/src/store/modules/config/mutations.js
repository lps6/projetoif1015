import Vue from "vue";

export default {
  SET_VALUE(state, payload) {
    Vue.set(state, "values", payload);
  }
};
