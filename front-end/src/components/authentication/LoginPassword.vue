<template>
  <v-row :class="'flex-grow-1'" align="center">
    <v-col cols="12">
      <v-row align="center" justify="center">
        <AuthCard>
          <template v-slot:card-body-content>
            <v-card-title class="pb-0 pt-3">
              <v-row :class="$mq === 'xs' ? 'avatar-mobile-style' : ''">
                <v-col cols="12">
                  <v-row justify="center">
                    <v-avatar color="orange" :size="avatarSize">
                      <img :src="getProfilePicUrl" alt="John" />
                    </v-avatar>
                  </v-row>
                </v-col>
                <v-col cols="12" class="pt-0 pb-3">
                  <v-row justify="center">
                    <h2 class="card-title-style">{{ getEmail }}</h2>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-subtitle
              :class="
                $mq === 'xs'
                  ? 'card-subtitle-mobile-style '
                  : 'card-subtitle-style ' + 'justify-center d-flex pb-0 mb-1'
              "
            >
              Informe sua senha para acessar a plataforma
            </v-card-subtitle>
            <v-col cols="12" class="input-style pb-0">
              <v-text-field
                v-model="password_input"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Digite a sua senha"
                hint="Mínimo de 6 caracteres!"
                placeholder="********"
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
          </template>
          <template v-slot:card-body-actions>
            <v-row>
              <v-col
                cols="12"
                :class="
                  'mt-1 d-flex ' +
                    ($mq === 'xs' ? 'padding-sides-10px pb-0' : '')
                "
                align="center"
                justify="center"
              >
                <v-col cols="2" :class="$mq === 'xs' ? 'no-padding-sides' : ''">
                  <v-btn
                    block
                    rounded
                    color="#B7B5B5"
                    :class="
                      $mq === 'xs' ? 'backBtn-mobile-style' : 'backBtn-style'
                    "
                    @click="loginHandler()"
                  >
                    <v-icon class="icon-style">keyboard_arrow_left</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="10" :class="$mq === 'xs' ? 'pl-10px' : 'pl-0'">
                  <RoundedBtn
                    colorBtn="#232533"
                    block
                    text="Prosseguir"
                    :offsetBtnIcon="offsetBtnIcon"
                  ></RoundedBtn>
                </v-col>
              </v-col>
              <v-col cols="12" align="center" class="pt-0">
                <p
                  v-if="$mq !== 'xs'"
                  :class="$mq === 'xs' ? 'caller-mobile-style' : 'caller-style'"
                >
                  Esqueceu sua senha?
                  <strong>Clique aqui para recuperar.</strong>
                </p>
                <p
                  v-if="$mq === 'xs'"
                  :class="$mq === 'xs' ? 'caller-mobile-style' : 'caller-style'"
                >
                  <strong>Esqueci minha senha</strong>
                </p>
              </v-col>
            </v-row>
          </template>
        </AuthCard>
      </v-row>
    </v-col>
  </v-row>
  <!-- End Desktop Screen -->
</template>

<script>
import { mapGetters } from "vuex";

import AuthCard from "@/components/authentication/AuthCard";
import RoundedBtn from "@/components/authentication/RoundedBtn";

export default {
  name: "LoginPassword",
  components: {
    AuthCard,
    RoundedBtn
  },
  data() {
    return {
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      password: "Password",
      rules: {
        required: value => !!value || "Campo obrigatório!",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  computed: {
    ...mapGetters(["getName", "getProfilePicUrl", "getEmail"]),
    offsetBtnIcon() {
      if (this.$mq === "xs") {
        return "88%";
      } else {
        return "93%";
      }
    },
    avatarSize() {
      if (this.$mq === "xs") {
        return "80";
      } else {
        return "87";
      }
    }
  },
  methods: {
    getImage(image) {
      return image ? require(`@/assets/images/${image}`) : "";
    },
    loginHandler() {
      this.$emit("callLoginEmailView");
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/globalStyles.scss";

.login-view {
  min-height: 100%;
  margin: 0;
  padding: 0;
  background-image: url(~@/assets/images/bgg.png);
  display: flex;
  flex-direction: column;
  background-position: center;
}
.border-logo {
  border-bottom: 1px solid #383a46;
}
.card-title-style {
  font-family: $font-main-bolder;
  font-size: 17px;
  color: #454b60;
  font-weight: 800;
}
.card-subtitle-style {
  font-family: $font-secondary;
  font-size: 14px;
}
.card-subtitle-mobile-style {
  font-family: $font-secondary;
  font-size: 14px;
  text-align: center;
  color: #454b60 !important;
  padding-left: 0;
  padding-right: 0;
  padding-top: 77px;
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
::v-deep .v-input .v-label {
  height: 25px;
  line-height: 20px;
  font-size: 18px;
  font-weight: 800;
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
.icon-style {
  color: $color-white !important;
  font-size: 18px;
  font-weight: 800;
}
.backBtn-style {
  height: 40px !important;
  padding: 0 !important;
}
.backBtn-mobile-style {
  height: 48px !important;
  padding: 0 !important;
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
.no-padding-sides {
  padding-left: 0;
  padding-right: 0;
}
.padding-sides-10px {
  padding-left: 10px !important;
  padding-right: 10px !important;
}
.pl-10px {
  padding-left: 10px;
}
.avatar-mobile-style {
  position: absolute;
  left: 0;
  top: -50px;
}
::v-deep .v-btn--contained {
  box-shadow: none;
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
}
@media screen and (max-width: 339px) {
  .pl-10px {
    padding-right: 0;
  }
  .padding-sides-10px {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
}
</style>
