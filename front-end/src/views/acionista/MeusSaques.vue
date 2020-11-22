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
              sectionText="EXTRATO FINANCEIRO"
              sectionTextColor="#888990"
            ></SectionHeader>
          </div>
        </v-col>
        <v-col cols="12" class="content-wrapper">
          <v-row class="pr-3 pl-3">
            <v-col cols="8" class="pl-0 pr-2">
              <InfoRoundedBtn
                roundedBtnText="SACAR SALDO"
                text="SALDO DISPONÍVEL"
                class="infoRoundedBtn-style"
                infoSize="90px"
                value="R$ 5.000.000,00"
                bgColor="#454B60"
                roundedBtnBgColor="#E7862D"
                textColor="#FFFFFF"
                :offsetBtnIcon="offsetInfoRoundedBtnIcon"
                valueColor="#FFFFFF"
                @click="sacarHandler()"
              ></InfoRoundedBtn>
              <InfoRounded
                text="DIVIDENDOS"
                class="mt-4 infoRounded-style"
                infoSize="58px"
                value="R$ 5.000.000,00"
                bgColor="#FFFFFF"
                textColor="#454B60"
                valueColor="#454B60"
              ></InfoRounded>
              <InfoRounded
                text="SALDO DISPONÍVEL"
                class="mt-4 infoRounded-style"
                infoSize="58px"
                value="R$ 2.020,00"
                bgColor="#454B60"
                textColor="#FFFFFF"
                valueColor="#FFFFFF"
              ></InfoRounded>
            </v-col>
            <v-col cols="4" class="pr-0">
              <div class="bank-account-wrapper">
                <v-row>
                  <v-col cols="12">
                    <div class="d-flex justify-space-between">
                      <h2>CONTAS BANCÁRIAS</h2>
                      <v-icon
                        color="#454B60"
                        size="22"
                        @click="contasBancariasHandler()"
                        class="settings-style"
                        >settings</v-icon
                      >
                    </div>
                  </v-col>
                </v-row>
                <v-row class="pt-0 pb-0 pl-3 pr-3">
                  <v-col cols="12" class="p-0">
                    <div class="bank-content-wrapper">
                      <v-form v-model="BAFormValid" ref="BAForm">
                        <v-radio-group v-model="radioGroup" class="mt-0">
                          <v-radio value="1" class="radio-btn-style">
                            <template v-slot:label>
                              <div>
                                <img
                                  :src="getImage('bb-logo.png')"
                                  alt=""
                                  class="bank-img"
                                />
                              </div>
                              <div class="bank-info-wrapper">
                                <p class="p-0 m-0 bank-text-style pl-2">
                                  001 - Banco do Brasil S/A
                                </p>
                                <p class="p-0 m-0 bank-text-style pl-2">
                                  Ag: 3243-3 | Conta Corrente: 36957-8
                                </p>
                              </div>
                            </template>
                          </v-radio>
                          <v-radio value="2" class="radio-btn-style">
                            <template v-slot:label>
                              <div>
                                <img
                                  :src="getImage('bb-logo.png')"
                                  alt=""
                                  class="bank-img"
                                />
                              </div>
                              <div class="bank-info-wrapper">
                                <p class="p-0 m-0 bank-text-style pl-2">
                                  001 - Banco do Brasil S/A
                                </p>
                                <p class="p-0 m-0 bank-text-style pl-2">
                                  Ag: 3243-3 | Conta Corrente: 36957-8
                                </p>
                              </div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                      </v-form>
                    </div>
                  </v-col>
                </v-row>
                <v-row class="d-flex align-center">
                  <v-col cols="12">
                    <RoundedBtn
                      colorBtn="#68A776"
                      block
                      text="ADICIONAR CONTA"
                      :offsetBtnIcon="offsetBtnIcon"
                      :loading="loading"
                      btnIcon="add"
                      bgColorIcon="#5C8D67"
                      @click="addAccountHandler()"
                    ></RoundedBtn>
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>
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
                    <v-toolbar-title>HISTÓRICO DE TRANSAÇÕES</v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                </template>
                <template v-slot:item.operacao="{ item }">
                  <v-chip :color="getColor(item.operacao)" dark>{{
                    item.operacao
                  }}</v-chip>
                </template>
                <template v-slot:item.status="{ item }">
                  <v-chip :color="getColor(item.status)" dark>{{
                    item.status
                  }}</v-chip>
                </template>
              </v-data-table>
              <div class="text-center pt-2">
                <v-pagination v-model="page" :length="pageCount"></v-pagination>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SectionHeader from "@/components/general/SectionHeader";
import InfoRounded from "@/components/acionista/InfoRounded";
import InfoRoundedBtn from "@/components/acionista/InfoRoundedBtn";
import RoundedBtn from "@/components/authentication/RoundedBtn";
import ProjecaoRendimentos from "@/components/acionista/ProjecaoRendimentos";
import { mapMutations } from "vuex";

