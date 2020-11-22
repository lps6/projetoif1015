/* eslint-disable no-unused-vars */
import { api, getCep } from "@/services";

export default {
  requestEmail: async function({ state, commit }, payload) {
    const params = {
      email: payload
    };
    var res = await api
      .post("investor/check_register", params)
      .catch(function(error) {
        return error.response;
      });
    return res.data;
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
  },
  requestGetCEP: async function({ state, commit }, payload) {
    var res = await getCep(payload);
    return res;
  },
  requestRegisterStep: async function({ state, commit }, payload) {
    var res = await api
      .get("investor/" + payload + "/register/step")
      .catch(function(error) {
        return error.response;
      });
    return res.data;
  },
  requestSetRegisterStep: async function({ state, commit }, payload) {
    var res = await api
      .put("investor/" + payload.uuid + "/register/step", {
        step: payload.value
      })
      .catch(function(error) {
        return error.response;
      });
    return res.data;
  },
  requestUploadProfilePicture: async function({ state, commit }, payload) {
    var res = await api
      .post("investor/" + payload.uuid + "/register/profile_picture", {
        picture: payload.value
      })
      .catch(function(error) {
        return error.response;
      });
    return res.data;
  },
  requestUploadSelfiePicture: async function({ state, commit }, payload) {
    var res = await api
      .post("investor/" + payload.uuid + "/register/selfie_picture", {
        picture: payload.value
      })
      .catch(function(error) {
        return error.response;
      });
    return res.data;
  },
  requestStoreRG: async function({ state, commit }, payload) {
    var res = await api
      .post("investor/" + payload.uuid + "/register/rg", payload.form)
      .catch(function(error) {
        return error.response;
      });
    return res.data;
  },
  requestStoreCNH: async function({ state, commit }, payload) {
    var res = await api
      .post("investor/" + payload.uuid + "/register/cnh", payload.form)
      .catch(function(error) {
        return error.response;
      });
    return res.data;
  },
  requestStorePassport: async function({ state, commit }, payload) {
    var res = await api
      .post("investor/" + payload.uuid + "/register/passport", payload.form)
      .catch(function(error) {
        return error.response;
      });
    return res.data;
  },
  requestStoreAddress: async function({ state, commit }, payload) {
    var res = await api
      .post("investor/" + payload.uuid + "/register/address", payload.form)
      .catch(function(error) {
        return error.response;
      });
    return res.data;
  },
  requestStorePassword: async function({ state, commit }, payload) {
    var res = await api
      .post("investor/" + payload.uuid + "/register/password", {
        password: payload.value
      })
      .catch(function(error) {
        return error.response;
      });
    return res.data;
  },
  requestCheckCPF: async function({ state, commit }, payload) {
    var res = await api
      .post("investor/" + payload.uuid + "/register/cpf", {
        cpf: payload.value
      })
      .catch(function(error) {
        return error.response;
      });
    return res.data;
  },
  requestMatchCPF: async function({ state, commit }, payload) {
    var res = await api
      .post("investor/" + payload.uuid + "/register/match", payload.form)
      .catch(function(error) {
        return error.response;
      });
    return res.data;
  },
  requestStoreMaritalStatus: async function({ state, commit }, payload) {
    var res = await api
      .post(
        "investor/" + payload.uuid + "/register/marital_status",
        payload.form
      )
      .catch(function(error) {
        return error.response;
      });
    return res.data;
  }
};
