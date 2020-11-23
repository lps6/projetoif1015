<template>
  <div>
    <v-container
      v-if="$mq === 'xs'"
      fluid
      class="vg-acionista-wrapper p-0 p-relative"
    >
      <v-row>
        <v-col cols="12" class="p-0 m-0">
          <div class="section-header">
            <SectionHeader
              cargo="Acionista"
              cargoTextColor="#A6A7AC"
              userName="FERNANDO RAMALHO"
              userNameColor="#232533"
            ></SectionHeader>
          </div>
        </v-col>
      </v-row>
      <v-row class="chart-wrapper">
        <v-col cols="12" class="p-0 m-0">
          <highcharts
            :options="rendimentosMobile"
            ref="highcharts"
            class="rendimentos-mobile-style"
          ></highcharts>
        </v-col>
      </v-row>
      <div :class="$mq === 'xs' ? 'details-wrapper' : ''">
        <v-row>
          <v-col cols="12" class="pl-8 pr-8 mb-4">
            <VueSlickCarousel :arrows="true" :dots="true">
              <InfoRounded
                text="VALOR EM AÇÕES"
                infoSize="70px"
                value="R$20.000,00"
                bgColor="#FFFFFF"
                textColor="#303767"
                valueColor="#303767"
              ></InfoRounded>
              <InfoRounded
                text="DIVIDENDOS"
                infoSize="70px"
                value="R$240,00"
                bgColor="#FA8D28"
                textColor="#FFFFFF"
                valueColor="#FFFFFF"
              ></InfoRounded>
              <InfoRounded
                text="RETORNO SOBRE INVESTIMENTO"
                infoSize="70px"
                value="4.7%"
                bgColor="#454B60"
                textColor="#FFFFFF"
                valueColor="#FFFFFF"
              ></InfoRounded>
              <InfoRounded
                text="SAQUE DISPONÍVEL"
                infoSize="70px"
                value="R$18.240,00"
                bgColor="#68A776"
                textColor="#FFFFFF"
                valueColor="#FFFFFF"
              ></InfoRounded>
            </VueSlickCarousel>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="img-wrapper">
              <img
                :src="getImage('projecao-avatar.png')"
                alt=""
                class="img-style"
              />
              <div class="question-wrapper">
                <p class="question-style m-0 p-0">?</p>
              </div>
              <div class="projecao-btn-mobile">
                <RoundedBtn
                  text="PROJETE SEUS RENDIMENTOS"
                  colorBtn="rgba(255,255,255, 0.9)"
                  class="btn-style-mobile"
                  @click="showProjecaoRendimentos()"
                ></RoundedBtn>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <v-container
      fluid
      class="vg-acionista-wrapper p-0"
      v-if="!projecaoRendimentos && $mq !== 'xs'"
    >
      <v-row>
        <v-col cols="12" class="p-0 m-0">
          <div class="section-header">
            <SectionHeader
              sectionText="VISÃO GERAL"
              sectionTextColor="#888990"
            ></SectionHeader>
          </div>
        </v-col>
        <v-row class="content-wrapper">
          <v-col cols="7">
            <v-form
              v-model="BAFormValid"
              ref="BAForm"
              class="pl-3 pr-3 BAForm-style"
            >
              <h2 class="mb-4">Configure para receber notificação</h2>
              <label class="label-text-style">Nome da Ação</label>
              <v-select
                v-model="stockName"
                :items="stockList"
                :rules="hasChoosen(stockName)"
                placeholder="Selecione sua Ação"
                class=".v-input__slot .v-label .v-text-field input pt-0 mt-0"
                required
              ></v-select>
              <label class="label-text-style">Tipo de Operação</label>
              <v-select
                v-model="stockOperation"
                :items="stockOperationList"
                :rules="hasChoosen(stockOperation)"
                placeholder="Selecione sua operação"
                class=".v-input__slot .v-label .v-text-field input pt-0 mt-0"
                required
              ></v-select>
              <label class="label-text-style">Valor da Ação</label>
              <v-text-field
                v-model="stockValue"
                :rules="hasChoosen(stockValue)"
                name="input-10-1"
                outlined
                dense
                placeholder="200"
                class=".v-input__slot .v-label .v-text-field input select-style"
                type="number"
              >
              </v-text-field>
            </v-form>
            <!--
            <InfoRounded
              text="VALOR EM AÇÕES"
              infoSize="70px"
              value="R$20.000,00"
              bgColor="#FFFFFF"
              textColor="#303767"
              valueColor="#303767"
            ></InfoRounded>
            <InfoRounded
              text="DIVIDENDOS"
              class="mt-4"
              infoSize="52px"
              value="R$240,00"
              bgColor="#FA8D28"
              textColor="#FFFFFF"
              valueColor="#FFFFFF"
            ></InfoRounded>
            <InfoRounded
              text="RETORNO SOBRE INVESTIMENTO"
              class="mt-4"
              infoSize="52px"
              value="4.7%"
              bgColor="#454B60"
              textColor="#FFFFFF"
              valueColor="#FFFFFF"
            ></InfoRounded>
            <InfoRounded
              text="SAQUE DISPONÍVEL"
              class="mt-4"
              infoSize="60px"
              value="R$18.240,00"
              bgColor="#68A776"
              textColor="#FFFFFF"
              valueColor="#FFFFFF"
            ></InfoRounded>-->
          </v-col>
          <v-col cols="5">
            <div class="img-wrapper">
              <img
                :src="getImage('projecao-avatar.png')"
                alt=""
                class="img-style"
              />
              <div class="question-wrapper">
                <p class="question-style m-0 p-0">?</p>
              </div>

              <div class="projecao-btn">
                <RoundedBtn
                  text="Alertar"
                  colorBtn="rgba(255,255,255, 0.9)"
                  class="btn-style"
                  @click="alertar()"
                ></RoundedBtn>
                <RoundedBtn
                  text="Atualizar Gráfico"
                  colorBtn="rgba(255,255,255, 0.9)"
                  class="btn-style mt-1"
                  @click="updateValues()"
                ></RoundedBtn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-row>
      <v-row>
        <v-col cols="12">
          <highcharts :options="rendimentos" ref="highcharts"></highcharts>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SectionHeader from "@/components/general/SectionHeader";
