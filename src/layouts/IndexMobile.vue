<template>
  <div id="app">

    <responsive-nav></responsive-nav>

    <router-view />

    <!-- <footer-bar /> -->
  </div>
</template>

<script>
import ResponsiveNav from "../components/ResponsiveNav";
import FooterBar from "../components/Footer";

export default {
  name: "App",
  metaInfo: {
    titleTemplate(pageTitle) {
      return pageTitle ? `${pageTitle} | VR Warehouse Mobile` : 'VR Warehouse Mobile';
    },
    meta: [
      { name: 'csrf-token', content: 'u0Zl4rYDIyH22n5fZZW6b7d2DMKRT571ZTUDw9fl' },
    ]
  },
  components: {
    ResponsiveNav,
    //FooterBar
  },
  mounted: function() {

  },

};
</script>

<style>
html,
body {
  margin: 0;
}

* {
  box-sizing: border-box;
}

body {
  font-size: 14px;
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}

</style>
