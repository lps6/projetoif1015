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
            ></InfoRounded>
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
                  text="PROJETE SEUS RENDIMENTOS"
                  colorBtn="rgba(255,255,255, 0.9)"
                  class="btn-style"
                  @click="showProjecaoRendimentos()"
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
import { mapMutations } from "vuex";
import { Chart } from "highcharts-vue";

export default {
  name: "VisaoGeralAcionista",
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
      projecaoRendimentos: false,
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
  methods: {
    ...mapMutations(["SET_EXPANDEDDRAWER"]),
    clickHandler() {
      this.$emit("click");
    },
    getImage(image) {
      return image ? require(`@/assets/images/${image}`) : "";
    },
    showProjecaoRendimentos() {
      this.$router.push({ name: "projecaoRendimentos" });
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
  top: 225px;
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
