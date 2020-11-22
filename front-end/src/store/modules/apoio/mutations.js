import Vue from "vue";

export default {
  // Setar o carregando página
  SETAR_PAGINA_CARREGANDO(state, boolean) {
    state.paginaCarregando = boolean;
  },
  // Setar página de erro
  SETAR_PAGINA_DE_ERRO(state, pagina) {
    state.paginaErro = pagina;
  },
  // Setar página de erro
  SETAR_PAGINA_ATUAL(state, pagina) {
    state.paginaAtual = pagina;
  },
  // Setar página de erro
  SETAR_NAVEGACAO(state, navInfo) {
    if (state.navegacao.length === 0 && localStorage.getItem("navegacao")) {
      state.navegacao = JSON.parse(localStorage.getItem("navegacao"));
    }

    if (navInfo && navInfo.limpar) {
      state.navegacao = [];
      localStorage.removeItem("navegacao");
    }

    if (state.navegacao.length > 0) {
      let mapeamento = state.navegacao.map(e => {
        return e.text;
      });
      if (mapeamento.indexOf(navInfo.pagina.text) >= 0)
        state.navegacao.splice(mapeamento.indexOf(navInfo.pagina.text));
    }

    if (state.navegacao.length > 1) {
      // delete state.navegacao[state.navegacao.length - 1].disabled
    }
    state.navegacao.push(navInfo.pagina);
    localStorage.setItem("navegacao", JSON.stringify(state.navegacao));
  },
  // Seta disabler (cinza na tela)
  SET_DISABLER(state, disablerStatus) {
    state.disabler = disablerStatus;
  },
  // messageTop schema = {class: String, message: String, status: Boolean}
  SET_MESSAGETOP(state, messageTop) {
    Vue.set(state, "messageTop", messageTop);
    setTimeout(() => {
      Vue.set(state.messageTop, "status", false);
    }, 4000);
  },
  SET_EXPANDEDDRAWER(state, value) {
    if (typeof value === "boolean") {
      state.expandedDrawer = value;
    } else {
      state.expandedDrawer = !state.expandedDrawer;
    }
  },
  // Payload = {index: indice, value: boolean}
  SET_EXPANDEDSONS(state, payload) {
    for (let i = 0; i < state.sonsState.length; i++) {
      Vue.set(state.sonsState, i, false);
    }
    Vue.set(state.sonsState, payload.index, payload.value);
  },
  SET_EXPANDEDCONTENT(state) {
    setTimeout(() => {
      state.expandedContent = !state.expandedDrawer;
    }, 100);
  },
  SET_SELECTEDOBJECT(state, payload) {
    if (!state.selectedState[payload.title]) {
      Vue.set(state.selectedState, payload.title, false);
    }
  },
  SET_SELECTEDSTATE(state, payload) {
    for (const key in state.selectedState) {
      // eslint-disable-next-line no-prototype-builtins
      if (state.selectedState.hasOwnProperty(key)) {
        Vue.set(state.selectedState, key, false);
      }
    }
    Vue.set(state.selectedState, payload.title, true);
  },
  EXPAND_NAVDRAWER_MOBILE(state, payload) {
    state.expandedDrawerMobile = payload;
  }
};
