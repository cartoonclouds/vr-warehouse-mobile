<template>
  <header ID="header">

    <slot />

    <img src="https://uploads.codesandbox.io/uploads/user/64930f3b-61d2-4edb-ad5a-b3b288b3e305/0kFX-vr-white-icon-64x64.png" width="32px" height="32px">
    
  </header>
</template>

<script>
export default {
  name: "header-mobile"
};
</script>

<style scoped>
  header {
    height: 64px;
    width: 100%;
    position: sticky;
    z-index: 888;;
    top: 0;
    padding: 10px 60px 10px 60px;

    display: flex;
    align-items: baseline;

    border-bottom: 2px solid #ddd;

    /* https://cssgradient.io/ */
    background: rgb(141,198,63);


   }

  img {
    position: absolute;
    right: 10px;
    top: calc( (64px - 32px) / 2);
  }
</style>
