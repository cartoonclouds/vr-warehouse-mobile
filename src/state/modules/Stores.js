
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