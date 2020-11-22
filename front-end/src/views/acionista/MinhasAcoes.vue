<template>
  <div>
    <v-container fluid class="p-0 m-0" v-if="projecaoRendimentos">
      <ProjecaoRendimentos></ProjecaoRendimentos>
    </v-container>
    <v-container
      fluid
      class="vg-acionista-wrapper p-0"
      v-if="!projecaoRendimentos"
    >
      <v-row>
        <v-col cols="12" class="p-0 m-0">
          <div class="section-header">
            <SectionHeader
              sectionText="MINHAS AÇÕES"
              sectionTextColor="#888990"
            ></SectionHeader>
          </div>
        </v-col>
        <v-row class="content-wrapper">
          <v-col cols="12" class="p-0 m-0">
            <v-row class="pr-3 pl-3">
              <v-col cols="7" class="pl-0 pr-2">
                <InfoRounded
                  text="VALOR EM AÇÕES"
                  infoSize="80px"
                  value="R$20.000,00"
                  bgColor="#FFFFFF"
                  textColor="#454B60"
                  valueColor="#454B60"
                ></InfoRounded>
                <InfoRounded
                  text="AÇÕES ATIVAS"
                  class="mt-4"
                  infoSize="58px"
                  value="500"
                  bgColor="#454B60"
                  textColor="#FFFFFF"
                  valueColor="#FFFFFF"
                ></InfoRounded>
              </v-col>
              <v-col cols="5" class="pl-2 pr-2">
                <div
                  class="perguntas-frequentes-wrapper d-flex align-center justify-center"
                >
                  <div class="d-flex border-style">
                    <p class="p-0 m-0">PERGUNTAS FREQUENTES</p>
                    <div class="rounded-style" :style="{ left: leftPosition }">
                      <p class="p-0 m-0 c-white">?</p>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="p-0 m-0">
            <v-row>
              <v-col cols="12">
                <v-data-table
                  :headers="headers"
                  :items="table_items"
                  :page.sync="page"
                  :items-per-page="itemsPerPage"
                  hide-default-footer
                  class="table-style"
                  @page-count="pageCount = $event"
                >
                  <template v-slot:top>
                    <v-toolbar flat class="table-title">
                      <v-toolbar-title>MEUS CONTRATOS</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <RoundedBtn
                        text="COMPRAR AÇÕES"
                        colorBtn="#77B083"
                        bgColorIcon="#5C8D67"
                        class="actions-style mr-4"
                        offsetBtnIcon="90%"
                        btnIcon="shopping_cart"
                        btnIconSize="13px"
                        @click="buySharesHandler()"
                      ></RoundedBtn>
                      <RoundedBtn
                        text="VENDER AÇÕES"
                        colorBtn="#FA983D"
                        class="actions-style"
                        offsetBtnIcon="90%"
                        bgColorIcon="#E87D19"
                        btnIconSize="13px"
                        btnIcon="fas fa-dollar-sign"
                        @click="sellSharesHandler()"
                      ></RoundedBtn>
                    </v-toolbar>
                  </template>
                  <template v-slot:item.tipo="{ item }">
                    <v-chip :color="getColor(item.tipo)" dark>{{
                      item.tipo
                    }}</v-chip>
                  </template>
                  <template v-slot:item.status="{ item }">
                    <v-chip :color="getColor(item.status)" dark>{{
                      item.status
                    }}</v-chip>
                  </template>
                  <template v-slot:item.opcoes="{ item }">
                    <div
                      class="opcoes-wrapper"
                      @click="opcoesHandler(item.opcoes)"
                    >
                      <p class="m-0 p-0">{{ item.opcoes }}</p>
                      <div
                        class="round-btn-icon"
                        :style="{
                          left: offsetBtnIcon,
                          backgroundColor: getColor(item.opcoes)
                        }"
                      >
                        <v-icon class="icon-style" dark right>
                          {{ getBtnIcon(item.opcoes) }}
                        </v-icon>
                      </div>
                    </div>
                  </template>
                </v-data-table>
                <div class="text-center pt-2">
                  <v-pagination
                    v-model="page"
                    :length="pageCount"
                  ></v-pagination>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SectionHeader from "@/components/general/SectionHeader";
import InfoRounded from "@/components/acionista/InfoRounded";
import RoundedBtn from "@/components/authentication/RoundedBtn";
import { mapMutations } from "vuex";

