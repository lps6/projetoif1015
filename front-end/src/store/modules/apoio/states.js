// estado inicial desse modulo
export default {
  paginaCarregando: false,
  paginaErro: null,
  paginaAtual: {
    pagina: null,
    acoes: []
  },
  navegacao: [],
  disabler: false,
  messageTop: {
    class: "",
    message: "",
    status: false,
    icon: ""
  },
  formatoMoney: {
    decimal: ",",
    thousands: ".",
    prefix: "R$ ",
    suffix: " #",
    precision: 2,
    masked: false
  },
  expandedDrawer: true,
  expandedDrawerMobile: false,
  expandedContent: false,
  sonsState: [false, false, false],
  selectedState: {}
};
