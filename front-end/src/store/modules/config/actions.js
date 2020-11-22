/* eslint-disable no-unused-vars */
import { api, getCep } from "@/services";

export default {
  sendNotification: async function({ state, commit }, payload) {
    const params = {
      userID: 1,
      stockID: payload.stockID,
      targetPrice: payload.targetPrice,
      operations: payload.operations
    };
    var res = await api.post("stocks/trackers", params).catch(function(error) {
      return error.response;
    });
    console.log(res.data);
    return res.data;
  },
  requestValues: async function({ state, commit }) {
    var res = await api.get("stocks/").catch(function(error) {
      return error.response;
    });
    console.log(res);
  },
  requestPreRegister: async function({ state, commit }, payload) {
    var res = await api
      .post("investor/pre_register", payload)
      .catch(function(error) {
        return error.response;
      });
    if (res.status === 200) {
      return res.data;
    } else {
      return res.data.code;
    }
  }
};
