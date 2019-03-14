
const _products = [
    {"id": 7056324419747, barcode: '7056324419747',  "name": "Cards Against Humanity", "location": "CC-01-12", "SOH": 74, "stock_required": 3},
    {"id": 9780123456786, barcode: '9780123456786', "name": "F*ck This Game", "location": "CC-12-07", "SOH": 145, "stock_required": 7},
    {"id": 97712344567003, barcode: '97712344567003', "name": "Whatcha Meme", "location": "BA-09-02", "SOH": 302, "stock_required": 19},
];
const _products2 = [
    {"id": 1012345647890119, barcode: '1012345647890119',  "name": "Taboo", "location": "FE-21-12", "SOH": 74, "stock_required": 3},
    {"id": 231234344322, barcode: '231234344322', "name": "Books", "location": "CA-32-07", "SOH": 145, "stock_required": 7},
    {"id": 3441234124343, barcode: '3441234124343', "name": "TableTop Game", "location": "DC-09302", "SOH": 302, "stock_required": 19},
];
const _products3 = [
    {"id": 235423452, barcode: '235423452',  "name": "Scrabble", "location": "CC-01-23", "SOH": 74, "stock_required": 3},
    {"id": 23567452322, barcode: '23567452322', "name": "Cards", "location": "AE-12-45", "SOH": 145, "stock_required": 7},
    {"id": 344574674343, barcode: '344574674343', "name": "Dice", "location": "AA-76-02", "SOH": 302, "stock_required": 19},
];

const _pickingOrders = [
    {id: 24422, store_id: 24422, products: _products},
    {id: 345345, store_id: 345345, products: _products2},
    {id: 125345, store_id: 23423, products: _products3}
]


export default {

    namespaced: true,
    state: {
        pickingOrders: []
    },
    getters: {
        get: (state) => (id) => {
            return state.pickingOrders.find(pickingOrder => pickingOrder.id == id)
        },
        getByStore: (state) => (id) => {
            return state.pickingOrders.find(pickingOrder => pickingOrder.store_id == id)
        }
    },
    mutations: {
        set(state, pickingOrder) {

            state.pickingOrders = pickingOrder;

        }
    },
    actions: {
        load( {commit, state, getters}, id ) {

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
    }

}