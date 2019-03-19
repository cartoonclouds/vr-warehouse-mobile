<template>
    <section class="card">
        <div
            :aria-controls="'collapse'+productData.id"
            aria-expanded="false"
            class="card-header row"
            :class="'product-'+productData.barcode"
            :data-target="'#collapse'+productData.id"
            :id="'heading'+productData.id"
            role="button"
            @dblclick="openProductDetail(productData.id)"
        >
            <div class="col-3">
                            <span @click="$emit('click-barcode', productData.barcode)" style="border-bottom: 1px dashed #000;">
                                {{ productData.barcode }}
                            </span>
            </div>
            <div class="col-3"><small>{{ productData.name }}</small></div>
            <div class="col-3 text-center">{{ productData.location }}</div>
            <div class="col-3 text-right">
                            <span class="badge badge-pill" :class="'badge-'+ ((productData.quantity_scanned || 0) <= productData.stock_required ? 'primary' : 'warning')">
                                {{ productData.quantity_scanned || 0 }} / {{ productData.stock_required }}
                            </span>
                <div style="font-size:0.7em">({{ productData.SOH }} SOH)</div>
            </div>
        </div>
        <div
                :aria-labelledby="'heading'+productData.id"
                class="collapse product-detail"
                data-parent="#picklist-products"
                :id="'collapse'+productData.id"
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
                                <p>{{ productData.barcode }}</p>
                            </div>
                            <div class="col-sm-6">
                                <label>Carton Barcode</label>
                                <p>{{ productData.barcode }}</p>
                            </div>
                        </div>
                        <label>Picking Note</label>
                        <p>-</p>

                        <hr>

                        <div>
                            <div class="row">
                                <div class="col-sm-6">
                                    <label>Primary Location</label>
                                    <p>{{ productData.location }}</p>
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
    </section>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: 'product-row',
        props: {
            product: Object
        },
        data() {
            return {
                productData: this.product
            }
        },
        methods: {
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
        }
    };
</script>

<style scoped>

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
        font-size: 18px;
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


</style>