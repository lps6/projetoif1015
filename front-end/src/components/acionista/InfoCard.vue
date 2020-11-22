<template>
  <div class="card-wrapper" :style="{ backgroundColor: cardColor }">
    <v-row>
      <v-col cols="12" class="header-wrapper">
        <h2 :style="{ color: headerColor }">{{ headerText }}</h2>
      </v-col>
      <v-col cols="12">
        <slot name="card-body-content"></slot>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "InfoCard",
  components: {},
  data() {
    return {};
  },
  props: {
    hasHeader: {
      type: Boolean,
      default: false
    },
    headerText: {
      type: String,
      default: ""
    },
    headerColor: {
      type: String,
      default: ""
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

.card-wrapper {
  border-radius: 20px;
}
.header-wrapper {
  border-bottom: 2px solid #c1c1c1;
  display: flex;
  align-items: center;
  border-width: thin 2px 2px 2px;
  h2 {
    padding-left: 1.7rem;
  }
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
