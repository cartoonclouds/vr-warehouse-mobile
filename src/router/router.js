import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";


Vue.use(Router);


const router = new Router({

  mode: "history", // May require some server configuration in production:   // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations

  base: "/",

  routes

});


// setup router hooks
router.afterEach((to, from) => {
  window.scrollTo(0,0);
})


export default router;
