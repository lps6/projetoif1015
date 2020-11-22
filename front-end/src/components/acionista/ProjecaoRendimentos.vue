<template>
  <v-container fluid :class="'login-view'">
    <v-row
      :align="$mq === 'xs' ? 'flex-start' : 'center'"
      :class="$mq === 'xs' ? 'content-wrapper' : ''"
    >
      <div class="rounded-group" v-if="$mq === 'xs'">
        <QuestionRounded
          text="QUANTAS AÇÕES DESEJA COMPRAR?"
          infoSize="65px"
          placeholder="200"
          bgColor="#FFFFFF"
          textColor="#303767"
          valueColor="#FFFFFF"
        ></QuestionRounded>
        <QuestionRounded
          text="QUANTOS MESES DEIXARIA RENDER?"
          class="mt-4"
          infoSize="65px"
          placeholder="12"
          bgColor="#FFFFFF"
          textColor="#303767"
          valueColor="#FFFFFF"
        ></QuestionRounded>
        <InfoRounded
          text="VALOR EM AÇÕES"
          class="mt-4"
          infoSize="65px"
          value="R$5.000,00"
          bgColor="#2D2F3C"
          textColor="#FFFFFF"
          valueColor="#FFFFFF"
        ></InfoRounded>
        <InfoRounded
          text="SALDO COM DIVIDENDOS"
          class="mt-4"
          infoSize="65px"
          value="R$6.650,00"
          bgColor="#68A776"
          textColor="#FFFFFF"
          valueColor="#FFFFFF"
        ></InfoRounded>
        <InfoRounded
          text="RETORNO SOBRE INVESTIMENTO"
          class="mt-4"
          infoSize="65px"
          value="R$6.650,00"
          bgColor="#FA8D28"
          textColor="#FFFFFF"
          valueColor="#FFFFFF"
        ></InfoRounded>
      </div>
      <v-col cols="12" class="p-0 m-0" v-if="$mq === 'xs'">
        <div class="top-header-wrapper d-flex justify-center align-center">
          <div class="header-content">
            <h2 class="m-0 p-0">PROJEÇÃO DE RENDIMENTOS</h2>
            <p class="m-0 p-0">Baseado nos últimos 12 meses</p>
          </div>
          <div class="close-wrapper">
            <v-icon dark right @click="back()">close</v-icon>
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="p-0 m-0 d-flex align-end" v-if="$mq === 'xs'">
        <highcharts
          :options="projecaoRendimentosMobile"
          ref="highcharts"
          class="projecao-rendimentos-mobile-style"
        ></highcharts>
      </v-col>
      <v-col cols="12" v-if="$mq !== 'xs'">
        <v-row align="center" justify="center">
          <AuthCard
            :hasHeader="true"
            headerText="PROJEÇÃO DE RENDIMENTOS"
            headerIcon="bar_chart"
            cardColor="#E7E8EA"
            :hasCloseBtn="true"
            class="projecao-rendimentos-wrapper"
          >
            <template v-slot:card-body-content>
              <v-row class="pr-2 pl-2 align-center">
                <v-col cols="6" class="pr-2">
                  <QuestionRounded
                    text="QUANTAS AÇÕES DESEJA COMPRAR?"
                    class="mt-4"
                    infoSize="75px"
                    placeholder="200"
                    bgColor="#FFFFFF"
                    textColor="#303767"
                    valueColor="#FFFFFF"
                  ></QuestionRounded>
                </v-col>
                <v-col cols="6" class="pl-2">
                  <QuestionRounded
                    text="QUANTOS MESES DEIXARIA RENDER?"
                    class="mt-4"
                    infoSize="75px"
                    placeholder="12"
                    bgColor="#FFFFFF"
                    textColor="#303767"
                    valueColor="#FFFFFF"
                  ></QuestionRounded>
                </v-col>
              </v-row>
              <v-row class="pr-2 pl-2">
                <v-col cols="6" class="pr-3">
                  <InfoRounded
                    text="VALOR EM AÇÕES"
                    class="mt-4"
                    infoSize="55px"
                    value="R$5.000,00"
                    bgColor="#454B60"
                    textColor="#FFFFFF"
                    valueColor="#FFFFFF"
                  ></InfoRounded>
                </v-col>
                <v-col cols="6" class="pl-3">
                  <InfoRounded
                    text="SALDO COM DIVIDENDOS"
                    class="mt-4"
                    infoSize="55px"
                    value="R$6.650,00"
                    bgColor="#68A776"
                    textColor="#FFFFFF"
                    valueColor="#FFFFFF"
                  ></InfoRounded>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <highcharts
                    :options="projecaoRendimentos"
                    ref="highcharts"
                  ></highcharts>
                </v-col>
              </v-row>
            </template>
          </AuthCard>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

import RoundedBtn from "@/components/authentication/RoundedBtn";
import AuthCard from "@/components/authentication/AuthCard";
import InfoRounded from "@/components/acionista/InfoRounded";
import QuestionRounded from "@/components/acionista/QuestionRounded";
import { Chart } from "highcharts-vue";

