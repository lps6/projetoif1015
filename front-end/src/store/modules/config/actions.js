/* eslint-disable no-unused-vars */
import { api, getCep } from "@/services";

export default {
  sendNotification: async function({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      try {
        let { userID, stockID, targetPrice, operations } = payload;

        let route;
        let action;

        route = "stocks/trackers";
        action = "post";
        api[action](route, {
          userID,
          stockID,
          targetPrice,
          operations
        })
          .then(response => {
            if (response.data) {
              if (response.data.status === 200) {
                dispatch("requestValues");
                resolve(response.data);
              }
            } else {
              reject(response);
            }
          })
          .catch(error => {
            reject(error);
          });
      } catch (err) {
        reject(err);
      }
    });
  },
  requestValues: async function({ dispatch, commit }) {
    return new Promise((resolve, reject) => {
      api
        .get("stocks/")
        .then(response => {
          console.log("response", response);
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /*sendNotification: async function({ dispatch, commit }, payload) {
    const params = {
      userID: 1,
      stockID: payload.stockID,
      targetPrice: payload.targetPrice,
      operations: payload.operations
    };
    var res = await api.post("stocks/trackers", params).catch(function(error) {
      return error.response;
    });
    if (res.status === 200) {
      console.log("resquest");
      dispatch("requestValues");
      return res.data;
    }
  },
  requestValues: async function({ state, commit }) {
    var res = await api.get("stocks/").catch(function(error) {
      return error.response;
    });
    return res.data;
  },*/
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
