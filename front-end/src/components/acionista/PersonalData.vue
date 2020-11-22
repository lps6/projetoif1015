<template>
  <div class="">
    <label class="label-text-style" :style="{ color: colorLabel }">{{
      labelName
    }}</label>
    <div :class="disabled ? 'disabled-btn-wrapper' : 'btn-wrapper'">
      <v-row>
        <v-col cols="2" class="p-0 m-0">
          <div
            :class="
              (disabled ? 'disabled-round-btn-style' : 'round-btn-style') +
                ' d-flex align-center justify-center'
            "
            @click="clickHandler()"
          >
            <v-icon :color="colorIcon">{{ icon }}</v-icon>
          </div>
        </v-col>
        <v-col cols="10" class="p-0 m-0 d-flex align-center">
          <p v-if="!showInput" class="p-0 pl-3 m-0 text-style">{{ value }}</p>
          <input
            v-if="showInput"
            type="text"
            :placeholder="value"
            class="text-style input-style"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalData",
  data() {
    return {
      showInput: false
    };
  },
  props: {
    icon: {
      type: String,
      default: ""
    },
    colorIcon: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    labelName: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    colorLabel: {
      type: String,
      default: ""
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
    },
    clickHandler() {
      if (!this.disabled) {
        this.showInput = !this.showInput;
      }
    }
  },
  created() {
    //
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/globalStyles.scss";
.round-btn-style {
  border-radius: 30px;
  background-color: orange;
  width: 2rem;
  height: 2rem;
  margin-left: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  cursor: pointer;
}
.disabled-round-btn-style {
  background-color: #808080;
  border-radius: 30px;
  width: 2rem;
  height: 2rem;
  margin-left: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
}
::v-deep .v-icon.v-icon {
  font-size: 1rem;
}
.btn-wrapper {
  border-radius: 30px;
  background-color: #ffffff;
}
.input-style {
  outline: none;
  margin-left: 0.5rem;
  width: -webkit-fill-available;
  padding-right: 1rem;
}
.disabled-btn-wrapper {
  border-radius: 30px;
  background-color: #c4c4c4;
  border-width: thin 1px 1px 1px;
  border: 1px solid #ffffff;
}
.label-text-style {
  height: 25px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #454b60;
  font-family: $font-main-bolder;
}
.text-style {
  color: #777777;
  font-family: $font-secondary;
  font-size: 0.7rem !important;
}
.card-wrapper {
  border-radius: 20px;
}
.header-wrapper {
  border-bottom: 2px solid #707070;
  display: flex;
  align-items: center;
  border-width: thin 2px 2px 2px;
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