import InfoRounded from "@/components/acionista/InfoRounded";
import RoundedBtn from "@/components/authentication/RoundedBtn";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import { mapMutations, mapActions } from "vuex";
import { Chart } from "highcharts-vue";

export default {
  name: "ConfigNotification",
  components: {
    SectionHeader,
    InfoRounded,
    RoundedBtn,
    // eslint-disable-next-line vue/no-unused-components
    VueSlickCarousel,
    highcharts: Chart
  },
  data() {
    return {
      BAFormValid: false,
      msgServer: "",
      projecaoRendimentos: false,
      stockName: null,
      stockList: ["Google", "Elerium", "Apple", "Linen Cloth", "Besbin Gas"],
      stockOperation: "",
      stockOperationList: ["Compra", "Venda"],
      stockValue: "",
      rendimentosMobile: {
        chart: {
          backgroundColor: "#232533",
          borderRadius: 0,
          height: 250
        },
        legend: {
          enabled: false
        },
        navigation: {
          buttonOptions: {
            x: -35
          }
        },
        title: {
          text: "",
          align: "left",
          margin: 30,
          x: 38,
          y: 30,
          style: {
            color: "#FFFFFF",
            font: 'bold 18px "DroidSansBolder", sans-serif',
            fontWeight: 800
          }
        },
        credits: {
          enabled: false
        },
        xAxis: {
          labels: {
            style: {
              color: "#FFFFFF"
            }
          },
          categories: ["MÊS 01", "MÊS 02", "MÊS 03", "MÊS 04", "MÊS 05"],
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
            color: "#FFFFFF",
            data: [49.9, 71.5, 106.4, 129.2, 144.0]
          },
          {
            name: "Rendimento",
            type: "column",
            marker: {
              symbol: "circle",
              lineColor: "#FFFFFF",
              color: "#FFFFFF"
            },
            color: "rgba(75,76,88, .85)",
            borderColor: "rgba(75,76,88, .85)",
            tooltip: {
              valuePrefix: "R$"
            },
            data: [49.9, 71.5, 106.4, 129.2, 144.0]
          }
        ]
      },
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
          text: "VALORES DA AÇÃO",
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
          categories: [],
          visible: false,
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
            name: "",
            type: "spline",
            marker: {
              enabled: true,
              symbol: "",
              lineColor: "#FA8D28"
            },
            tooltip: {
              valueSuffix: " %"
            },
            color: "#FA8D28",
            data: []
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
  mounted() {
    (async () => {
      try {
        // Store SSE object at a higher scope
        let es = new EventSource("http://localhost:3000/stocks/events");
        es.onmessage = e => {
          console.log("event", e);
          var data = e.data.split(",");
          this.$alert("Sua ação " + data[0] + "está disponivel para" + data[2]);
        };
      } catch (err) {
        // When this error is caught, it means the initial connection to the
        // events server failed.  No automatic attempts to reconnect will be made.
        console.error("Failed to connect to server", err);
      }
    })();
  },
  beforeDestroy() {
    // Make sure to close the connection with the events server
    // when the component is destroyed, or we'll have ghost connections!
    this.msgServer.close();
  },
  methods: {
    ...mapMutations(["SET_EXPANDEDDRAWER"]),
    ...mapActions(["sendNotification", "requestValues"]),
    clickHandler() {
      this.$emit("click");
    },
    getImage(image) {
      return image ? require(`@/assets/images/${image}`) : "";
    },
    hasChoosen(input) {
      if (input) {
        return [true];
      } else {
        return ["Campo obrigatório!"];
      }
    },
    showProjecaoRendimentos() {
      this.$router.push({ name: "projecaoRendimentos" });
    },
    alertar: async function() {
      this.$refs.BAForm.validate();
      if (this.stockName && this.stockOperation && this.stockValue) {
        const res = await this.sendNotification({
          userID: 1,
          stockID: this.stockName,
          targetPrice: this.stockValue,
          operations: this.stockOperation
        });
        if (res.status === 200) {
          alert("Agora, clique no botão atualizar valores");
        }
      }
    },
    updateValues: async function() {
      const res = await this.requestValues();
      this.rendimentos.series = [];
      for (var stock in res) {
        this.rendimentos.series.push({
          name: stock,
          type: "spline",
          marker: {
            enabled: true,
            symbol: "",
            lineColor: "#FA8D28"
          },
          tooltip: {
            valueSuffix: " US$"
          },
          color: "#FA8D28",
          data: res[stock]
        });
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
  padding-right: 3rem;
  padding-top: 0.5rem;
}
.img-style {
  width: 100%;
  height: auto;
  object-fit: cover;
}
.img-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.details-wrapper {
  position: absolute;
  height: auto;
  width: 100%;
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
  top: 180px;
  left: 20px;
}
.projecao-btn-mobile {
  position: absolute;
  bottom: 10px;
  left: 0px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.btn-style {
  width: 340px;
  height: 45px !important;
}
.btn-style-mobile {
  width: 100%;
  height: 45px !important;
}
.btn-style-mobile:hover {
  width: 310px;
  height: 45px !important;
}
.p-relative {
  position: relative;
}
.chart-wrapper {
  position: absolute;
  width: 100%;
  bottom: 0;
}
.btn-style:hover {
  width: 340px;
  height: 45px !important;
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
::v-deep .btn-style-mobile {
  .v-btn__content {
    color: #303767;
    font-family: $font-main-bolder;
    i {
      color: #ffffff;
    }
  }
}
::v-deep .rendimentos-mobile-style {
  height: 100%;
  .highcharts-grid-line {
    display: none;
  }
}
</style>
