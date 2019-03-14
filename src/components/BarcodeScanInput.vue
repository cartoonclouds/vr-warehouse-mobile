<template>
    <div class="scan-input">
        <div class="barcode-input input-group">
            <input
                type="text"
                ref="barcodeInput"
                class="form-control"
                @keyup.enter="$emit('scanned', barcode)"
                v-bind="$attrs"
                :placeholder="placeholder"
            >
            <div class="input-group-prepend" @click="openNumpad">
                <div class="input-group-text"><i class="far fa-keyboard"></i></div>
            </div>
        </div>

        <div class="quantity-scanned">
            <div class="text-quantity">
                0
            </div>
            <div class="text-scanned">Last Scan</div>
        </div>

    </div>
</template>

<script>
    // pinpad https://codepen.io/totalnerd_es/pen/AwKLk
    // https://codepen.io/search/pens?q=keypad&page=1&order=popularity&depth=everything
    export default {
        name: "BarcodeScanInput",
        props: {
            placeholder: {
                type: String,
                default: 'Barcode...'
            },
        },
        data() {
            return {
                showModal: false,
                barcode: null
            }
        },
        methods: {
            openNumpad() {
                this.showModal = true;
            },
            attachScannerInputListener() {
                let vm = this;
                document.addEventListener("keypress", function (e) {
                    if (e.target.tagName !== "INPUT") {
                        var input = vm.$refs.barcodeInput;
                        //var input = document.getElementById('barcodeInput');
                        input.focus();
                        input.value = e.key;
                        e.preventDefault();
                    }
                });
            }
        },
        mounted() {
            this.attachScannerInputListener();
        }
    }
</script>

<style scoped>
    .scan-input {
        display: flex;
        box-sizing: border-box;
        padding: 12px 0;
    }

    input {
        width: 100%;
        padding: 0 30px;
        font-size: 30px;
        letter-spacing: 0.2em;
    }

    input::placeholder {
        color: #CCC;
    }


    .barcode-input {
        flex-basis: 90%;
    }

    .barcode-input .input-group-text {
        font-size: 2.5rem;
        cursor: pointer;
    }

    .quantity-scanned {
        flex-basis: 10%;
        padding: 20px 2px 2px 2px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .quantity-scanned .text-quantity {
        font-size: 50px;
        line-height: 0;
    }

    .quantity-scanned .text-scanned {
        font-size: 0.7em;
        letter-spacing: 2px;
        text-transform: uppercase;

    }
</style>