export default {
  name: "MinhasAcoes",
  components: {
    SectionHeader,
    InfoRounded,
    RoundedBtn
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        {
          text: "CÓDIGO",
          align: "center",
          sortable: false,
          value: "nome"
        },
        { text: "TIPO", value: "tipo", align: "center" },
        { text: "VALOR", value: "valor", align: "center" },
        { text: "AÇÕES", value: "acoes", align: "center" },
        { text: "STATUS", value: "status", align: "center" },
        { text: "OPÇÕES", value: "opcoes", align: "center" }
      ],
      table_items: [
        {
          nome: "CONT00001",
          tipo: "COMPRA",
          valor: "R$ 1.000.000,00",
          acoes: "40.000",
          status: "AGUARDANDO ASSINATURA",
          opcoes: "ASSINAR"
        },
        {
          nome: "CONT00002",
          tipo: "COMPRA",
          valor: "R$ 5.000,00",
          acoes: "200",
          status: "ATIVO",
          opcoes: "VER CONTRATO"
        },
        {
          nome: "CONT00003",
          tipo: "VENDA",
          valor: "- R$ 2.500,00",
          acoes: "100",
          status: "ATIVO",
          opcoes: "VER CONTRATO"
        },
        {
          nome: "CONT00004",
          tipo: "VENDA",
          valor: "R$ 500.000,00",
          acoes: "2.000",
          status: "ATIVO",
          opcoes: "VER CONTRATO"
        },
        {
          nome: "CONT00005",
          tipo: "COMPRA",
          valor: "R$ 525.000,00",
          acoes: "2.500",
          status: "REJEITADO",
          opcoes: "VER DETALHES"
        },
        {
          nome: "CONT00006",
          tipo: "VENDA",
          valor: "- R$ 2.500,00",
          acoes: "100",
          status: "ATIVO",
          opcoes: "VER CONTRATO"
        },
        {
          nome: "CONT00007",
          tipo: "COMPRA",
          valor: "R$ 1.000.000,00",
          acoes: "40.000",
          status: "REJEITADO",
          opcoes: "VER DETALHES"
        },
        {
          nome: "CONT00008",
          tipo: "VENDA",
          valor: "- R$ 2.500,00",
          acoes: "100",
          status: "ATIVO",
          opcoes: "VER CONTRATO"
        }
      ],
      projecaoRendimentos: false,
      rendimentos: {
        chart: {
          marginLeft: 50,
          marginRight: 50,
          borderRadius: 30
        },
        navigation: {
          buttonOptions: {
            x: -35
          }
        },
        title: {
          text: "HISTÓRICO DE RENDIMENTOS",
          align: "left",
          margin: 30,
          x: 38,
          y: 30,
          style: {
            color: "#303767",
            font: 'bold 18px "DroidSansBolder", sans-serif',
            fontWeight: 800
          }
        },
        credits: {
          enabled: false
        },
        xAxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          crosshair: true
        },
        yAxis: {
          gridLineDashStyle: "longdash",
          labels: {
            enabled: false,
            format: "{value}%",
            style: {
              color: "#303767"
            }
          },
          title: {
            text: "",
            offset: 50,
            style: {
              fontWeight: 800
            }
          }
        },
        series: [
          {
            name: "Máximo",
            type: "spline",
            marker: {
              enabled: false,
              symbol: "",
              lineColor: "#FA8D28"
            },
            tooltip: {
              valueSuffix: " %"
            },
            color: "#FA8D28",
            data: [
              49.9,
              71.5,
              106.4,
              129.2,
              144.0,
              176.0,
              135.6,
              148.5,
              216.4,
              194.1,
              95.6,
              54.4
            ]
          },
          {
            name: "Rendimento",
            type: "column",
            marker: {
              symbol: "circle",
              lineColor: "#54D8FF"
            },
            color: "#FA973B99",
            tooltip: {
              valuePrefix: "R$"
            },
            data: [
              49.9,
              71.5,
              106.4,
              129.2,
              144.0,
              176.0,
              135.6,
              148.5,
              216.4,
              194.1,
              95.6,
              54.4
            ]
          }
        ]
      }
    };
  },
  props: {
    text: {
      type: String
    },
    textColor: {
      type: String,
      default: "#FFFFFF"
    },
    value: {
      type: String,
      default: "R$"
    },
    valueColor: {
      type: String,
      default: "#FFFFFF"
    },
    infoSize: {
      type: String,
      default: "15px"
    },
    bgColor: {
      type: String,
      default: "#454B60"
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    offsetBtnIcon() {
      if (this.$mq === "xs") {
        return "88%";
      } else {
        return "93.8%";
      }
    },
    leftPosition() {
      if (this.$mq === "xs") {
        return "88%";
      } else {
        return "85%";
      }
    }
  },
  methods: {
    ...mapMutations(["SET_EXPANDEDDRAWER"]),
    clickHandler() {
      this.$emit("click");
    },
    getImage(image) {
      return image ? require(`@/assets/images/${image}`) : "";
    },
    showProjecaoRendimentos() {
      this.SET_EXPANDEDDRAWER(true);
      this.projecaoRendimentos = !this.projecaoRendimentos;
    },
    sellSharesHandler() {
      this.$router.push({ name: "venderAcoes" });
    },
    buySharesHandler() {
      this.$router.push({ name: "comprarAcoes" });
    },
    getColor(val) {
      if (val === "COMPRA" || val === "ATIVO" || val === "VER CONTRATO") {
        // green
        return "#76AF83";
      } else if (
        val === "VENDA" ||
        val === "AGUARDANDO ASSINATURA" ||
        val === "ASSINAR"
      ) {
        // orange
        return "#FA8D28";
      } else if (val === "SAQUE") {
        // dark blue
        return "#454B60";
      } else if (val === "REJEITADO" || val === "VER DETALHES") {
        // wine
        return "#C96A6A";
      } else {
        return "#000000";
      }
    },
    getBtnIcon(val) {
      if (val === "VER DETALHES") {
        return "add";
      } else {
        return "keyboard_arrow_right";
      }
    },
    opcoesHandler(option) {
      if (option === "ASSINAR") {
        this.$router.push({ name: "avisosTermos" });
      } else if (option === "VER CONTRATO") {
        this.$router.push({ name: "detalhesContrato" });
      } else if (option === "VER DETALHES") {
        this.$router.push({ name: "contratoRejeitado" });
      } else {
        return "";
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/globalStyles.scss";

.vg-acionista-wrapper {
  background-color: #e9e9e9;
  min-height: 100vh;
}
.content-wrapper {
  padding-left: 0.5rem;
  padding-right: 2rem;
  padding-top: 0.5rem;
}
.img-style {
  width: 100%;
  height: auto;
  object-fit: cover;
}
.img-wrapper {
  position: relative;
}
.question-wrapper {
  position: absolute;
  top: 25px;
  width: 27px;
  height: 27px;
  background-color: #ffffffd6;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 25px;
}
.question-style {
  color: #303767;
  font-weight: 800;
}
.projecao-btn {
  position: absolute;
  top: 225px;
  left: 20px;
}
.btn-style {
  width: 340px;
  height: 45px !important;
}
.btn-style:hover {
  width: 340px;
  height: 45px !important;
}
.table-style {
  border-radius: 20px !important;
  box-shadow: none !important;
  border-width: thin 1px 1px 1px;
  border: 1px solid #fff;
}
.opcoes-wrapper {
  border-width: thin 1px 1px 1px;
  border: 1px solid #454b60;
  border-radius: 20px;
  padding: 1px 0px;
  width: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 0.775rem;
    font-family: $font-secondary;
    font-weight: 800;
  }
}
.opcoes-wrapper:hover {
  cursor: pointer;
}

.round-btn-icon {
  width: 18px;
  height: 18px;
  border-radius: 30px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    font-size: 16px;
    margin-left: 0px;
  }
}
.perguntas-frequentes-wrapper {
  min-height: 100%;
  margin: 0;
  padding: 0;
  background-image: url(~@/assets/images/projecao-rendimentos-bg.png);
  display: flex;
  flex-direction: column;
  background-size: cover;
  border-radius: 20px;
  background-position: bottom;
}
.border-style {
  background-color: #ebeced;
  padding: 10px 60px;
  border-radius: 30px;
  position: relative;
  .rounded-style {
    width: 32px;
    height: 32px;
    background-color: #fa8d28;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 11%;
  }
  p {
    color: #303767;
    font-size: 15px;
    font-family: $font-main-bolder;
  }
}
.border-style:hover {
  cursor: pointer;
}
.c-white {
  color: #ffffff !important;
}
::v-deep .actions-style {
  width: 220px;
  span {
    font-family: $font-main;
    font-weight: 600;
    font-size: 14px;
  }
}
::v-deep .table-style {
  .v-data-table__wrapper {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
}
::v-deep table {
  .v-data-table-header {
    background-color: #454b60;
  }
  thead tr th {
    color: #ffffff !important;
    i {
      color: #ffffff !important;
    }
  }
  tbody tr:nth-child(odd):hover {
    background-color: #eeeeee;
  }
  tbody tr:nth-child(even):hover {
    background-color: #ffffff !important;
  }
  tbody tr {
    height: 60px;
    .v-chip.v-size--default {
      height: 25px !important;
    }
    .v-chip .v-chip__content {
      font-size: 0.775rem;
      justify-content: center;
      width: 159px;
    }
    .v-chip {
      padding: 0 20px;
    }
  }
  tbody tr:nth-child(odd) {
    background-color: #eeeeee;
  }
  tbody tr td {
    font-size: 0.775rem;
    border: #eeeeee !important;
  }
}
::v-deep .table-title {
  border-radius: 20px !important;
  box-shadow: none !important;
  border-width: thin 1px 1px 1px;
  border: 1px solid #fff;
  height: 80px !important;
  .v-toolbar__title {
    color: #303767;
    font-family: $font-main-bolder;
    font-size: 1.45rem;
    font-weight: 800;
  }
  .v-toolbar__content {
    padding: 1rem 2rem;
    padding-top: 2rem;
  }
}
::v-deep .content-wrapper {
  .info-wrapper {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    border-radius: 20px;
  }
  .text-style {
    font-size: 12px;
  }
  .value-style {
    font-size: 20px;
  }
}
::v-deep .btn-style {
  .v-btn__content {
    color: #303767;
    font-family: $font-main-bolder;
    i {
      color: #ffffff;
    }
  }
}
</style>
