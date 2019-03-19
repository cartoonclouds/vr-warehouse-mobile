<template>
    <div class="page">
        <header-mobile>
            <span v-if="store">{{ store.store_name }} - {{ store.address.state }} - {{ store.address.postcode }}</span>
            <div class="estTime">
                <!--Estimated Picking Time:-->
                <span v-if="pickingOrder" style="margin-left:8px;">
                    {{ pickingOrder.estimated_time | formatDuration }}
                    <div pickingOrderstyle="font-size:0.75em;line-height:0.8em;">Estimated completion: {{ pickingOrder.estimated_time | addMilliseconds | formatDateTime }}</div>
                </span>
            </div>
        </header-mobile>


        <!-- https://www.smashingmagazine.com/2017/06/designing-perfect-accordion-checklist/ -->
        <main>
            <div class="pickorder-header">

                <div class="barcode-input-header">
                    <barcode-scan-input
                            v-model="barcode"
                            @scanned="submitScan"
                            class="barcode-input"
                    ></barcode-scan-input>


                    <div class="quantity-scanned">
                        <div class="text-quantity">
                            {{ lastScanned && lastScanned.quantity_scanned || 0 }}
                        </div>
                        <div class="text-scanned">Last Scan</div>
                    </div>
                </div>

                <progress-bar :progression="progressed"></progress-bar>

            </div>

            <hr>

            <h2>Pick Order # {{ id }}</h2>

            <div class="row picklist-header">
                <div class="col-3">Barcode</div>
                <div class="col-3">Product Name</div>
                <div class="col-3 text-center">Location</div>
                <div class="col-3 text-right">Quantity Scanned/Required</div>
            </div>

            <div class="accordion" id="picklist-products">
                <product-row
                        v-for="(product, idx) in products"
                        :key="product.id"
                        :product="product"
                        @click-barcode="setBarcode"
                ></product-row>
            </div>

        </main>
    </div>
</template>

<script>
    import BarcodeScanInput from '../components/BarcodeScanInput';
    import ProductRow from '../components/picking-orders/ProductRow';
    import ProgressBar from '../components/ProgressBar';
    import {mapGetters, mapActions, mapMutations, mapState} from 'vuex';

    export default {
        name: 'pick-order',
        props: ['id'],
        components: {
            BarcodeScanInput,
            ProductRow,
            ProgressBar
        },
        metaInfo() {
            return {
                title: 'Picking Order #' + this.id,
            };
        },
        watch: {
        },
        computed: {
            pickingOrder() {
                return this.$store.getters['PickingOrders/get'](this.id);
            },
            store() {
                return this.$store.getters['Stores/get'](this.pickingOrder.store_id);
            },
            products() {
                //return this.$store.getters['PickingOrders/getProducts'](this.id);
                return Object.values(this.pickingOrder.products);
            },
            progressed() {
                let productsCount = this.products.reduce(function(total, product) {
                    return total + (product.stock_required || 0);
                }, 0);

                let productsScanCount = this.products.reduce(function(total, product) {
                    return total + (product.quantity_scanned || 0);
                }, 0);


                return productsScanCount === 0 ? 0 : Math.round((productsScanCount / productsCount) * 100);
            }
        },
        data() {
            return {
                barcode: null,
                lastScanned: null,
            };
        },
        methods: {
            ...mapActions({
                scanProduct: 'PickingOrders/scanProduct'
            }),

            setBarcode(barcode) {
                this.barcode = barcode;
            },
            submitScan(barcode) {

                this.scannedQuantity = 1;

                //let productHeader = document.getElementsByClassName('product-' + barcode)[0];

                //productHeader.classList.add('scanned');


                this.scanProduct({
                    id: this.id,
                    barcode,
                    quantity: this.scannedQuantity
                }).then((scannedProduct) => {

                    console.log(scannedProduct);

                    this.lastScanned = scannedProduct;

                    this.barcode = null;


                });

            },

        },
        mounted() {

        },
        /*beforeRouteEnter(to, from, next) {


            $store.dispatch('PickingOrders/load', {id: to.params.id})
                .then(pickingOrder => {

                    $store.dispatch('Stores/load', {id: pickingOrder.store_id});

                    next((vm) => {
                        vm.storeId = pickingOrder.store_id
                    });
                    // check if order exists redirect
                    // check if picked redirect to picked status page

                });


        },*/
        filters: {
            formatDuration(ms) { return moment.utc(ms).format('h [hours] mm [minutes] ss [seconds]'); },
            addMilliseconds(ms) { return moment().add(ms, 'ms'); }, // returns unix datetime
            formatDateTime(datetime) { return moment(datetime).format('HH:mm:ss, Do MMM'); }
        }
    };
</script>

<style scoped>
    header {
        color: #fff;
        font-size: 26px;
    }

    header .estTime {
        font-size: 16px;
        font-weight: initial;
        margin-left: auto;
        display: flex;
        position: relative;
        top: -.15em;
    }

    h2 {
        margin: 0.5em 0 0.5em;
    }

    main h2 {
        font-size: 28px;
    }


    hr {
        height: 2px;
        background-color: #eee;
        border-radius: 0.25rem;
    }


    .picklist-header {
        font-weight: bold;
        padding: 0 15px;
    }

    .barcode-input-header {
        display: flex;
    }

    .barcode-input {
        flex-basis: 90%;
    }

    .quantity-scanned {
        flex-basis: 10%;
        padding: 12px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .quantity-scanned .text-quantity {
        font-size: 2.7em;
        line-height: 0.9em;
    }

    .quantity-scanned .text-scanned {
        font-size: 0.7em;
        letter-spacing: 2px;
        text-transform: uppercase;

    }
</style>
