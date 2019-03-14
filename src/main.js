// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Meta from "vue-meta";
import axios from 'axios'
import VueAxios from 'vue-axios'
import IndexMobile from "./layouts/IndexMobile.vue";
import router from "./router/router";
import store from "./state/store";


// attach plugins
Vue.use(Meta);
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
	<script>
		window.csrfToken =  '{{csrf_token()}}';
		window.pusherKey =  '{{config('broadcasting.connections.pusher.key')}}';
	</script>

	PusherJS
	laravel-echo
	  https://www.npmjs.com/package/vue-echo-laravel

let initialState = JSON.parse(window.__INITIAL_STATE__);

console.log(initialState)
 */


//import tool from './plugins/Vue-DevTools';


new Vue({
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



