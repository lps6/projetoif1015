<template>
  <v-container fluid :class="'login-view'">
    <v-row :align="$mq === 'xs' ? 'flex-start' : 'center'">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <AuthCard
            :hasHeader="true"
            headerText="Mudar Senha"
            headerIcon="lock.svg"
            :importIcon="true"
            cardColor="#FFFFFF"
            class="contas-bancarias-wrapper"
          >
            <template v-slot:card-body-content>
              <v-row class="align-center">
                <v-col cols="12" class="p-0">
                  <div class="bank-content-wrapper pl-6 pr-6">
                    <p class="pl-9 pr-9 p-0 m-0">
                      Para garantir a segurança a senha precisa ter no mínimo 6
                      dígitos em uma combinação de letras e números.
                    </p>
                    <v-form
                      v-model="BAFormValid"
                      ref="BAForm"
                      class="pl-3 pr-3 BAForm-style mt-1"
                    >
                      <v-row class="mt-1">
                        <v-col cols="12" class="p-0 m-0">
                          <div class="bank-selected-wrapper">
                            <label class="label-text-style">Senha atual</label>
                            <v-text-field
                              v-model="password_input"
                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                              :rules="[rules.required, rules.min]"
                              :type="show1 ? 'text' : 'password'"
                              name="input-10-21"
                              class="outlined-input-style"
                              solo
                              label="Digite uma senha:"
                              hint="Mínimo de 6 caracteres!"
                              placeholder="******"
                              @click:append="show1 = !show1"
                            ></v-text-field>
                            <label class="label-text-style">Nova Senha</label>
                            <v-text-field
                              v-model="confirm_password_input"
                              solo
                              class="outlined-input-style"
                              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                              :rules="[rules.required, rules.min]"
                              :type="show2 ? 'text' : 'password'"
                              name="input-10-22"
                              label="Repita a sua senha:"
                              hint="Mínimo de 6 caracteres!"
                              placeholder="******"
                              @click:append="show2 = !show2"
                            ></v-text-field>
                            <label class="label-text-style"
                              >Repita a nova senha</label
                            >
                            <v-text-field
                              v-model="confirm_password_input"
                              solo
                              class="outlined-input-style"
                              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                              :rules="[rules.required, rules.min]"
                              :type="show2 ? 'text' : 'password'"
                              name="input-10-22"
                              label="Repita a sua senha:"
                              hint="Mínimo de 6 caracteres!"
                              placeholder="******"
                              @click:append="show2 = !show2"
                            ></v-text-field>
                          </div>
                        </v-col>
                      </v-row>
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
                        text="SALVAR NOVA SENHA"
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
  name: "MudarSenha",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    RoundedBtn,
    AuthCard
  },
  data() {
    return {
      password_input: "",
      confirm_password_input: "",
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
      withdraw_value_input: null,
      show1: false,
      show2: false,
      rules: {
        required: value => !!value || "Campo obrigatório!"
      }
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
  font-size: 15px;
  font-weight: 600;
  color: #454b60 !important;
  font-family: $font-main-bolder;
}
.warn-style {
  font-size: 13px;
}
.bank-selected-wrapper {
  background-color: #ffffff;
  border-radius: 30px;
  padding: 0.8rem 1.5rem;
}
.bank-text-style {
  color: #ffffff;
}
.bank-content-wrapper {
  p {
    color: #454b60;
  }
}
::v-deep .outlined-input-style > .v-input__control > .v-input__slot {
  box-shadow: none !important;
  border-width: thin 1px 1px 1px;
  border: 1px solid #cfcfcf;
  background-color: #ffffff;
  border-radius: 8px;
  min-height: 33px;
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
