
const _products = {
    '234334': {"id": 234334, barcode: '7056324419747',  "name": "Cards Against Humanity", "location": "CC-01-12", "SOH": 74, "stock_required": 3},
    '466564': {"id": 466564, barcode: '9780123456786', "name": "F*ck This Game", "location": "CC-12-07", "SOH": 145, "stock_required": 7},
    '2356754': {"id": 2356754, barcode: '97712344567003', "name": "Whatcha Meme", "location": "BA-09-02", "SOH": 302, "stock_required": 19},
};
const _products2 = {
    '2345255': {"id": 2345255, barcode: '1012345647890119',  "name": "Taboo", "location": "FE-21-12", "SOH": 74, "stock_required": 3},
    '2352345': {"id": 2352345, barcode: '231234344322', "name": "Books", "location": "CA-32-07", "SOH": 145, "stock_required": 7},
    '6667896': {"id": 6667896, barcode: '3441234124343', "name": "TableTop Game", "location": "DC-09302", "SOH": 302, "stock_required": 19},
};
const _products3 = {
    '64564545': {"id": 64564545, barcode: '235423452',  "name": "Scrabble", "location": "CC-01-23", "SOH": 74, "stock_required": 3},
    '45676323': {"id": 45676323, barcode: '23567452322', "name": "Cards", "location": "AE-12-45", "SOH": 145, "stock_required": 7},
    '23554543': {"id": 23554543, barcode: '344574674343', "name": "Dice", "location": "AA-76-02", "SOH": 302, "stock_required": 19},
};

const _pickingOrders = {
    '244322': {id: 244322, store_id: 24422, products: _products},
    '345345': {id: 345345, store_id: 345345, products: _products2},
    '125345': {id: 125345, store_id: 23423, products: _products3}
}


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