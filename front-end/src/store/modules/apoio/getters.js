export default {
  // Página de carregando
  paginaCarregando(state) {
    return state.paginaCarregando;
  },
  // Página de erro
  paginaErro(state) {
    return state.paginaErro;
  },
  // Página atual
  navegacao(state) {
    return state.navegacao;
  },
  disabler(state) {
    return state.disabler;
  },
  // validações
  cnpjValido: () => cnpj => {
    if (cnpj.length !== 14) {
      return false;
    } else {
      let soma1 =
        cnpj[0] * 5 +
        cnpj[1] * 4 +
        cnpj[2] * 3 +
        cnpj[3] * 2 +
        cnpj[4] * 9 +
        cnpj[5] * 8 +
        cnpj[6] * 7 +
        cnpj[7] * 6 +
        cnpj[8] * 5 +
        cnpj[9] * 4 +
        cnpj[10] * 3 +
        cnpj[11] * 2;
      let soma2 =
        cnpj[0] * 6 +
        cnpj[1] * 5 +
        cnpj[2] * 4 +
        cnpj[3] * 3 +
        cnpj[4] * 2 +
        cnpj[5] * 9 +
        cnpj[6] * 8 +
        cnpj[7] * 7 +
        cnpj[8] * 6 +
        cnpj[9] * 5 +
        cnpj[10] * 4 +
        cnpj[11] * 3 +
        cnpj[12] * 2;

      let resto1 = soma1 % 11 < 2 ? 0 : 11 - (soma1 % 11);
      let resto2 = soma2 % 11 < 2 ? 0 : 11 - (soma2 % 11);

      if (resto1.toString() === cnpj[12] && resto2.toString() === cnpj[13]) {
        return true;
      } else {
        return false;
      }
    }
  },
  mascaraMoeda: () => valor => {
    valor = valor ? valor.toString() : "";

    let mask = "";
    if (valor.length === 1) mask = "_,#";
    if (valor.length === 2) mask = "_,##";
    if (valor.length > 2) {
      for (let i = 0, l = valor.length; i < l; i++) {
        mask = i === 1 ? ",#" + mask : "#" + mask;
      }
    }
    return mask + "#";
  },
  formatoMoney(state) {
    return state.formatoMoney;
  },
  messageTop(state) {
    return state.messageTop;
  },
  expandedDrawer(state) {
    return state.expandedDrawer;
  },
  expandedDrawerMobile(state) {
    return state.expandedDrawerMobile;
  },
  sonsState(state) {
    return state.sonsState;
  },
  expandedContent(state) {
    return state.expandedContent;
  },
  selectedState(state) {
    return state.selectedState;
  }
};
