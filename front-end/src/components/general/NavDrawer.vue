<template>
  <div>
    <!-- Mobile NavDrawer -->
    <v-container fluid v-if="$mq === 'xs' && expandedDrawerMobile" class="p-0">
      <div v-if="permissao === 'acionista'">
        <v-row class="header-bg">
          <v-col
            cols="12"
            :class="
              'd-flex align-center justify-space-between ' +
                ($mq === 'xs' ? 'pb-1' : '')
            "
          >
            <v-icon class="m-0" color="#ffffff" @click="showNavDrawer()"
              >close</v-icon
            >
            <v-card max-width="300" class="" outlined color="#232533">
              <v-list color="#232533" class="pt-0 pb-0">
                <v-list-group
                  v-for="item in items"
                  :key="item.title"
                  v-model="item.active"
                  no-action
                  class="list-profile-mobile-wrapper"
                >
                  <v-icon slot="appendIcon" color="#ffffff" class="m-0"
                    >arrow_drop_down</v-icon
                  >
                  <div class="avatar-wrapper p-0 m-0" slot="prependIcon">
                    <div
                      class="money-progress d-flex justify-center align-center p-0 m-0"
                    >
                      <v-progress-circular
                        :value="95"
                        size="55"
                        color="#FA8D28"
                        rotate="270"
                        width="5"
                        class="p-0 m-0"
                      >
                        <v-avatar color="" :size="avatarSize" class="p-0 m-0">
                          <img
                            src="https://cdn.vuetifyjs.com/images/john.jpg"
                            alt="John"
                          />
                        </v-avatar>
                      </v-progress-circular>
                    </div>
                  </div>
                  <v-list-item
                    v-for="subItem in item.items"
                    :key="subItem.title"
                    @click="clickHandler"
                    class="list-options-mobile-style p-0 m-0"
                  >
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="subItem.title"
                        style="color: #888990;"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-group>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
        <div class="mt-5">
          <v-row
            v-for="(section, sectionIndex) in sections"
            :key="sectionIndex"
          >
            <v-col cols="12" class="padding-section pt-0">
              <h1
                :class="
                  'section-title mb-1 ' +
                    ($mq === 'xs'
                      ? 'd-flex justify-start section-title-mobile'
                      : '')
                "
              >
                {{ section.title }}
              </h1>
              <div
                v-for="(item, itemIndex) in section.itens"
                :key="itemIndex"
                @click="itemClickHandler(sectionIndex, itemIndex)"
                :class="
                  'd-flex pl-1rem ' +
                    (item.active ? 'option-active' : 'option') +
                    ($mq === 'xs' && !item.active ? ' justify-start' : '')
                "
              >
                <div :class="item.active ? 'option-active-img' : ''"></div>
                <v-icon alt="" class="img-icon-style">{{ item.icon }}</v-icon>
                <p
                  :class="
                    'option-title d-flex justify-start align-center mb-0 ml-5 ' +
                      ($mq === 'xs' ? 'option-title-mobile' : '')
                  "
                >
                  {{ item.name }}
                </p>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>

    <!-- Desktop NavDrawer -->
    <v-container fluid class="navDrawer-wrapper pb-0 pr-0" v-if="$mq !== 'xs'">
      <v-row>
        <v-col cols="12" class="d-flex justify-center align-center pb-0 pt-0">
          <div class="avatar-wrapper">
            <div class="money-progress d-flex justify-center align-center">
              <v-progress-circular
                :value="95"
                size="88"
                color="#FA8D28"
                rotate="270"
                width="6"
              >
                <v-avatar color="" :size="avatarSize">
                  <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                  />
                </v-avatar>
              </v-progress-circular>
            </div>
            <h2 class="avatar-name">{{ avatar_name.toUpperCase() }}</h2>
            <p class="cargo-style text-center mb-2">Acionista</p>
          </div>
        </v-col>
      </v-row>
      <div v-if="permissao === 'acionista'">
        <v-row v-for="(section, sectionIndex) in sections" :key="sectionIndex">
          <v-col cols="12" class="padding-section pt-0">
            <h1 class="section-title mb-1">{{ section.title }}</h1>
            <div
              v-for="(item, itemIndex) in section.itens"
              :key="itemIndex"
              @click="itemClickHandler(sectionIndex, itemIndex)"
              :class="
                'd-flex pl-1rem ' + (item.active ? 'option-active ' : 'option ')
              "
            >
              <div :class="item.active ? 'option-active-img' : ''"></div>
              <v-icon alt="" class="img-icon-style">{{ item.icon }}</v-icon>
              <p
                class="option-title d-flex justify-start align-center mb-0 ml-5"
              >
                {{ item.name }}
              </p>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "NavDrawer",
  computed: {
    ...mapGetters(["expandedDrawerMobile"]),
    avatarSize() {
      if (this.$mq === "xs") {
        return "45";
      } else {
        return "75";
      }
    },
    permissao() {
      return this.$route.meta.permissao;
    }
  },
  data() {
    return {
      items: [
        {
          action: "account_circle",
          title: "Fernando Ramalho",
          active: false,
          items: [{ title: "Perfil" }, { title: "Sair" }]
        }
      ],
      avatar_name: "Fernando Ramalho",
      sections: [
        {
          title: "ÁREA DO ACIONISTA",
          permissao: "acionista",
          itens: [
            {
              name: "CONFIGURAÇÕES",
              routeName: "configNotification",
              icon: "fas fa-columns",
              active: true,
              sons: [
                {
                  name: "",
                  icon: "",
                  active: false
                }
              ]
            },
            /*
            {
              name: "VISÃO GERAL",
              routeName: "visaoGeralAcionista",
              icon: "fas fa-columns",
              active: true,
              sons: [
                {
                  name: "",
                  icon: "",
                  active: false
                }
              ]
            },
            {
              name: "MINHAS AÇÕES",
              icon: "fas fa-chart-line",
              routeName: "minhasAcoes",
              active: false,
              sons: [
                {
                  name: "",
                  icon: "",
                  active: false
                }
              ]
            },
            {
              name: "EXTRATO FINANCEIRO",
              icon: "far fa-list-alt",
              routeName: "extratoFinanceiroAcionista",
              active: false,
              sons: [
                {
                  name: "",
                  icon: "",
                  active: false
                }
              ]
            },
            {
              name: "MEUS SAQUES",
              icon: "fas fa-dollar-sign",
              routeName: "meusSaques",
              active: false,
              sons: [
                {
                  name: "",
                  icon: "",
                  active: false
                }
              ]
            }
          ]
        },
        {
          title: "MINHA CONTA",
          itens: [
            {
              name: "MEUS DADOS",
              routeName: "meusDados",
              icon: "far fa-user",
              active: false,
              sons: [
                {
                  name: "",
                  icon: "",
                  active: false
                }
              ]
            },
            {
              name: "DOCUMENTOS",
              routeName: "documentos",
              icon: "far fa-address-card",
              active: false,
              sons: [
                {
                  name: "",
                  icon: "",
                  active: false
                }
              ]
            },
            {
              name: "MUDAR SENHA",
              routeName: "mudarSenha",
              icon: "fas fa-user-lock",
              active: false,
              sons: [
                {
                  name: "",
                  icon: "",
                  active: false
                }
              ]
            },*/
            {
              name: "LOGOUT",
              icon: "fas fa-sign-out-alt",
              active: false,
              sons: [
                {
                  name: "",
                  icon: "",
                  active: false
                }
              ]
            }
          ]
        }
      ]
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
    ...mapMutations(["EXPAND_NAVDRAWER_MOBILE"]),
    clickHandler() {
      this.$emit("click");
    },
    getImage(image) {
      return image ? require(`@/assets/images/${image}`) : "";
    },
    getIcon(icon) {
      return icon ? require(`@/assets/icons/${icon}`) : "";
    },
    itemClickHandler(sectionIndex, itemIndex) {
      this.sections.forEach((section, i) => {
        section.itens.forEach((item, j) => {
          this.sections[i]["itens"][j]["active"] = false;
        });
      });
      this.sections[sectionIndex]["itens"][itemIndex]["active"] = true;
      this.$router.push({
        name: this.sections[sectionIndex]["itens"][itemIndex]["routeName"]
      });
      console.log(sectionIndex);
    },
    showNavDrawer() {
      this.EXPAND_NAVDRAWER_MOBILE(false);
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/globalStyles.scss";
.header-bg {
  background-color: rgba(35, 37, 51, 1);
  border-width: thin 1px 1px 1px;
  border-bottom: 1px solid #ffffff;
}
.list-options-mobile-style {
  padding-left: 10px !important;
  border-width: thin 0px 0px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
::v-deep .list-profile-mobile-wrapper {
  .v-list-group__header__prepend-icon {
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 0 !important;
  }
  .v-list-group__header__append-icon {
    margin-left: 0 !important;
    min-width: 20px !important;
  }
  .v-list-group__items {
    position: absolute;
    width: -webkit-fill-available;
    background-color: rgb(255, 255, 255);
    margin-top: 1px;
    z-index: 1;
  }
  .v-list-group__header {
    padding: 0;
  }
}
.logo-menu-style {
  width: 20%;
  height: auto;
}
.navDrawer-wrapper {
  background-color: #454b60;
  min-height: 100vh;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}
.avatar-name {
  color: #ffffff;
  font-family: $font-main-bolder;
  font-size: 18px;
}
.cargo-style {
  color: #7f8392;
  font-size: 16px;
}
.section-title {
  color: #ffffff;
  font-family: $font-main-bolder;
  // font-size: 20px;
  font-size: 1.1rem;
  border-bottom: 2px solid rgb(42, 41, 44, 0.4);
  margin-left: 1rem;
}
.section-title-mobile {
  color: #fa8d28;
  font-family: $font-main-bolder;
  // font-size: 20px;
  font-size: 1.1rem;
  border-bottom: none !important;
  margin-left: 1rem;
}
.option-title {
  color: #ffffff;
  font-family: $font-secondary;
  // font-size: 14px;
  font-size: 0.85rem;
  font-weight: 600;
  z-index: 2;
}
.option-title-mobile {
  color: #ffffff;
  font-family: $font-secondary;
  // font-size: 14px;
  font-size: 0.85rem;
  font-weight: 600;
  width: 100%;
  z-index: 2;
}
.padding-section {
  padding-left: 1rem;
  padding-right: 0;
}
.img-icon-style {
  color: #ffffff !important;
  min-width: 40px;
  // font-size: 20px !important;
  font-size: 1.1rem !important;
}
.pl-1rem {
  padding-left: 1rem;
}
.option {
  position: relative;
  height: 38px;
  padding-right: 2rem;
  // height: 43px;
  // .v-icon {
  // position: absolute;
  // top: 0px;
  // }
  // .option-title {
  //   // position: absolute;
  //   // left: 55px;
  // }
}
.option:hover {
  position: relative;
  height: 38px;
  // height: 43px;
  cursor: pointer;
}
.option-active {
  // height: 70px;
  height: 60px;
  justify-content: start;
  padding-right: 2rem;
  position: relative;
  // border-radius: 30px;
  .img-icon-style {
    color: #454b60 !important;
  }
  .option-title {
    color: #454b60 !important;
  }
}
.option-active:hover {
  height: 60px;
  // height: 70px;
  border-radius: 30px;
  .img-icon-style {
    color: #454b60 !important;
  }
  .option-title {
    color: #454b60 !important;
  }
  cursor: pointer;
}

@media screen and (min-width: 1904px) {
  .option-title {
    color: #ffffff;
    font-family: $font-secondary;
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
