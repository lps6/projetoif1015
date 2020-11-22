<template>
  <v-app>
    <v-content fluid class="p-0 m-0">
      <v-container fluid class="p-0 m-0">
        <div
          v-if="expandedDrawerMobile"
          class="layer-style"
          @click="showNavDrawer()"
        ></div>
        <v-row :class="$mq === 'xs' ? 'p-relative' : ''">
          <v-col
            :cols="$mq !== 'xs' ? '3' : '9'"
            v-if="hasNavDrawer"
            :class="
              'p-0 m-0 ' +
                (hasNavDrawer && $mq !== 'xs' ? 'navdrawer-position ' : '') +
                (expandedDrawerMobile ? 'navdrawer-mobile-position ' : '')
            "
          >
            <NavDrawer></NavDrawer>
            <v-row class="logo-position">
              <v-col
                cols="12"
                class="d-flex align-center justify-center p-0 m-0"
              >
                <!--
                <img
                  :src="getImage('logo.png')"
                  alt=""
                  class="logo-menu-style"
                />-->
              </v-col>
            </v-row>
          </v-col>
          <v-col
            :cols="hasNavDrawer && $mq !== 'xs' ? '9' : '12'"
            :class="
              'm-0 p-0 ' +
                (hasNavDrawer && $mq !== 'xs' ? 'content-position' : '')
            "
            style="min-height: 100vh;"
          >
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// imports
import NavDrawer from "@/components/general/NavDrawer";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "App",

  components: { NavDrawer },
  computed: {
    ...mapGetters(["expandedDrawerMobile"]),
    hasNavDrawer() {
      return this.$route.meta.navDrawer;
    }
  },
  methods: {
    ...mapMutations(["EXPAND_NAVDRAWER_MOBILE"]),
    getImage(image) {
      return image ? require(`@/assets/images/${image}`) : "";
    },
    showNavDrawer() {
      this.EXPAND_NAVDRAWER_MOBILE(false);
    }
  },
  data: () => ({
    //
  })
};
</script>

<style lang="scss">
@import "@/assets/scss/globalStyles.scss";
@import "@/assets/scss/responsiveStyles.scss";
body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  width: -webkit-fill-available;
}
// to correct row margin overflow mobile
.row {
  margin: 0 !important;
}
.p-0 {
  padding: 0 !important;
}
.m-0 {
  margin: 0 !important;
}
.navdrawer-position {
  position: fixed;
  background-image: linear-gradient(to bottom, #232533, #e9e9e9);
  min-height: 100vh;
}
.navdrawer-mobile-position {
  position: fixed;
  background-color: rgba(35, 37, 51, 0.9);
  min-height: 100vh;
  z-index: 2;
}
.content-position {
  margin-left: 25% !important;
}
.p-relative {
  position: relative;
}
.logo-menu-style {
  width: 20%;
  height: auto;
}
.layer-style {
  position: absolute;
  min-height: 100vh;
  width: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.9);
}
.logo-position {
  position: absolute;
  bottom: 20px;
  margin: 0 auto !important;
  width: 100%;
}
</style>
