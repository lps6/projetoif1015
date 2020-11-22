<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center" :class="'padding-card'">
          <v-card
            :color="cardColor"
            outlined=""
            :class="
              'mx-auto ' + ($mq === 'xs' ? 'card-style-mobile' : 'card-style')
            "
          >
            <v-list-item v-if="hasHeader">
              <v-list-item-content class="content-header-wrapper">
                <div class="header-wrapper" v-if="!rulesHeader">
                  <v-icon size="40" v-if="!importIcon">{{ headerIcon }}</v-icon>
                  <img
                    :src="getIcon(headerIcon)"
                    alt=""
                    class="img-icon-style"
                    v-if="importIcon"
                  />
                  <h2 class="header-style">{{ headerText }}</h2>
                </div>
                <div class="header-wrapper" v-if="rulesHeader">
                  <v-row>
                    <v-col cols="3" class="pl-5 pb-0">
                      <v-icon size="40" v-if="!importIcon">{{
                        headerIcon
                      }}</v-icon>
                      <img
                        :src="getIcon(headerIcon)"
                        alt=""
                        class="img-icon-style"
                        v-if="importIcon"
                      />
                    </v-col>
                    <v-col cols="9" class="pl-0 pr-0 pt-6 pb-0">
                      <h2 class="header-style">{{ headerText }}</h2>
                      <p class="m-0 p-0 mt-2 subtitle-style">
                        ÚLTIMA ATUALIZAÇÃO: 19/03/2020
                      </p>
                      <div class="icons-group">
                        <v-icon size="25" color="#E39648">share</v-icon>
                        <a
                          href="./../../assets/documents/minuta_de_contrato.pdf"
                          target="_blank"
                          rel="noopener"
                          class="link-style"
                        >
                          <img
                            :src="getIcon('download.svg')"
                            alt=""
                            class="sub-icon"
                        /></a>
                        <v-icon size="25" color="#E39648">print</v-icon>
                      </div>
                    </v-col>
                  </v-row>
                </div>
                <v-icon
                  @click="closeHandler"
                  class="close-style"
                  v-if="hasCloseBtn"
                  >close</v-icon
                >
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-card-text
              :class="
                $mq === 'xs'
                  ? 'card-body-mobile pb-20px padding-sides-15px'
                  : 'card-body pb-0'
              "
            >
              <slot name="card-body-content"></slot>
            </v-card-text>

            <v-card-actions
              :class="
                'pt-0 pb-0 ' +
                  ($mq === 'xs'
                    ? 'card-actions-mobile-style card-body-mobile'
                    : 'card-actions-style card-body')
              "
            >
              <slot name="card-body-actions"></slot>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "AuthCard",
  data() {
    return {};
  },
  props: {
    hasHeader: {
      type: Boolean,
      default: false
    },
    rulesHeader: {
      type: Boolean,
      default: false
    },
    headerText: {
      type: String,
      default: ""
    },
    importIcon: {
      type: Boolean,
      default: false
    },
    hasCloseBtn: {
      type: Boolean,
      default: false
    },
    headerIcon: {
      type: String,
      default: ""
    },
    cardColor: {
      type: String,
      default: "#FFFFFF"
    }
  },
  methods: {
    closeHandler() {
      this.$router.go(-1);
    },
    getIcon(icon) {
      return icon ? require(`@/assets/icons/${icon}`) : "";
    },
    getDocument(doc) {
      return doc ? window.open(`@/assets/documents/${doc}`, "_blank") : "";
    }
  },
  created() {
    //
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/globalStyles.scss";

.header-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0px;
}
.subtitle-style {
  font-family: $font-secondary;
  font-size: 0.8rem;
}
.icons-group {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  i {
    cursor: pointer;
  }
  .sub-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  .sub-icon:hover {
    cursor: pointer;
  }
}
.content-header-wrapper {
  padding: 5px 0 !important;
  padding-top: 10px !important;
}
.header-style {
  font-family: $font-main-bolder;
  font-size: 20px;
  font-weight: 800;
}
.close-style {
  position: absolute;
  right: 20px;
}
.card-style {
  border-radius: 30px !important;
  width: 500px;
}
.card-style-mobile {
  width: 100%;
  border-radius: 30px !important;
  padding-bottom: 20px;
}
.card-body {
  padding: 10px 40px !important;
}
.card-body-mobile {
  padding: 10px 20px !important;
}
.padding-sides-15px {
  padding-left: 15px !important;
  padding-right: 15px !important;
}
.pb-20px {
  padding-bottom: 20px !important;
}
.padding-sides-10px {
  padding-left: 10px !important;
  padding-right: 10px !important;
}
.card-actions-style {
  padding-bottom: 30px !important;
  margin-top: -10px;
}
.card-actions-mobile-style {
  position: absolute;
  top: 80%;
}
.padding-card {
  margin-top: 32px;
}
.img-icon-style {
  width: 38px;
  height: auto;
  object-fit: cover;
  margin-right: 10px;
}
@media screen and (max-width: 339px) {
  .padding-card {
    margin-top: 0 !important;
  }
  .card-body-mobile {
    padding: 10px 10px !important;
  }
}
</style>
