import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";

Vue.use(Router);

// const base =  process.env.NODE_ENV === "production"   ? "/Layout-system-with-vue-and-vue-router/": "/";

// best to use import in route definition, above route object or require?

// https://github.com/vuejs/vue-router/tree/dev/examples
const router = new Router({
  // Use the HTML5 history API (i.e. normal-looking router)
  // instead of router with hashes (e.g. example.com/#/about).
  // This may require some server configuration in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  mode: "history",

  base: "/",

  routes
});

// https://github.com/chrisvfritz/vue-enterprise-boilerplate/blob/master/src/router/index.js

export default router;
