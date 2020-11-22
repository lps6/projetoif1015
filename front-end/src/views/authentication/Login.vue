<template>
  <v-container fluid :class="'login-view'">
    <v-row :class="'no-flex border-logo'">
      <v-col cols="12" align="center" class="img-wrapper mt-4 mb-2 pt-0 pb-0">
        <img
          :src="getImage('logo.png')"
          alt="Logo OIG-CAPITAL"
          :class="$mq === 'xs' ? 'img-style-mobile' : 'img-style'"
        />
      </v-col>
    </v-row>
    <LoginPassword
      v-if="!showLoginEmail"
      @callLoginEmailView="loginEmailHandler()"
    ></LoginPassword>
    <v-row :class="'flex-grow-1'" align="center" v-if="showLoginEmail">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <AuthCard>
            <template v-slot:card-body-content>
              <v-card-title
                :class="
                  'pb-0 pt-3 ' +
                    ($mq === 'xs'
                      ? 'justify-center card-title-mobile-style'
                      : 'justify-start card-title-style')
                "
                >Entrar</v-card-title
              >
              <v-card-subtitle
                :class="
                  'card-subtitle-style mt-2 pb-0' +
                    ($mq === 'xs'
                      ? 'justify-center card-subtitle-mobile-style'
                      : '')
                "
                >Informe suas credenciais para acessar a
                plataforma</v-card-subtitle
              >
              <v-col cols="12" class="input-style pb-0">
                <v-text-field
                  v-model="email_input"
                  :rules="[rules.required]"
                  name="input-10-1"
                  label="Digite o seu e-mail"
                  placeholder="joao@email.com"
                  class=".v-input__slot .v-label .v-text-field input"
                ></v-text-field>
              </v-col>
            </template>
            <template v-slot:card-body-actions>
              <v-row>
                <v-col cols="12" class="mt-1">
                  <RoundedBtn
                    colorBtn="#232533"
                    block
                    text="Prosseguir"
                    :offsetBtnIcon="offsetBtnIcon"
                    :loading="loading"
                    @click="loginPasswordHandler($event)"
                  ></RoundedBtn>
                </v-col>
                <v-col cols="12" align="center" class="pt-0">
                  <p
                    v-if="$mq !== 'xs'"
                    :class="
                      $mq === 'xs' ? 'caller-mobile-style' : 'caller-style'
                    "
                  >
                    <router-link to="/pre-cadastro" class="router-link-style"
                      ><strong>Como se tornar um acionista</strong></router-link
                    >
                    do One Internet Group?
                  </p>
                  <p
                    v-if="$mq === 'xs'"
                    :class="
                      $mq === 'xs' ? 'caller-mobile-style' : 'caller-style'
                    "
                  >
                    <strong>Como ser um acionista</strong>
                    da OIG?
                  </p>
                </v-col>
              </v-row>
            </template>
          </AuthCard>
        </v-row>
      </v-col>
    </v-row>
    <v-row :class="'no-flex'" align="end">
      <v-col cols="12" class="d-flex pb-0">
        <v-col cols="6" align="end" class="pb-0">
          <a
            href="https://s3.us-east-1.amazonaws.com/oig.capital/condi%C3%A7%C3%A3o%20e%20Termos%20de%20uso%20-%20OIG%20Capital.pdf"
            target="_blank"
            rel="noopener"
            class="link-style"
          >
            <p :class="$mq === 'xs' ? 'rules-mobile-style' : 'rules-style'">
              Termos e condições
            </p>
          </a>
        </v-col>
        <v-col cols="6" class="pb-0">
          <a
            href="https://s3.us-east-1.amazonaws.com/oig.capital/Pol%C3%ADtica%20de%20privacidade%20-%20OIG%20Capital%20.pdf"
            target="_blank"
            rel="noopener"
            class="link-style"
          >
            <p :class="$mq === 'xs' ? 'rules-mobile-style' : 'rules-style'">
              Políticas de privacidade
            </p>
          </a>
        </v-col>
      </v-col>
      <v-col cols="12" align="center" class="pt-3">
        <p :class="$mq === 'xs' ? 'copyright-mobile-style' : 'copyright-style'">
          © 2019 One Internet Group. Todos os direitos reservados.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import AuthCard from "@/components/authentication/AuthCard";
import RoundedBtn from "@/components/authentication/RoundedBtn";
import LoginPassword from "@/components/authentication/LoginPassword";

export default {
  name: "Login",
  components: {
    AuthCard,
    RoundedBtn,
    LoginPassword
  },
  data() {
    return {
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      loading: false,
      password: "Password",
      email_input: "",
      showLoginEmail: true,
      rules: {
        required: value => !!value || "Campo obrigatório!",
        emailMatch: () => "The email and password you entered don't match"
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
    }
  },
  methods: {
    ...mapActions(["requestEmail"]),
    ...mapMutations([
      "SET_PROFILE_PIC_URL",
      "SET_NAME",
      "SET_EMAIL",
      "SET_UUID",
      "SET_IS_REGISTERED"
    ]),
    getImage(image) {
      return image ? require(`@/assets/images/${image}`) : "";
    },
    loginPasswordHandler: async function() {
      await this.verifyEmail();
      // this.loading = true;
      // const vue = this;
      // setTimeout(function() {
      //   vue.loading = false;
      //   vue.showLoginEmail = !vue.showLoginEmail;
      // }, 2000);
    },
    loginEmailHandler() {
      this.showLoginEmail = true;
    },
    verifyEmail: async function() {
      this.loading = true;
      var res = await this.requestEmail(this.email_input);
      if (res.code == "SUCCESS") {
        this.SET_PROFILE_PIC_URL(res.data.profile_pic_url);
        this.SET_NAME(res.data.name);
        this.SET_UUID(res.data.uuid);
        this.SET_IS_REGISTERED(res.data.is_registered);
        this.SET_EMAIL(this.email_input);
        if (res.data.is_registered) {
          // Pode logar
          this.showLoginEmail = !this.showLoginEmail;
        } else {
          // Precisa fazer o cadastro antes de logar
          this.$router.push({ name: "cadastro" });
        }
      } else {
        // TODO: mostrar feedback do erro para o usuário
        if (res.code == "ER_BLOCKED_USER") {
          console.error("Usuário bloqueado");
        } else if (res.code == "ER_USER_NOT_ASSESSED") {
          // TODO: Carregar tela de "aguarde por resultado"
          console.error("Usuário pendente de aprovação");
        } else if (res.code == "ER_REJECTED_USER") {
          // TODO: Carregar tela de usuário rejeitado
          console.error("Usuário foi rejeitado");
        } else {
          console.error("Erro no login", res);
        }
      }
      this.loading = false;
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
  font-size: 28px;
  color: #454b60;
  font-weight: 800;
}
.card-title-mobile-style {
  font-family: $font-main-bolder;
  font-size: 20px;
  color: #232533;
  font-weight: 800;
}
.card-subtitle-style {
  font-family: $font-secondary;
  font-size: 14px;
  color: #454b60 !important;
}
.card-subtitle-mobile-style {
  font-family: $font-secondary;
  font-size: 14px;
  text-align: center;
  color: #454b60 !important;
  padding-left: 0;
  padding-right: 0;
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
.router-link-style {
  color: #454b60;
  text-decoration: none;
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
</style>
