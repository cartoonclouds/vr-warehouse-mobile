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

                <barcode-scan-input
                        v-model="barcode"
                        @scanned="submitScan"
                ></barcode-scan-input>

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
                        <div class="col-3">{{ product.barcode }}</div>
                        <div class="col-3"><small>{{ product.name }}</small></div>
                        <div class="col-3 text-center">{{ product.location}}</div>
                        <div class="col-3 text-right">
                            <span class="badge badge-pill badge-primary">
                                0 / {{ product.stock_required }}
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

        },
        data() {
            return {
                products: [],
                barcode: null,
            };
        },
        methods: {
            ...mapGetters({
                get: 'PickingOrders/get'
            }),
            ...mapActions({
                load: 'PickingOrders/load'
            }),
            ...mapActions({
                loadStore: 'Stores/load'
            }),
            submitScan(barcode) {

                let productHeader = document.getElementsByClassName('product-' + barcode)[0];

                productHeader.classList.add('scanned');

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

            this.load(this.id).then((pickingOrder) => {

                this.products = pickingOrder.products;

            });


        },
        // global hooks http://patrickwho.me/learn-vue-router-navigation-guards-quickly/
        // https://stackoverflow.com/questions/50506470/vue-router-pass-object-as-props
        beforeRouteEnter (to, from, next) {

            next(vm => {

                if(!vm.store) { // load the store if not coming into picking order via link

                    vm.loadStore(to.params.id).then((store) => {
                        console.log(store)

                        to.params.store = store;

                    });
                }

            })
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
        z-index: 999;
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
</style>
