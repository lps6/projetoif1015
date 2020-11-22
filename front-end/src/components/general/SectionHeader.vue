<template>
  <div>
    <div class="section-header-style" v-if="$mq !== 'xs'">
      <h2 :style="{ color: sectionTextColor }">{{ sectionText }}</h2>
      <v-card max-width="300" class="" outlined color="#232533">
        <v-list color="#232533" class="pt-0 pb-0">
          <v-list-group
            v-for="item in items"
            :key="item.title"
            v-model="item.active"
            no-action
            class="list-profile-wrapper"
          >
            <v-icon slot="appendIcon" :color="userNameColor" class="m-0"
              >arrow_drop_down</v-icon
            >
            <v-icon slot="prependIcon" :color="userNameColor" class="m-0">{{
              item.action
            }}</v-icon>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title
                  v-text="item.title"
                  :style="{ color: userNameColor, fontSize: fontSize }"
                ></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="subItem in item.items"
              :key="subItem.title"
              @click="clickHandler"
              class="list-options-style"
            >
              <v-list-item-content>
                <v-list-item-title
                  v-text="subItem.title"
                  :style="{ color: userNameColor }"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-card>
    </div>
    <div class="section-header-mobile-style" v-if="$mq === 'xs'">
      <v-row>
        <v-col cols="2" class="d-flex justify-center align-center">
          <v-icon color="#232533" @click="showNavDrawer()">menu</v-icon>
        </v-col>
        <v-col cols="6" class="d-flex flex-wrap align-center">
          <h2 :style="{ color: userNameColor }">{{ userName }}</h2>
          <p :style="{ color: cargoTextColor }" class="p-0 m-0">{{ cargo }}</p>
        </v-col>
        <v-col cols="4" class="d-flex justify-end align-center pb-1">
          <v-card max-width="300" class="" outlined color="#e9e9e9">
            <v-list color="#e9e9e9" class="pt-0 pb-0">
              <v-list-group
                v-for="item in items"
                :key="item.title"
                v-model="item.active"
                no-action
                class="list-profile-mobile-wrapper"
              >
                <v-icon slot="appendIcon" :color="userNameColor" class="m-0"
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
                      :style="{ color: userNameColor }"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import NavDrawer from "@/components/general/NavDrawer";
import { mapMutations } from "vuex";

export default {
  name: "SectionHeader",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    NavDrawer
  },
  computed: {
    avatarSize() {
      if (this.$mq === "xs") {
        return "45";
      } else {
        return "75";
      }
    }
  },
  data() {
    return {
      navDrawer: false,
      fontSize: "0.8rem",
      items: [
        {
          action: "account_circle",
          title: "Fernando Ramalho",
          active: false,
          items: [{ title: "Perfil" }, { title: "Sair" }]
        }
      ]
    };
  },
  props: {
    sectionText: {
      type: String,
      default: ""
    },
    cargo: {
      type: String,
      default: ""
    },
    cargoTextColor: {
      type: String,
      default: "#FFFFFF"
    },
    sectionTextColor: {
      type: String,
      default: "#FFFFFF"
    },
    userName: {
      type: String,
      default: ""
    },
    userNameColor: {
      type: String,
      default: "#888990"
    },
    bgColor: {
      type: String,
      default: "#454B60"
    }
  },
  methods: {
    ...mapMutations(["EXPAND_NAVDRAWER_MOBILE"]),
    clickHandler() {
      this.$emit("click");
    },
    showNavDrawer() {
      this.EXPAND_NAVDRAWER_MOBILE(true);
      this.navDrawer = !this.navDrawer;
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/globalStyles.scss";

.section-header-style {
  background-color: #232533;
  display: flex;
  justify-content: space-between;
  padding-left: 4rem;
  padding-right: 4rem;
  align-items: center;
  h2 {
    font-family: $font-secondary;
    font-size: 15px;
  }
}
.section-header-mobile-style {
  background-color: #e9e9e9;
  border-width: thin 1px 1px 1px;
  border-bottom: 1px solid #707070;
  display: flex;
  align-items: center;
  h2 {
    font-family: $font-secondary;
    font-size: 15px;
  }
}
.list-options-style {
  padding-left: 46px !important;
  border-width: thin 0px 0px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.list-options-mobile-style {
  padding-left: 10px !important;
  border-width: thin 0px 0px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
::v-deep .list-profile-wrapper {
  .v-list-group__header__prepend-icon {
    margin-right: 6px;
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
}
::v-deep .list-profile-mobile-wrapper {
  .v-list-group__header__prepend-icon {
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 0;
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
</style>