export default {
  name: "MeusSaques",
  components: {
    SectionHeader,
    InfoRounded,
    ProjecaoRendimentos,
    RoundedBtn,
    // eslint-disable-next-line vue/no-unused-components
    InfoRoundedBtn
  },
  computed: {
    offsetBtnIcon() {
      if (this.$mq === "xs") {
        return "88%";
      } else {
        return "92%";
      }
    },
    offsetInfoRoundedBtnIcon() {
      if (this.$mq === "xs") {
        return "88%";
      } else {
        return "85%";
      }
    }
  },
  data() {
    return {
      radioGroup: "",
      loading: false,
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
        { text: "DATA", value: "data", align: "center" },
        { text: "VALOR", value: "valor", align: "center" },
        { text: "STATUS", value: "status", align: "center" }
      ],
      table_items: [
        {
          nome: "CONT00001",
          data: "20/03/2020",
          valor: "R$ 1.000.000,00",
          status: "AGUARDANDO ASSINATURA"
        },
        {
          nome: "CONT00002",
          data: "20/03/2020",
          valor: "R$ 5.000,00",
          status: "ATIVO"
        },
        {
          nome: "CONT00003",
          data: "20/03/2020",
          valor: "- R$ 2.500,00",
          status: "ATIVO"
        },
        {
          nome: "CONT00004",
          data: "20/03/2020",
          valor: "R$ 500.000,00",
          status: "ATIVO"
        },
        {
          nome: "CONT00005",
          data: "20/03/2020",
          valor: "R$ 525.000,00",
          status: "REJEITADO"
        },
        {
          nome: "CONT00006",
          data: "20/03/2020",
          valor: "- R$ 2.500,00",
          status: "ATIVO"
        },
        {
          nome: "CONT00007",
          data: "20/03/2020",
          valor: "R$ 1.000.000,00",
          status: "REJEITADO"
        },
        {
          nome: "CONT00008",
          data: "20/03/2020",
          valor: "- R$ 2.500,00",
          status: "ATIVO"
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
          text: "HISTÓRICO DE SAQUES",
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
  props: {},
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
    contasBancariasHandler() {
      this.$router.push({ name: "contasBancarias" });
    },
    addAccountHandler() {
      this.$router.push({ name: "addContaBancaria" });
    },
    sacarHandler() {
      this.$router.push({ name: "saque" });
    },
    getColor(val) {
      if (val === "COMPRA" || val === "ATIVO") {
        // green
        return "#76AF83";
      } else if (val === "VENDA" || val === "AGUARDANDO ASSINATURA") {
        // orange
        return "#FA8D28";
      } else if (val === "SAQUE") {
        // dark blue
        return "#454B60";
      } else if (val === "REJEITADO") {
        // wine
        return "#C96A6A";
      } else {
        return "#000000";
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
.settings-style:hover {
  cursor: pointer;
}
.bank-text-style {
  font-size: 0.7rem;
  font-family: $font-secondary;
  word-break: break-word;
}
.bank-info-wrapper {
  line-height: 0.9rem;
}
.bank-img {
  width: 40px;
  height: auto;
  object-fit: cover;
}
.bank-content-wrapper {
  overflow-y: scroll;
  height: 100px;
}
.bank-account-wrapper {
  height: 100%;
  background-color: #fff;
  border-radius: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0.6rem 0.4rem;
  h2 {
    font-size: 1rem;
    font-family: $font-main-bolder;
  }
}
::v-deep .infoRounded-style {
  padding-left: 2.5rem !important;
  padding-right: 2.5rem !important;
  .text-style {
    font-size: 16px !important;
  }
  .value-style {
    font-size: 28px !important;
  }
}
::v-deep .infoRoundedBtn-style {
  background-image: url("~@/assets/images/projecao-rendimentos-bg.png") !important;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  .text-style {
    font-size: 20px !important;
  }
  .value-style {
    font-size: 30px !important;
  }
  .btn-style {
    width: 100%;
    height: 45px !important;
  }
  .btn-style .v-btn__content {
    color: #ffffff;
    font-family: $font-main;
    font-size: 15px;
    font-weight: 600;
  }
  .btn-style .v-btn__content .round-btn-icon {
    width: 35px;
    height: 35px;
  }
  .btn-style .v-btn__content i {
    font-size: 16px !important;
  }
}
::v-deep .radio-btn-style {
  border-width: thin 1px 1px 1px;
  border-bottom: 2px solid #f2f2f2;
  padding-bottom: 2px;
}
::v-deep .radio-btn-style {
  .v-icon.v-icon {
    font-size: 21px;
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
      height: 30px !important;
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
