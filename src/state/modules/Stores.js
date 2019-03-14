

const _stores = [
    {id: 24422, store_name: 'Chris Tudhope\'s Store', address: { state: 'SA', postcode: 5000 }, order_count: 2},
    {id: 345345, store_name: 'John\'s Store', address: { state: 'SA', postcode: 5000 }, order_count: 1},
    {id: 23423, store_name: 'Joe\'s Store', address: { state: 'SA', postcode: 5000 }, order_count: 5},
];

export default {

    namespaced: true,

    state: {
        stores: [],
    },
    getters: {
        get: (state) => (id) => {
            return !id ? state.stores : state.stores.find(store => store.id == id);
        },
        getAll: (state) => {
            return state.stores;
        },
    },
    mutations: {
        set(state, stores) {

            state.stores = stores;

        }
    },
    actions: {
        load( {commit, state, getters}, id ) {

            // Axios call to getStorePicks/{storeId}
            /* return Axios?
            Vue.axios.get(api).then((response) => {
              console.log(response.data)
            })
             */
            if(id) {

                commit('set', _stores);

                return getters.get(id);

            } else {

                setTimeout(() => {

                    commit('set', _stores);

                }, 2000);

            }
        }
    },


}