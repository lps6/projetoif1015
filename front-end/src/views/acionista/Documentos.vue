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
              sectionText="DOCUMENTOS"
              sectionTextColor="#888990"
            ></SectionHeader>
          </div>
        </v-col>
        <v-row class="content-wrapper pr-3 pl-3">
          <v-col cols="12" class="pr-8 pl-8">
            <InfoRounded
              text="MEUS DOCUMENTOS"
              class="mt-4"
              infoSize="80px"
              value=""
              bgColor="#FFFFFF"
              textColor="#454B60"
              valueColor="#454B60"
            ></InfoRounded>
          </v-col>
          <v-col cols="12" class="pr-8 pl-8">
            <v-row>
              <v-col cols="6" class="pl-0">
                <div class="doc-wrapper">
                  <div class="doc-content d-flex align-center">
                    <div class="img-wrapper">
                      <img :src="getImage('carteira.png')" alt="" />
                    </div>
                    <div class="info-wrapper">
                      <h2>DOCUMENTO:</h2>
                      <p class="p-0 m-0">CARTEIRA DE HABILITAÇÃO</p>
                      <v-chip :color="getColor(status)" dark class="mt-2">{{
                        status
                      }}</v-chip>
                    </div>
                  </div>
                  <RoundedBtn
                    colorBtn="#f5f5f5"
                    block
                    text="VISUALIZAR"
                    :offsetBtnIcon="offsetBtnIcon"
                    class="btn-style"
                    :loading="loading"
                    @click="showImage()"
                  ></RoundedBtn>
                </div>
              </v-col>
              <v-col cols="6" class="pr-0">
                <div class="doc-wrapper">
                  <div class="doc-content d-flex align-center">
                    <div class="img-wrapper">
                      <img :src="getImage('carteira.png')" alt="" />
                    </div>
                    <div class="info-wrapper">
                      <h2>DOCUMENTO:</h2>
                      <p class="p-0 m-0">CARTEIRA DE HABILITAÇÃO</p>
                      <v-chip :color="getColor(status)" dark class="mt-2">{{
                        status
                      }}</v-chip>
                    </div>
                  </div>
                  <RoundedBtn
                    colorBtn="#f5f5f5"
                    block
                    text="VISUALIZAR"
                    :offsetBtnIcon="offsetBtnIcon"
                    class="btn-style"
                    :loading="loading"
                    @click="showImage()"
                  ></RoundedBtn>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" class="pl-0">
                <div class="doc-wrapper">
                  <div class="doc-content d-flex align-center">
                    <div class="img-wrapper">
                      <img :src="getImage('carteira.png')" alt="" />
                    </div>
                    <div class="info-wrapper">
                      <h2>DOCUMENTO:</h2>
                      <p class="p-0 m-0">CARTEIRA DE HABILITAÇÃO</p>
                      <v-chip :color="getColor(status)" dark class="mt-2">{{
                        status
                      }}</v-chip>
                    </div>
                  </div>
                  <RoundedBtn
                    colorBtn="#f5f5f5"
                    block
                    text="VISUALIZAR"
                    :offsetBtnIcon="offsetBtnIcon"
                    class="btn-style"
                    :loading="loading"
                    @click="showImage()"
                  ></RoundedBtn>
                </div>
              </v-col>
              <v-col cols="6" class="pr-0">
                <div class="doc-wrapper">
                  <div class="doc-content d-flex align-center">
                    <div class="img-wrapper">
                      <img :src="getImage('carteira.png')" alt="" />
                    </div>
                    <div class="info-wrapper">
                      <h2>DOCUMENTO:</h2>
                      <p class="p-0 m-0">CARTEIRA DE HABILITAÇÃO</p>
                      <v-chip :color="getColor(status)" dark class="mt-2">{{
                        status
                      }}</v-chip>
                    </div>
                  </div>
                  <RoundedBtn
                    colorBtn="#f5f5f5"
                    block
                    text="VISUALIZAR"
                    :offsetBtnIcon="offsetBtnIcon"
                    class="btn-style"
                    :loading="loading"
                    @click="showImage()"
                  ></RoundedBtn>
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
import ProjecaoRendimentos from "@/components/acionista/ProjecaoRendimentos";
import RoundedBtn from "@/components/authentication/RoundedBtn";
import { mapMutations } from "vuex";

