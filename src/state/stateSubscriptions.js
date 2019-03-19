// called after every mutation.
// The mutation comes in the format of `{ type, payload }`.
// https://vuex.vuejs.org/guide/plugins.html
export const stateSubscriber = async(store) => { // async/await for axios request

    store.subscribe((mutation, state) => {

        switch(mutation.type) {

            case 'PickingOrders/updateProduct':
                console.log('Updating to backend', mutation.payload);
                break;


            /*default:
                (process.env.NODE_ENV === 'development') ?
                    console.log('Vuex subscriber alert: Mutation ['+mutation.type+'] is not subscribed to and data may not persist', mutation.payload)
                    : NULL;
                    */
        }

    })

}


// sets the options for persistentStateSubscriptions
export const persistentOptions = { // storage location defaults to localStorage
    key: 'vr',
    //paths: [] // Array of any paths to partially persist the state
}



