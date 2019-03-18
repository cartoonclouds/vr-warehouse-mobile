

import {_pickingOrders} from '../../api/api'


export default {

    namespaced: true,
    state: {
        pickingOrders: {}
    },
    getters: {
        get: (state) => (id) => {
            return state.pickingOrders[id]
        },
        getByStore: (state) => (id) => {
            return state.pickingOrders.find(pickingOrder => pickingOrder.store_id == id)
        },
        getProductsById: (state) => (id) => {
            let products = state.pickingOrders[id] || {products:{}}; // this is required due to race condition
            return Object.values(products.products)
        },
        getProductById: (state) => (id, productId) => {
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
        update(state, payload) {

            state.pickingOrders[payload.idx] = payload.pickingOrder;

        },
        updateProduct(state, payload) {

            state.pickingOrders[payload.idx] = payload.pickingOrder;

        }
    },
    actions: {
        load( {commit, state, getters}, id) {

            if(id) {

                commit('set', _pickingOrders);

                return getters.get(id);

            } else {

                setTimeout(() => {

                    commit('set', _pickingOrders);

                }, 2000);

            }
            //https://stackoverflow.com/questions/40165766/returning-promises-from-vuex-actions

            // axios call to get all picking orders

            /*return new Promise((resolve, reject) => {



                resolve(_products);

            });*/

        },
        async updateQuantityScanned( {commit, state, getters}, {id, barcode, quantity} ) {


            let product = getters.getProductByBarcode(id, barcode);

            if(!product) return await true;


            if(!product.quantity_scanned) {
                product = { ...product, quantity_scanned: quantity }
            } else {
                product.quantity_scanned += quantity;
            }


            return await Vue.$set(state.pickingOrders[id].products, product.id, product);



        }
    }

}