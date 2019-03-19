// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Meta from "vue-meta";
import PortalVue from 'portal-vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import IndexMobile from "./layouts/Index.vue";
import router from "./router/router";
import store from "./state/store";
import moment from 'moment';



// attach plugins
Vue.use(Meta);
Vue.use(PortalVue);
Vue.use(VueAxios, axios);



// import global components
Vue.component("modal", require('./components/Modal').default);
Vue.component("header-mobile", require('./components/Header').default);



// import Bootstrap 4.0 & FontAwesome (TODO: Change below to min version)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import '@fortawesome/fontawesome-free/css/all.css'



// configure settings
Vue.config.productionTip = false;

Vue.axios.defaults.baseURL = 'https://warehouse.vrdistribution.com.au/';
Vue.axios.defaults.headers.common = {
  'X-CSRF-TOKEN': window.csrfToken,
  'X-Requested-With': 'XMLHttpRequest'
};

/*
window.__INITIAL_STATE__ = '{ "cars": [ { "id": 1, "name": "Buick" } ] }';
window.csrfToken =  '{{csrf_token()}}';
window.pusherKey =  '{{config('broadcasting.connections.pusher.key')}}';


PusherJS
laravel-echo
  https://www.npmjs.com/package/vue-echo-laravel

let initialState = JSON.parse(window.__INITIAL_STATE__);

console.log(initialState)
 */

// https://github.com/chrisvfritz/vue-enterprise-boilerplate/blob/master/src/router/index.js
// https://github.com/vuejs/vue-router/tree/dev/examples



//import tool from './plugins/Vue-DevTools';

window.moment = moment;
window.$store = store;

window.Vue = new Vue({
  //mixins: [tool],
  router,
  store,
  render: h => h(IndexMobile),
}).$mount("#app");

//  defaultTitle: 'VR Warehouse Mobile',

/*
https://github.com/vuejs/vue-router/issues/914
https://stackoverflow.com/questions/47184331/difference-between-beforerouteupdate-and-watching-route-vue-js

Vue.axios.get(api).then((response) => {
  console.log(response.data)
})


https://material.io/design/layout/responsive-layout-grid.html#columns-gutters-margins
https://material.io/design/components/navigation-drawer.html#specs

*/



