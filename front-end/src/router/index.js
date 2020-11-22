import Vue from "vue";
import VueRouter from "vue-router";

// Login
import Login from "@/views/authentication/Login.vue";
import PreCadastro from "@/views/authentication/PreCadastro.vue";
import Cadastro from "@/views/authentication/Cadastro.vue";
import VisaoGeralAcionista from "@/views/acionista/VisaoGeralAcionista.vue";
import ConfigNotification from "@/views/acionista/ConfigNotification.vue";
import ProjecaoRendimentos from "@/components/acionista/ProjecaoRendimentos.vue";
import ExtratoFinanceiroAcionista from "@/views/acionista/ExtratoFinanceiroAcionista.vue";
import MeusSaques from "@/views/acionista/MeusSaques.vue";
import ContasBancarias from "@/components/acionista/ContasBancarias.vue";
import ContaBancaria from "@/components/acionista/ContaBancaria.vue";
import Saque from "@/components/acionista/Saque.vue";
import ComprarAcoes from "@/components/acionista/ComprarAcoes.vue";
import VenderAcoes from "@/components/acionista/VenderAcoes.vue";
import AvisosTermos from "@/components/acionista/AvisosTermos.vue";
import DetalhesContrato from "@/components/acionista/DetalhesContrato.vue";
import ContratoRejeitado from "@/components/acionista/ContratoRejeitado.vue";
import MinhasAcoes from "@/views/acionista/MinhasAcoes.vue";
import MudarSenha from "@/views/acionista/MudarSenha.vue";
import Documentos from "@/views/acionista/Documentos.vue";
import MeusDados from "@/views/acionista/MeusDados.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    alias: "/",
    name: "login",
    component: Login,
    meta: {
      navDrawer: false
    }
  },
  {
    path: "/pre-cadastro",
    name: "preCadastro",
    component: PreCadastro,
    meta: {
      navDrawer: false
    }
  },
  {
    path: "/cadastro",
    name: "cadastro",
    component: Cadastro,
    meta: {
      navDrawer: false
    }
  },
  {
    path: "/dashboard/acionista/visao-geral",
    name: "visaoGeralAcionista",
    component: VisaoGeralAcionista,
    meta: {
      navDrawer: true,
      permissao: "acionista"
    }
  },
  {
    path: "/dashboard/acionista/configuracoes",
    name: "configNotification",
    component: ConfigNotification,
    meta: {
      navDrawer: true,
      permissao: "acionista"
    }
  },
  {
    path: "/dashboard/acionista/visao-geral/projecao-rendimentos",
    name: "projecaoRendimentos",
    component: ProjecaoRendimentos,
    meta: {
      navDrawer: false,
      permissao: "acionista"
    }
  },
  {
    path: "/dashboard/acionista/extrato-financeiro",
    name: "extratoFinanceiroAcionista",
    component: ExtratoFinanceiroAcionista,
    meta: {
      navDrawer: true,
      permissao: "acionista"
    }
  },
  {
    path: "/dashboard/acionista/meus-saques",
    name: "meusSaques",
    component: MeusSaques,
    meta: {
      navDrawer: true,
      permissao: "acionista"
    }
  },
  {
    path: "/dashboard/acionista/meus-saques/contas-bancarias",
    name: "contasBancarias",
    component: ContasBancarias,
    meta: {
      navDrawer: false,
      permissao: "acionista"
    }
  },
  {
    path:
      "/dashboard/acionista/meus-saques/contas-bancarias/editar-conta-bancaria",
    name: "editContaBancaria",
    component: ContaBancaria,
    meta: {
      navDrawer: false,
      permissao: "acionista"
    }
  },
  {
    path: "/dashboard/acionista/meus-saques/adicionar-conta-bancaria",
    name: "addContaBancaria",
    component: ContaBancaria,
    meta: {
      navDrawer: false,
      permissao: "acionista"
    }
  },
  {
    path: "/dashboard/acionista/meus-saques/sacar",
    name: "saque",
    component: Saque,
    meta: {
      navDrawer: false,
      permissao: "acionista"
    }
  },
  {
    path: "/dashboard/acionista/minhas-acoes",
    name: "minhasAcoes",
    component: MinhasAcoes,
    meta: {
      navDrawer: true,
      permissao: "acionista"
    }
  },
  {
    path: "/dashboard/acionista/minhas-acoes/comprar-acoes",
    name: "comprarAcoes",
    component: ComprarAcoes,
    meta: {
      navDrawer: false,
      permissao: "acionista"
    }
  },
  {
    path: "/dashboard/acionista/minhas-acoes/vender-acoes",
    name: "venderAcoes",
    component: VenderAcoes,
    meta: {
      navDrawer: false,
      permissao: "acionista"
    }
  },
  {
    path: "/dashboard/acionista/minhas-acoes/avisos-e-termos",
    name: "avisosTermos",
    component: AvisosTermos,
    meta: {
      navDrawer: false,
      permissao: "acionista"
    }
  },
  {
    path: "/dashboard/acionista/mudar-senha",
    name: "mudarSenha",
    component: MudarSenha,
    meta: {
      navDrawer: false,
      permissao: "acionista"
    }
  },
  {
    path: "/dashboard/acionista/meus-dados",
    name: "meusDados",
    component: MeusDados,
    meta: {
      navDrawer: true,
      permissao: "acionista"
    }
  },
  {
    path: "/dashboard/acionista/documentos",
    name: "documentos",
    component: Documentos,
    meta: {
      navDrawer: true,
      permissao: "acionista"
    }
  },
  {
    path: "/dashboard/acionista/minhas-acoes/detalhesContrato",
    name: "detalhesContrato",
    component: DetalhesContrato,
    meta: {
      navDrawer: false,
      permissao: "acionista"
    }
  },
  {
    path: "/dashboard/acionista/minhas-acoes/contratoRejeitado",
    name: "contratoRejeitado",
    component: ContratoRejeitado,
    meta: {
      navDrawer: false,
      permissao: "acionista"
    }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

export default router;
