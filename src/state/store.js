import Vue from "vue";
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';


Vue.use(Vuex);


import PickingOrders from './modules/PickingOrders';
import Stores from './modules/Stores';
import User from './modules/User';
import {persistentOptions, stateSubscriber} from './stateSubscriptions'



const VuexStore = new Vuex.Store({
    plugins: [
        //createPersistedState(persistentOptions),
        stateSubscriber
    ],
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        PickingOrders,
        Stores,
        User
    },

    state: {},
    getters: {},
    mutations: {},
    actions: {}
})


export default VuexStore;