export default {
  name: "ProjecaoRendimentos",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    RoundedBtn,
    AuthCard,
    InfoRounded,
    QuestionRounded,
    highcharts: Chart
  },
  data() {
    return {
      mobile: false,
      projecaoRendimentosMobile: {
        chart: {
          backgroundColor: "#232533"
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
      projecaoRendimentos: {
        chart: {
          marginLeft: 50,
          marginRight: 50,
          borderRadius: 30,
          backgroundColor: "#232533"
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
          text: "RETORNO SOBRE INVESTIMENTO: 18%",
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
          categories: [
            "MÊS 01",
            "MÊS 02",
            "MÊS 03",
            "MÊS 04",
            "MÊS 05",
            "MÊS 06",
            "MÊS 07",
            "MÊS 08",
            "MÊS 09",
            "MÊS 10",
            "MÊS 11",
            "MÊS 12"
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
  computed: {
    offsetBtnIcon() {
      if (this.$mq === "xs") {
        return "88%";
      } else {
        return "95%";
      }
    },
    offsetBtnIconShared() {
      if (this.$mq === "xs") {
        return "88%";
      } else {
        return "94%";
      }
    },
    offset3BtnIcon() {
      if (this.$mq === "xs") {
        return "79%";
      } else {
        return "84%";
      }
    },
    showName() {
      var name = this.name_input.split(" ");
      if (name.length === 1) {
        return name[0];
      } else {
        return name[0] + " " + name[1];
      }
    },
    showNextAge() {
      return Number(this.age_input) + 1;
    }
  },
  methods: {
    ...mapActions(["requestPreRegister"]),
    getImage(image) {
      return image ? require(`@/assets/images/${image}`) : "";
    },
    hasMadeInvestments(value) {
      this.made_investments = value;
      this.stepper_number = 4 + 1;
    },
    hasChoosen(input) {
      if (input) {
        return [true];
      } else {
        return ["Campo obrigatório!"];
      }
    },
    isSameEmail() {
      if (this.email_input === this.confirm_email_input) {
        return true;
      } else {
        this.emailInvalid = "E-mails não correspondentes!";
        return false;
      }
    },
    isCpfValid() {
      if (this.cpf_input && this.cpf_input.length === 14) {
        return true;
      } else {
        this.cpfInvalid = "CPF inválido!";
        return false;
      }
    },
    isSamePhone() {
      if (this.phone_input === this.confirm_phone_input) {
        return true;
      } else {
        this.phoneInvalid = "Telefones não correspondentes!";
        return false;
      }
    },
    noMask(val) {
      return val.replace(/[^\d]+/g, "");
    },
    back() {
      this.$router.go(-1);
    }
  },
  watch: {}
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/globalStyles.scss";

.login-view {
  min-height: 100%;
  margin: 0;
  padding: 0;
  background-image: url(~@/assets/images/projecao-rendimentos-bg.png);
  display: flex;
  flex-direction: column;
  background-position: center;
}
.border-logo {
  border-bottom: 1px solid #383a46;
}
.card-title-style {
  font-family: $font-main-bolder;
  font-size: 28px;
  color: #454b60;
  font-weight: 800;
  word-break: break-word;
}
.card-title-mobile-style {
  font-family: $font-main-bolder;
  font-size: 20px;
  color: #232533;
  font-weight: 800;
  word-break: break-word;
  padding-left: 0;
  text-align: center;
  padding-right: 0;
}
.card-subtitle-style {
  font-family: $font-secondary;
  font-size: 14px;
  word-break: break-word;
  color: #454b60 !important;
}
.card-subtitle-mobile-style {
  font-family: $font-secondary;
  word-break: break-word;
  font-size: 16px;
  text-align: center;
  color: #454b60 !important;
  padding-left: 0;
  padding-right: 0;
}
.card-body {
  padding-top: 0;
}
.caller-style {
  font-size: 14px;
}
.caller-mobile-style {
  font-size: 14px;
  color: $color-white;
}
.input-style {
  padding-left: 16px !important;
}
.final-msg-style {
  font-size: 14px;
  font-family: $font-secondary;
  font-weight: 400;
  word-break: break-word;
}
.top-header-wrapper {
  position: relative;
  padding: 0.8rem 1rem;
  background-color: #2d2f3c;
  border-bottom: 1px solid #ffffff;
  h2 {
    color: #ffffff;
    font-size: 18px;
  }
  p {
    color: #96979e;
    font-size: 13px;
    text-align: center;
  }
  .close-wrapper {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}
::v-deep .v-input .v-label {
  height: 25px;
  line-height: 20px;
  font-size: 18px;
  font-weight: 600;
  color: #454b60 !important;
}
::v-deep .v-text-field__slot {
  font-size: 15px;
}
::v-deep .v-text-field input {
  padding: 10px 0 6px;
}
.rules-style {
  color: $color-white;
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 0px;
}
.rules-mobile-style {
  color: $color-white;
  font-size: 12px;
  font-weight: 800;
  margin-bottom: 0px;
}
.copyright-style {
  color: #f5f5f6;
}
.copyright-mobile-style {
  font-size: 12px;
  color: #f5f5f6;
}
.link-style {
  color: transparent;
}
.img-style {
  width: 10%;
  height: auto;
  object-fit: cover;
}
.img-style-mobile {
  width: 40%;
  height: auto;
  object-fit: cover;
}
.flex-grow-1 {
  flex-grow: 1;
}
.no-flex {
  flex: 0;
}
.divider-style {
  border-width: thin 1px 1px 1px;
  border-color: #e1e1e1;
}
.divider-mobile-style {
  border-width: thin 1px 1px 1px;
  border-color: #e1e1e1;
  display: none;
}
.card-style {
  border: none;
  box-shadow: none;
}
.card-mobile-style {
  background: #dadbde;
  border: none;
  box-shadow: none;
}
.p-style {
  font-size: 15px;
  line-height: 20px;
  font-weight: 600;
  color: #454b60 !important;
}
.backBtn-style {
  height: 40px !important;
  padding: 0 !important;
}
.backBtn-mobile-style {
  height: 48px !important;
  padding: 0 !important;
}
.icon-style {
  color: $color-white !important;
  font-size: 22px;
  font-weight: 800;
}
.warn-style {
  word-break: break-word;
  font-size: 12px;
}
.btn-space-empty {
  max-width: min-content;
  padding: 10px;
}
.btn-wrapper-mobile-style {
  position: absolute;
  top: 95%;
}
.col-no-padding-sides {
  padding-left: 0;
  padding-right: 0;
}
.card-body-mobile {
  padding-left: 0;
  padding-right: 0;
}
.top-96 {
  top: 96.5%;
}
.top-97 {
  top: 97.5%;
}
.fixed-width {
  width: 330px;
}
::v-deep .content-wrapper {
  position: relative;
  overflow-y: hidden;
  .rounded-group {
    position: absolute;
    height: 100%;
    z-index: 1;
    top: 13.5%;
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
::v-deep .projecao-rendimentos-mobile-style {
  height: 220px;
  .highcharts-grid-line {
    display: none;
  }
}
::v-deep .projecao-rendimentos-wrapper {
  .card-style {
    width: 750px;
  }
  .card-body {
    padding: 10px 5px !important;
  }
  .text-style {
    width: 140px;
  }
  .value-style {
    font-size: 22px;
  }
  .info-wrapper {
    padding-left: 2rem;
    padding-right: 2rem;
    border-radius: 22px;
  }
}
::v-deep .centered-input input {
  text-align: center;
}
::v-deep .theme--light.v-stepper .v-stepper__header .v-divider {
  border-color: #383a46;
  border-width: thin 1px 1px 1px;
}
::v-deep .v-stepper__header .v-divider {
  margin: 0 -24px;
}
::v-deep .v-stepper__step__step {
  margin-right: 0px !important;
  border: 2px solid #383a46;
}
::v-deep .v-stepper__step {
  padding: 18px;
}
::v-deep .v-stepper__header {
  box-shadow: none;
  padding: 0px 70px;
  height: 60px;
}
::v-deep
  .theme--light.v-stepper
  .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error)
  .v-stepper__step__step {
  background-color: #ffffff !important;
}
::v-deep .v-stepper__step--complete .v-stepper__step__step {
  border-color: #383a46 !important;
}
::v-deep .v-stepper__step__step .v-icon.v-icon {
  font-size: 1rem;
}
::v-deep .v-stepper__content {
  padding: 0px 14px 12px 14px;
}
::v-deep .v-btn--contained {
  box-shadow: none;
}
::v-deep .v-input input {
  font-size: 14px;
  font-family: $font-secondary;
}
::v-deep .v-select__selections {
  font-size: 14px;
  font-family: $font-secondary;
}
::v-deep .v-input--selection-controls .v-radio > .v-label {
  font-size: 14px;
  font-weight: 400;
}
@media screen and (max-width: 599px) {
  ::v-deep .v-text-field__slot {
    input {
      text-align: center;
    }
  }
  ::v-deep .v-input .v-label {
    height: 25px;
    line-height: 20px;
    font-size: 18px;
    font-weight: 800;
    color: #454b60 !important;
    width: 600px;
    text-align: center;
  }
  ::v-deep .v-stepper__wrapper {
    overflow: visible;
  }
  ::v-deep .v-stepper__items {
    overflow: visible;
  }
  ::v-deep .v-stepper {
    overflow: visible;
  }
  .p-style {
    font-size: 15px;
    line-height: 20px;
    font-weight: 600;
    color: #454b60 !important;
    text-align: center;
  }
  .warn-style {
    word-break: break-word;
    font-size: 12px;
    text-align: center;
  }
  ::v-deep .v-input--selection-controls .v-radio > .v-label {
    font-size: 14px;
    font-weight: 400;
    text-align: left;
  }
  ::v-deep .v-stepper:not(.v-stepper--vertical) .v-stepper__label {
    display: inherit;
  }
}

@media screen and (max-width: 320px) {
  .fixed-width {
    width: 305px;
  }
}
</style>
