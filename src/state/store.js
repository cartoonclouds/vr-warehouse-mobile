import Vue from "vue";
import Vuex from 'vuex';


Vue.use(Vuex);


import PickingOrders from './modules/PickingOrders';
import Stores from './modules/Stores';
import User from './modules/User';


const VuexStore = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        PickingOrders,
        Stores,
        User
    },

    state: {},
    getters: {},
    mutations: {},
    actions: {



    }
})


export default VuexStore;