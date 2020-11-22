<template>
  <v-container fluid :class="'login-view'">
    <v-row :align="$mq === 'xs' ? 'flex-start' : 'center'">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <AuthCard
            :hasHeader="true"
            :headerText="verifyUrl"
            headerIcon="bank.svg"
            :importIcon="true"
            cardColor="#FFFFFF"
            class="contas-bancarias-wrapper"
          >
            <template v-slot:card-body-content>
              <v-row class="align-center">
                <v-col cols="12" class="p-0">
                  <div class="bank-content-wrapper pl-6 pr-6">
                    <p class="pt-2 pl-3 pb-2 pr-3 m-0">
                      A segurança das informações de sua conta bancária está
                      protegida pela OIG Capital.
                    </p>
                    <v-form
                      v-model="BAFormValid"
                      ref="BAForm"
                      class="pl-3 pr-3 BAForm-style"
                    >
                      <label class="label-text-style">Nome do Banco</label>
                      <v-select
                        v-model="bank_name_input"
                        :items="bank_names"
                        outlined
                        :rules="hasChoosen(bank_name_input)"
                        placeholder="Selecione seu banco"
                        class=".v-input__slot .v-label .v-text-field input select-style"
                        required
                      ></v-select>
                      <v-radio-group
                        v-model="acc_type"
                        class="mt-0 pt-0 radio-group-style"
                        :rules="hasChoosen(acc_type)"
                      >
                        <template v-slot:label>
                          <div class="radio-group-question-style">
                            Tipo de conta
                          </div>
                        </template>
                        <div class="d-flex">
                          <v-radio
                            label="Conta Corrente"
                            color="#383A46"
                            value="cc"
                            class="m-0"
                          ></v-radio>
                          <v-radio
                            label="Conta Poupança"
                            color="#383A46"
                            value="cp"
                            class="m-0 ml-6"
                          ></v-radio>
                        </div>
                      </v-radio-group>
                      <v-row>
                        <v-col cols="4" class="pr-2 pt-0 pb-0 pl-0 m-0">
                          <label class="label-text-style"
                            >Número da Agência</label
                          >
                          <v-text-field
                            v-model="agency_number"
                            solo
                            name="input-10-1"
                            v-mask="['####']"
                            placeholder="0000"
                            :rules="hasChoosen(agency_number)"
                            class=".v-input__slot .v-label .v-text-field input outlined-input-style"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="5" class="pt-0 pb-0 m-0 pl-2 pr-2">
                          <label class="label-text-style"
                            >Número da Conta</label
                          >
                          <v-text-field
                            v-model="account_number"
                            solo
                            name="input-10-1"
                            v-mask="['######-#']"
                            placeholder="000000-0"
                            :rules="hasChoosen(account_number)"
                            class=".v-input__slot .v-label .v-text-field input outlined-input-style"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="3" class="pt-0 pb-0 pr-0 m-0 pl-2">
                          <label class="label-text-style">Dígito</label>
                          <v-text-field
                            v-model="digit_input"
                            solo
                            name="input-10-1"
                            placeholder="0"
                            v-mask="['#']"
                            :rules="hasChoosen(digit_input)"
                            class=".v-input__slot .v-label .v-text-field input outlined-input-style"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="4" class="pr-2 pt-0 pb-0 pl-0 m-0">
                          <label class="label-text-style">CPF</label>
                          <v-text-field
                            v-model="name_input"
                            solo
                            disabled
                            name="input-10-1"
                            placeholder="000.000.000-00"
                            class=".v-input__slot .v-label .v-text-field input disabled-input-style"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="8" class="pt-0 pb-0 pr-0 m-0 pl-2">
                          <label class="label-text-style">Nome Completo</label>
                          <v-text-field
                            v-model="name_input"
                            solo
                            disabled
                            name="input-10-1"
                            placeholder="WHINDERSON NUNES DA SILVA SAURO"
                            class=".v-input__slot .v-label .v-text-field input disabled-input-style"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <p class="pt-0 pl-0 pb-0 pr-0 m-0 warn-style">
                        Certifique-se de que suas informações de nome e banco
                        sejam iguais as da sua conta bancária. Caso contrário,
                        suas transações não serão realizadas e será cobrada uma
                        tarifa.
                      </p>
                    </v-form>
                  </div>
                </v-col>
                <v-row class="pr-5 pl-5">
                  <v-col
                    cols="12"
                    align="center"
                    :class="
                      'justify-center d-flex pt-0 pb-0' +
                        ($mq === 'xs' ? 'btn-wrapper-mobile-style' : '')
                    "
                  >
                    <v-col :cols="$mq === 'xs' ? '2' : '1'" class="pl-0 pr-0">
                      <v-btn
                        block
                        rounded
                        color="#CECECE"
                        :class="
                          $mq === 'xs'
                            ? 'backBtn-mobile-style'
                            : 'backBtn-style'
                        "
                        @click="backHandler()"
                      >
                        <v-icon class="icon-style">keyboard_arrow_left</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col :cols="$mq === 'xs' ? '10' : '11'" class="">
                      <RoundedBtn
                        colorBtn="#68A776"
                        block
                        :text="btnText"
                        :offsetBtnIcon="offsetBtnIconShared"
                        :loading="loading"
                        btnIcon="check"
                        bgColorIcon="#5E956A"
                        class="btn-style"
                        @click="Ok()"
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
  name: "ContaBancaria",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    RoundedBtn,
    AuthCard
  },
  data() {
    return {
      add: false,
      edit: false,
      btnText: "",
      BAForm: "",
      agency_number: "",
      account_number: "",
      digit_input: "",
      bank_name_input: "",
      bank_names: [
        "Banco do Brasil",
        "Itaú",
        "Bradesco",
        "Nubank",
        "Santander"
      ],
      acc_type: ""
    };
  },
  props: {},
  computed: {
    verifyUrl() {
      var path = this.$route.path;
      var vue = this;
      if (path.search("editar") !== -1) {
        vue.edit = true;
        vue.btnText = "CONCLUIR ALTERAÇÕES";
        return "EDITAR CONTA BANCÁRIA";
      } else {
        vue.add = true;
        vue.btnText = "CONCORDAR E ADICIONAR";
        return "ADICIONAR CONTA BANCÁRIA";
      }
    },
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
    Ok() {
      this.$refs.BAForm.validate();
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
    backHandler() {
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
  font-size: 13px;
  font-weight: 600;
  color: #454b60 !important;
  font-family: $font-main-bolder;
}
.warn-style {
  font-size: 13px;
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
::v-deep .contas-bancarias-wrapper {
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
