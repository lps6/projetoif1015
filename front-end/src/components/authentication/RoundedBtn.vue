<template>
  <v-btn
    :block="block"
    rounded
    :color="colorBtn"
    dark
    :class="$mq === 'xs' ? 'login-text-mobile-style' : 'text-style'"
    :loading="loading"
    @click="clickHandler()"
  >
    {{ text }}
    <div
      class="round-btn-icon"
      :style="{ left: offsetBtnIcon, backgroundColor: bgColorIcon }"
      v-if="haveBtnIcon"
    >
      <v-icon
        class="icon-style"
        :style="{ fontSize: btnIconSize }"
        dark
        right
        >{{ btnIcon }}</v-icon
      >
    </div>
  </v-btn>
</template>

<script>
export default {
  name: "RoundedBtn",
  data() {
    return {};
  },
  props: {
    colorBtn: {
      type: String
    },
    block: {
      type: Boolean
    },
    colorSmallBtn: {
      type: String
    },
    text: {
      type: String
    },
    offsetBtnIcon: {
      type: String,
      default: "93%"
    },
    loading: {
      type: Boolean,
      default: false
    },
    bgColorIcon: {
      type: String,
      default: "#fa8d28"
    },
    btnIcon: {
      type: String,
      default: "keyboard_arrow_right"
    },
    haveBtnIcon: {
      type: Boolean,
      default: true
    },
    btnIconSize: {
      type: String,
      default: "24px"
    }
  },
  methods: {
    clickHandler() {
      this.$emit("click");
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/globalStyles.scss";

.round-btn-icon {
  width: 28px;
  height: 28px;
  border-radius: 30px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-style {
  padding: 0 !important;
  margin: 0 !important;
}
.text-style {
  font-family: $font-main;
  height: 40px !important;
}
.text-style:hover {
  font-family: $font-main;
  height: 40px !important;
  cursor: pointer;
}
.login-text-mobile-style {
  font-family: $font-main;
  height: 48px !important;
}
.login-text-mobile-style:hover {
  font-family: $font-main;
  height: 48px !important;
  cursor: pointer;
}
</style>
