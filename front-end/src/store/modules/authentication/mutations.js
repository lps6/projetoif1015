import Vue from "vue";

export default {
  SET_PROFILE_PIC_URL(state, payload) {
    Vue.set(state, "profile_pic_url", payload);
  },
  SET_NAME(state, payload) {
    Vue.set(state, "name", payload);
  },
  SET_EMAIL(state, payload) {
    Vue.set(state, "email", payload);
  },
  SET_UUID(state, payload) {
    Vue.set(state, "uuid", payload);
  },
  SET_IS_REGISTERED(state, payload) {
    Vue.set(state, "is_registered", payload);
  }
};
