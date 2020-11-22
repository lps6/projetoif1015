<template>
  <v-container fluid :class="'login-view'">
    <v-row :align="$mq === 'xs' ? 'flex-start' : 'center'">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <AuthCard
            :hasHeader="true"
            headerText="DO AVISO DE RISCO E ARBITRAGEM"
            headerIcon="contract.svg"
            :importIcon="true"
            cardColor="#FFFFFF"
            :rulesHeader="true"
            class="regras-wrapper"
          >
            <template v-slot:card-body-content>
              <v-row class="align-center">
                <v-col cols="12" class="p-0">
                  <div class="rules-content-wrapper pl-9 pr-9 mt-4">
                    <p class="m-0 mb-3">
                      <span class="destaque-style">1 - </span>Caso considere
                      realizar a aquisição de ações da SOCIEDADE é de extrema
                      relevância que todos os pontos indicados neste aviso sejam
                      lidos com atenção e cautela.
                    </p>
                    <p class="m-0 mb-3">
                      <span class="destaque-style">2 - </span>Este aviso
                      oferece-lhe informação acerca dos riscos associados à
                      SOCIEDADE, mas pode não explicar todos os riscos nem a
                      forma como esses riscos se relacionam às suas
                      circunstâncias pessoais, sendo que se tiver quaisquer
                      dúvidas, procure obter aconselhamento profissional. É
                      importante que compreenda na integra os riscos de tomar
                      uma decisão de investimento.
                    </p>
                    <p class="m-0 mb-3">
                      <span class="destaque-style">3 - </span>Além dos riscos
                      inerentes a SOCIEDADE, podemos afirmar que em geral estão
                      sujeitos o COMPRADOR a riscos adicionais e imprevisíveis,
                      comuns a qualquer investimento no Brasil em geral.
                    </p>
                    <p class="m-0 mb-3">
                      <span class="destaque-style">4 - </span>Se optar por
                      realizar a aquisição de ações da SOCIEDADE, é importante
                      ter consciência dos riscos envolvidos, de que dispõe dos
                      recursos adequados para suportar esses riscos e que
                      monitora cuidadosamente o mercado financeiro
                    </p>
                    <p class="m-0 mb-3">
                      <span class="destaque-style">5 - </span>Antes da aquisição
                      de ações, a SOCIEDADE não é obrigada a efetuar uma
                      avaliação para saber se ela é adequada. Cabe ao COMPRADOR
                      qualquer decisão de aquisição ou não e saber se compreende
                      os riscos. Cabe também ao COMPRADOR avaliar se os seus
                      recursos são adequados e qual o nível de risco assumir
                    </p>
                    <p class="m-0 mb-3">
                      <span class="destaque-style">6 - </span>Para a composição
                      de lucratividade, a SOCIEDADE leva em consideração o
                      mercado em que atua bem como o mercado financeiro como um
                      todo, na qual as condições destes podem mudar
                      significativamente num pequeno espaço de tempo
                    </p>
                    <p class="m-0 mb-3">
                      <span class="destaque-style">7 - </span>As informações
                      contidas no site da SOCIEDADE não podem ser interpretadas
                      como uma recomendação para a aquisição de ações. O
                      COMPRADOR deve ter plena visão de que a análise do
                      investimento deverá ser feita apenas por ele e seus
                      consultores particulares, não podendo ser caracterizada
                      como pareceres ou assessoria jurídica, fiscal ou
                      financeira.
                    </p>
                  </div>
                </v-col>
                <v-row class="pr-5 pl-5 pt-5">
                  <v-col
                    cols="12"
                    align="center"
                    :class="
                      'justify-center d-flex pt-0 pb-0' +
                        ($mq === 'xs' ? 'btn-wrapper-mobile-style' : '')
                    "
                  >
                    <v-col :cols="$mq === 'xs' ? '5' : '5'" class="pl-0 pr-0">
                      <RoundedBtn
                        colorBtn="#E39649"
                        block
                        text="VOLTAR"
                        :offsetBtnIcon="offsetBtnIconShared"
                        :loading="loading"
                        btnIcon="close"
                        bgColorIcon="#E08B35"
                        class="btn-style"
                        @click="back()"
                      ></RoundedBtn>
                    </v-col>
                    <v-col :cols="$mq === 'xs' ? '7' : '7'" class="">
                      <RoundedBtn
                        colorBtn="#393A47"
                        block
                        text="LI E ACEITO"
                        :offsetBtnIcon="offsetBtnIconSharedRight"
                        :loading="loading"
                        btnIcon="check"
                        bgColorIcon="#68A776"
                        class="btn-style"
                        @click="Continue()"
                      ></RoundedBtn>
                    </v-col>
                  </v-col>
                </v-row>
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

