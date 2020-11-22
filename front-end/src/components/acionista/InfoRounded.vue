<template>
  <div
    :class="
      $mq === 'xs'
        ? 'info-wrapper-mobile d-flex justify-center align-center'
        : 'info-wrapper'
    "
    :style="{ backgroundColor: bgColor, height: infoSize }"
  >
    <div
      :class="$mq === 'xs' ? 'content-wrapper-mobile pt-1' : 'content-wrapper'"
    >
      <h2 :style="{ color: textColor }" class="text-style">{{ text }}</h2>
      <p
        :style="{ color: valueColor }"
        :class="
          'p-0 m-0 ' + ($mq === 'xs' ? 'value-style-mobile' : 'value-style')
        "
      >
        {{ value }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoRounded",
  data() {
    return {};
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
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: flex;
  align-items: center;
}
.content-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}
.content-wrapper-mobile {
  text-align: center;
}
.info-wrapper-mobile {
  border-radius: 30px;
  background-color: rgb(69, 75, 96);
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
.value-style-mobile {
  font-family: $font-main-bolder;
  font-size: 1.8rem;
}
</style>
