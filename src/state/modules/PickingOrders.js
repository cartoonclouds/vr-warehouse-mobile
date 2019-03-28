

import {pickingOrderAjaxRequest} from '../../api/api'
import Vue from "vue";


export default {
    namespaced: true,

    state: {
        pickingOrders: {}
    },
    getters: {
        stateLoaded: (state) => { return Object.keys(state.pickingOrders).length > 0 },
        get: (state) => (id) => {
            return state.pickingOrders[id]
        },
        getByStore: (state) => (id) => {
            return state.pickingOrders.find(pickingOrder => pickingOrder.store_id == id)
        },

        getProducts: (state) => (id) => {
            return state.pickingOrders[id];
        },
        getProduct: (state) => (id, productId) => {
            return state.pickingOrders[id].products[productId]
        },
        getProductByBarcode: (state) => (id, barcode) => {
            let pickingOrder = state.pickingOrders[id];

            let products = Object.values(pickingOrder.products);

            for(const product of products) {

                if(product.barcode == barcode) return product

            }

            return null;
        }
    },
    mutations: {
        set(state, pickingOrder) {

            state.pickingOrders = pickingOrder;

        },
        update(state, {idx, pickingOrder}) {

            state.pickingOrders[idx] = pickingOrder;
            //state.pickingOrders = Object.assign({}, state.pickingOrders, pickingOrder);
            //Vue.set(state.pickingOrders, idx, pickingOrder);

        },
        updateProduct(state, {idx, productIdx, product}) {

            state.pickingOrders[idx].products[productIdx] = product;

        }
    },
    actions: {
        async load( {commit, state, getters}, {id}) {

            if(getters.stateLoaded) {

                return getters.get(id);

            }


            await pickingOrderAjaxRequest(id)
                .then(response => {

                    commit('update', { // load the picking order
                        idx: id,
                        pickingOrder: response
                    });


                    return response; // return the loaded picking order

            });

            //https://stackoverflow.com/questions/40165766/returning-promises-from-vuex-actions

            // axios call to get all picking orders

            /*return new Promise((resolve, reject) => {
                resolve(_products);
            });*/

        },
        scanProduct( {commit, state, getters}, {id, barcode, quantity} ) {


            return new Promise((resolve, reject) => {

                let product = getters.getProductByBarcode(id, barcode);

                Vue.set(product, 'quantity_scanned', quantity)



                commit('updateProduct', {
                    idx: id,
                    productIdx: product.id,
                    product
                })

                resolve(product);

            });


        }
    }

}