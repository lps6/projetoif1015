<template>
  <div
    :class="$mq === 'xs' ? 'info-wrapper-mobile' : 'info-wrapper'"
    :style="{ backgroundColor: bgColor, height: infoSize }"
  >
    <v-row>
      <v-col
        cols="12"
        v-if="$mq === 'xs'"
        class="p-0 m-0 d-flex justify-center align-center"
      >
        <div class="text-center">
          <h2 :style="{ color: textColor }" class="text-style-mobile">
            {{ text }}
          </h2>
          <v-form v-model="formValidLeft" ref="formLeft">
            <input
              v-model="acoes_buy_input"
              name="input-10-1"
              :placeholder="placeholder"
              type="text"
              class=".v-input__slot .v-label .v-text-field input input-style-mobile text-center pl-0"
            />
          </v-form>
        </div>
      </v-col>
      <v-col cols="7" class="align-center d-flex" v-if="$mq !== 'xs'">
        <h2 :style="{ color: textColor }" class="text-style">{{ text }}</h2>
      </v-col>
      <v-col cols="5" class="input-wrapper" v-if="$mq !== 'xs'">
        <v-form v-model="formValidLeft" ref="formLeft" class="h-100">
          <input
            v-model="acoes_buy_input"
            name="input-10-1"
            :placeholder="placeholder"
            type="text"
            class=".v-input__slot .v-label .v-text-field input h-100 input-style"
          />
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "QuestionRounded",
  data() {
    return {
      formValidLeft: false,
      acoes_buy_input: 0
    };
  },
  props: {
    placeholder: {
      type: String,
      default: ""
    },
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
.input-style {
  font-family: "DroidSansBolder", sans-serif;
  font-size: 2rem;
  color: #6a6a6a;
  width: 100%;
  padding-left: 50px;
}
.input-style-mobile:focus {
  outline: none;
}
.input-style-mobile {
  height: 30px;
  font-family: "DroidSansBolder", sans-serif;
  font-size: 1.8rem;
  color: #6a6a6a;
  width: 100%;
  padding-left: 50px;
}
.input-style:focus {
  outline: none;
}
.h-100 {
  height: 100%;
}
.input-wrapper {
  padding: 0;
  border-left: 1px solid #acacac;
  border-width: thin 1px 1px 1px;
}
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
.info-wrapper-mobile {
  border-radius: 30px;
  background-color: rgb(69, 75, 96);
  display: flex;
  padding-left: 2rem;
  justify-content: space-between;
  padding-right: 2rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  align-items: center;
}
.text-style {
  font-family: $font-main;
  font-size: 15px;
  font-weight: 500;
}
.text-style-mobile {
  color: #303767;
  font-family: $font-main-bolder;
  font-size: 15px;
}
.value-style {
  font-family: $font-main-bolder;
  font-size: 28px;
}
</style>