export default {
  name: "ExtratoFinanceiroAcionista",
  components: {
    SectionHeader,
    InfoRounded,
    ProjecaoRendimentos,
    RoundedBtn
  },
  data() {
    return {
      status: "AGUARDANDO APROVAÇÃO",
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
        { text: "OPERAÇÃO", value: "operacao", align: "center" },
        { text: "STATUS", value: "status", align: "center" },
        { text: "VALOR", value: "valor", align: "center" }
      ],
      table_items: [
        {
          nome: "CONT00001",
          data: "20/03/2020",
          operacao: "COMPRA",
          status: "AGUARDANDO ASSINATURA",
          valor: "R$ 1.000.000,00"
        },
        {
          nome: "CONT00002",
          data: "20/03/2020",
          operacao: "COMPRA",
          status: "ATIVO",
          valor: "R$ 5.000,00"
        },
        {
          nome: "CONT00003",
          data: "20/03/2020",
          operacao: "VENDA",
          status: "ATIVO",
          valor: "- R$ 2.500,00"
        },
        {
          nome: "CONT00004",
          data: "20/03/2020",
          operacao: "VENDA",
          status: "ATIVO",
          valor: "R$ 500.000,00"
        },
        {
          nome: "CONT00005",
          data: "20/03/2020",
          operacao: "SAQUE",
          status: "REJEITADO",
          valor: "R$ 525.000,00"
        },
        {
          nome: "CONT00006",
          data: "20/03/2020",
          operacao: "VENDA",
          status: "ATIVO",
          valor: "- R$ 2.500,00"
        },
        {
          nome: "CONT00007",
          data: "20/03/2020",
          operacao: "COMPRA",
          status: "REJEITADO",
          valor: "R$ 1.000.000,00"
        },
        {
          nome: "CONT00008",
          data: "20/03/2020",
          operacao: "VENDA",
          status: "ATIVO",
          valor: "- R$ 2.500,00"
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
        return "95%";
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
    getColor(val) {
      if (val === "COMPRA" || val === "ATIVO") {
        // green
        return "#76AF83";
      } else if (val === "AGUARDANDO APROVAÇÃO") {
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
  },
  showImage() {
    return "";
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
  img {
    width: 90px;
    height: auto;
    object-fit: cover;
  }
}
.question-wrapper {
  position: absolute;
  top: 25px;
  width: 27px;
  height: 27px;
  background-color: #ffffff;
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
.doc-wrapper {
  background-color: #f5f5f5;
  padding: 1rem 1rem;
  border-radius: 20px;
  border-width: thin 1px 1px 1px;
  border: 2px solid #ffffff;
}
.doc-content {
  padding: 0.3rem 1.3rem;
}
.info-wrapper {
  h2 {
    font-size: 1rem;
    font-family: $font-main-bolder;
  }
  p {
    font-size: 0.8rem;
  }
}
::v-deep .content-wrapper {
  .info-wrapper {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    border-radius: 20px;
    .v-chip.v-size--default {
      font-size: 13px;
      height: 26px;
      padding: 0px 15px;
    }
  }
  .text-style {
    font-size: 1.3rem;
    color: #303767;
    font-family: $font-main-bolder;
  }
  .value-style {
    font-size: 20px;
  }
}
::v-deep .btn-style {
  border-width: thin 1px 1px 1px;
  border: 1px solid #454b60;
  box-shadow: none;
  border-color: #454b60 !important;
  .v-btn__content {
    font-size: 1.1rem;
    font-family: $font-secondary;
    font-weight: 800;
    i {
      color: #ffffff;
    }
  }
}
</style>
