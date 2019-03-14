
/*
Vue
    this.$data
    this.$props
    this.$el
    this.$options
    this.$parent
    this.$root
    this.$children
    this.$slots
    this.$scopedSlots
    this.$refs
    this.$isServer
    this.$attrs
    this.$listeners

Vuex
    this.$store.state
    this.$store.getters
    this.$store.actions
    this.$store.mutations
    import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

VueRouter
    this.$router
*/

/*
TODO:
    * Loop over (probably all) to get all children
 */

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {

    //getters: [...mapGetters],


    mounted() {


        //console.log('mutations', this.$actions);
        // Reflect.ownKeys(this.$store.mutations)
        /*
        const debug = process.env.NODE_ENV !== 'production'
        strict: debug, in vuex
         */


        console.log('data', this.$data);
        console.log('props', this.$props);
        console.log('el', this.$el);
        console.log('options', this.$options);
        console.log('parent', this.$parent);
        console.log('root', this.$root);
        console.log('children', this.$children);
        console.log('slots', this.$slots);
        console.log('scopedSlots', this.$scopedSlots);
        console.log('refs', this.$refs);
        console.log('isServer', this.$isServer);
        console.log('attrs', this.$attrs);
        console.log('listeners', this.$listeners);


        console.log('state', this.$store.state);
        console.log('getters', this.$store.getters);
        //console.log('actions', this.$store.actions);
        //console.log('mutations', this.$store.mutations);


        console.log('router', this.$router);

    },


}
