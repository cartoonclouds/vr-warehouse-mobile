<template>
    <div class="page">
        <header-mobile>
            Picking Orders
        </header-mobile>

        <main>
            <div id="pickingSummary" class="row">
                <div class="col-md-6 text-center">
                    <p style="margin-bottom: 10px; font-weight: bold">There are currently...</p>

                    <p>
                        <strong>5</strong> × White Orders Pending

                        <small style="color: red">▲ 4</small>
                    </p>
                    <p>
                        <strong>0</strong> × Red Orders Pending
                        <small style="color: #23bb57">▼ 7</small>
                    </p>
                    <p>
                        <strong>5</strong> × Total Orders Pending
                        <small style="color: #23bb57">▼ 3</small>
                    </p>
                </div>

                <div class="col-md-6 text-center">

                    <p>
                        The current estimated picking time<br>
                        <strong>FOR ALL ORDERS SCHEDULED TO SHIP TODAY</strong> is<br>
                        2 hours,
                        20 minutes.
                    </p>

                    <p><span class="text-danger">undefined pickers required</span></p>

                    <a href="#details-modal" class="btn btn-outline-secondary">View Details</a>

                </div>
            </div>

            <div id="pickingOrderList">
                <router-link v-for="store in stores" :key="store.id" class="pickingOrder"
                             :to="{ name: 'pick-order', params: { id: '244322' } }">
                    <h5>{{ store.store_name }} - {{ store.address.state }} - {{ store.address.postcode }}</h5>
                    {{ store.order_count}} Order
                </router-link>

            </div>
        </main>
    </div>
</template>

<script>

    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: 'picking-orders-page',
        methods: {
            ...mapActions({
                load: 'Stores/load'
            }),
        },
        computed: {
            ...mapGetters({
                stores: 'Stores/getAll'
            })
        },
        mounted() {

            this.load();

        }
    };
</script>

<style scoped>
    #pickingSummary {
        font-size: 14px;
        color: #777;
        padding: 8px;
    }

    #pickingSummary a {
        font-size: 14px;
    }

    #pickingOrderList {
        font-size: 14px;
    }

    .pickingOrder {
        cursor: pointer;
        display: block;
        overflow: hidden;
        border: 1px solid #ddd;
        padding: 1em;
        text-decoration: none;
        color: black;
    }

    .pickingOrder h5 {
        font-weight: bold;
    }
</style>
