<template>
  <div
    class="info-wrapper"
    :style="{ backgroundColor: bgColor, height: infoSize }"
  >
    <v-row>
      <v-col cols="7">
        <h2 :style="{ color: textColor }" class="text-style">{{ text }}</h2>
        <p :style="{ color: valueColor }" class="p-0 m-0 value-style">
          {{ value }}
        </p>
      </v-col>
      <v-col cols="5 pr-0 d-flex align-center">
        <RoundedBtn
          :text="roundedBtnText"
          :colorBtn="roundedBtnBgColor"
          class="btn-style"
          :offsetBtnIcon="offsetBtnIcon"
          btnIcon="fas fa-dollar-sign"
          bgColorIcon="#FA8D28"
          @click="clickHandler()"
        ></RoundedBtn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RoundedBtn from "@/components/authentication/RoundedBtn";

export default {
  name: "InfoRoundedBtn",
  components: {
    RoundedBtn
  },
  data() {
    return {};
  },
  props: {
    roundedBtnText: {
      type: String,
      default: ""
    },
    bgImg: {
      type: String,
      default: ""
    },
    offsetBtnIcon: {
      type: String,
      default: "93%"
    },
    text: {
      type: String
    },
    roundedBtnBgColor: {
      type: String,
      default: "#ffffff"
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
      default: "52px"
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
    getImage(image) {
      return image ? require(`@/assets/images/${image}`) : "";
    },
    clickHandler() {
      this.$emit("click");
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/globalStyles.scss";

.info-wrapper {
  border-radius: 30px;
  background-color: rgb(69, 75, 96);
  display: flex;
  padding-left: 2.5rem;
  justify-content: space-between;
  padding-right: 2.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  align-items: center;
}
.text-style {
  font-family: $font-main;
  font-size: 15px;
  font-weight: 500;
}
.value-style {
  font-family: $font-main-bolder;
  font-size: 28px;
}
</style>
