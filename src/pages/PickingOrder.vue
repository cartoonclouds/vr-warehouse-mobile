<template>
    <div class="page">
        <header-mobile>
            {{ store.store_name }} - {{ store.address.state }} - {{ store.address.postcode }}
            <div class="estTime">
                Estimated Picking Time: 30min 25sec
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
                            {{ scannedQuantity }}
                        </div>
                        <div class="text-scanned">Last Scan</div>
                    </div>
                </div>

                <div class="progress">
                    <div
                        aria-valuemax="100"
                        aria-valuemin="0"
                        aria-valuenow="0"
                        class="progress-bar progress-bar-striped"
                        role="progressbar"
                    >0%</div>
                </div>

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
                <div v-for="(product, idx) in products" :key="idx" class="card">
                    <div
                        :aria-controls="'collapse'+idx"
                        aria-expanded="false"
                        class="card-header row"
                        :class="'product-'+product.barcode"
                        :data-target="'#collapse'+idx"
                        :id="'heading'+idx"
                        role="button"
                        @dblclick="openProductDetail(idx)"
                    >
                        <div class="col-3">
                            <span @click="barcode = product.barcode" style="border-bottom: 1px dashed #000;">
                                {{ product.barcode }}
                            </span>
                        </div>
                        <div class="col-3"><small>{{ product.name }}</small></div>
                        <div class="col-3 text-center">{{ product.location}}</div>
                        <div class="col-3 text-right">
                            <span class="badge badge-pill" :class="'badge-'+ ((product.quantity_scanned||0) <= product.stock_required ? 'primary' : 'warning')">
                                {{ product.quantity_scanned || 0 }} / {{ product.stock_required }}
                            </span>
                            <div style="font-size:18px">({{ product.SOH }} SOH)</div>
                        </div>
                    </div>
                    <div
                        :aria-labelledby="'heading'+idx"
                        class="collapse product-detail"
                        data-parent="#picklist-products"
                        :id="'collapse'+idx"
                    >
                        <div class="card-body">

                            <div class="row">
                                <div class="col-3">
                                    <img src="https://cdn.vrdistribution.com.au/thumbs/200/a/r/arboretum-play-renegade-kit-cannot-be-sold-on-online-market-places--66960_f6975.jpg"
                                         class="img-responsive" width="200">
                                </div>

                                <div class="col-sm-9">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <label>Barcode</label>
                                            <p>810011720206</p>
                                        </div>
                                        <div class="col-sm-6">
                                            <label>Carton Barcode</label>
                                            <p>810011720206</p>
                                        </div>
                                    </div>
                                    <label>Picking Note</label>
                                    <p>-</p>

                                    <hr>

                                    <div>
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <label>Primary Location</label>
                                                <p>-</p>
                                            </div>
                                            <div class="col-sm-6">
                                                <label>Previous Primary Location</label>
                                                <p>-</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <label>Secondary Locations</label>
                                                <table class="table table-condensed">
                                                    <tbody></tbody>
                                                </table>
                                            </div>
                                            <div class="col-sm-6">
                                                <label>Temp. Location</label>
                                                <p>-</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

            </div>

        </main>
    </div>
</template>

<script>
    import BarcodeScanInput from '../components/BarcodeScanInput';
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: 'pick-order',
        props: ['id', 'store'],
        components: {
            BarcodeScanInput,
        },
        metaInfo() {
            return {
                title: 'Picking Order #' + this.id,
            };
        },
        computed: {
            /*store() {
                return this.$store.getters['Stores/get'](this.storeId);
            },*/
            products() {
                return this.$store.getters['PickingOrders/getProductsById'](this.id);
            }
            /*...mapGetters({
                products: 'PickingOrders/getProductsById',
            }),*/
        },
        data() {
            return {
                barcode: null,
                scannedQuantity: 0,
            };
        },
        methods: {
            ...mapGetters({
                get: 'PickingOrders/get',
            }),
            ...mapActions({
                load: 'PickingOrders/load',
                updateScanned: 'PickingOrders/updateQuantityScanned'
            }),
            ...mapActions({
                loadStore: 'Stores/load'
            }),
            submitScan(barcode) {

                this.scannedQuantity = 1;

                //let productHeader = document.getElementsByClassName('product-' + barcode)[0];

                //productHeader.classList.add('scanned');

                this.updateScanned({
                    id: this.id,
                    barcode,
                    quantity: this.scannedQuantity
                }).then(() => {

                    this.barcode = null;

                });

            },
            openProductDetail(accordianIdx) {

                let productDetailList = document.getElementsByClassName('product-detail');

                for(let productDetail of productDetailList) {

                    if(productDetail.id === ('collapse'+accordianIdx)) {
                        productDetail.classList.toggle('show');
                        continue;
                    }

                    productDetail.classList.remove('show');

                }

            }
        },

        mounted() {

            this.load(this.id);

        },
        // global hooks http://patrickwho.me/learn-vue-router-navigation-guards-quickly/
        // https://stackoverflow.com/questions/50506470/vue-router-pass-object-as-props
        beforeRouteEnter (to, from, next) {

            if(!to.params.store) { // load the store if not coming into picking order via link

                $store.dispatch('Stores/load', (to.params.id)).then((store) => {

                    to.params.store = store;

                    next({
                        name: to.name,
                        params: to.params
                    });

                });


            } else {
                next();
            }

        }

    };
</script>

<style scoped>
    main {
        padding: 0 60px;
    }

    header {
        color: #fff;
        font-size: 32px;
    }

    header .estTime {
        font-size: 20px;
        font-weight: initial;
        margin-left: auto;
    }

    h2 {
        margin: 0.5em 0 0.5em;
    }

    .pickorder-header {
        position: sticky;
        top: 64px;
        z-index: 888;
        background-color: #FFF;
        padding-bottom: 8px;
    }

    .card-header {
        cursor: pointer;
        padding: 18px;
        padding-right: 26px;
        font-size: 26px;
        -webkit-user-select: none;
        user-select: none;
        background-color: #FFF;
    }

    .card:nth-child(odd) .card-header {
        background-color: #f2f2f2;
    }

    .card-header.scanned {
        opacity: 0.4;
    }


    .picklist-header {
        font-weight: bold;
        padding: 0 15px;
    }

    .progress {
        height: 1.75rem;
        font-size: 1.2rem;
        border: 1px solid #ced4da;
    }

    .progress-bar {
        min-width: 2%;
        width: 2%;
    }

    main h2 {
        font-size: 32px;
    }


    hr {
        height: 2px;
        background-color: #eee;
        border-radius: 0.25rem;
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
        font-size: 50px;
        line-height: 0.8em;
    }

    .quantity-scanned .text-scanned {
        font-size: 0.7em;
        letter-spacing: 2px;
        text-transform: uppercase;

    }
</style>