export default {
  name: "AvisosTermos",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    RoundedBtn,
    AuthCard
  },
  data() {
    return {
      add: false,
      edit: false,
      BAForm: "",
      BAFormValid: false,
      agency_number: "",
      account_number: "",
      digit_input: "",
      payment_method_input: "",
      payment_method: [
        "Transferência entre contas",
        "Cartão de crédito",
        "Cartão de débito",
        "Boleto"
      ],
      acc_type: "",
      withdraw_value_input: null
    };
  },
  props: {},
  computed: {
    offsetBtnIcon() {
      if (this.$mq === "xs") {
        return "88%";
      } else {
        return "-1%";
      }
    },
    offsetBtnIconShared() {
      if (this.$mq === "xs") {
        return "88%";
      } else {
        return "86%";
      }
    },
    offsetBtnIconSharedRight() {
      if (this.$mq === "xs") {
        return "88%";
      } else {
        return "89%";
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
    getIcon(icon) {
      return icon ? require(`@/assets/icons/${icon}`) : "";
    },
    hasChoosen(input) {
      if (input) {
        return [true];
      } else {
        return ["Campo obrigatório!"];
      }
    },
    Continue() {
      // this.$refs.BAForm.validate();
    },
    editHandler() {},
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
    back() {
      this.$router.go(-1);
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
.rules-content-wrapper {
  height: 250px;
  overflow-y: scroll;
  h2 {
    font-size: 0.8rem;
    text-align: left;
    word-break: break-word;
    color: #303767;
    font-family: $font-secondary;
    font-weight: 800;
  }
  p {
    padding: 0px;
    font-size: 0.8rem;
    text-align: left;
    word-break: break-word;
    color: #303767;
    font-family: $font-secondary;
    font-weight: 400;
  }
  .destaque-style {
    font-size: 1rem;
    font-weight: 800;
  }
}
.split-column-2 {
  column-count: 2;
}
.border-logo {
  border-bottom: 1px solid #383a46;
}
.border-style {
  border-width: thin 1px 1px 1px;
  border-bottom: 1px dotted #707070;
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
.text-white {
  color: #ffffff;
}
.backBtn-style {
  height: 40px !important;
  padding: 0 !important;
}
.backBtn-mobile-style {
  height: 48px !important;
  padding: 0 !important;
}
.edit-style:hover {
  cursor: pointer;
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
.saldo-style {
  font-size: 33px;
  font-family: $font-main-bolder;
  color: #989898;
  height: 25px;
  line-height: 20px;
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
.radio-group-question-style {
  line-height: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #454b60 !important;
  font-family: $font-main-bolder;
}
.label-text-style {
  height: 25px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #454b60 !important;
  font-family: $font-main-bolder;
}
.vf-style {
  font-size: 18px;
}
.warn-style {
  font-size: 13px;
}
.bank-selected-wrapper {
  background-color: #454b60;
  border-radius: 30px;
  padding: 1rem 1.5rem;
}
.bank-text-style {
  color: #ffffff;
}
.account-acoes-wrapper {
  h3 {
    font-family: $font-secondary;
    font-weight: 400;
    margin-top: 14px;
    font-size: 16px;
  }
}
.account-value-wrapper {
  h3 {
    font-family: $font-main;
    font-weight: 400;
    margin-bottom: 10px;
  }
}
.bank-info-wrapper {
  h2 {
    font-family: $font-secondary;
    font-weight: 400;
  }
  p {
    font-family: $font-secondary;
    font-weight: 600;
  }
}
.lock-wrapper {
  p {
    font-family: $font-main-bolder;
    font-size: 14px;
  }
  margin-bottom: 10px;
}
.chip-style {
  font-size: 13px;
  height: 22px;
  padding: 0px 21px;
}
.question-wrapper {
  width: 22px;
  height: 22px;
  background-color: #ffffff;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: thin 1px 1px 1px;
  border: 1px solid #454b60;
}
.question-style {
  color: #454b60;
  font-weight: 800;
}
::v-deep .BAForm-style {
  .v-text-field__details {
    margin-bottom: 0px;
  }
}
::v-deep .btn-style {
  i {
    font-size: 18px !important;
  }
}
::v-deep .select-style {
  .v-text-field__details {
    margin-bottom: 4px;
  }
  .v-input__slot {
    border-radius: 10px;
    min-height: 40px;
    height: 40px;
  }
  .v-input__append-inner {
    margin-top: 8px;
  }
}
::v-deep .radio-group-style {
  .v-input--selection-controls .v-radio > .v-label {
    font-size: 13px;
  }
  .v-icon.v-icon {
    font-size: 22px;
  }
}
::v-deep .disabled-input-style > .v-input__control > .v-input__slot {
  box-shadow: none !important;
  border-width: thin 1px 1px 1px;
  border: 1px solid #cfcfcf;
  background-color: #ebebeb;
  min-height: 33px;
}
::v-deep .outlined-input-style > .v-input__control > .v-input__slot {
  box-shadow: none !important;
  border-width: thin 1px 1px 1px;
  border: 1px solid #cfcfcf;
  background-color: #ffffff;
  min-height: 33px;
}
::v-deep .regras-wrapper {
  .header-wrapper {
    i {
      color: #454b60;
      margin-right: 10px;
    }
  }
  .card-style {
    width: 500px;
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
  .img-icon-style {
    width: 70px;
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
  font-size: 12px;
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
