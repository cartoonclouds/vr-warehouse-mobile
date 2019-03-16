<template>
    <div class="scan-input">
        <div class="barcode-input input-group">
            <input
                v-bind="$attrs"
                @input="$emit('input', $event.target.value)"
                @keyup.enter="$emit('scanned', $event.target.value)"
                :placeholder="placeholder"
                type="text"
                ref="barcode"
                class="form-control"
            >
            <div class="input-group-prepend" @click="openNumpad">
                <div class="input-group-text"><i class="far fa-keyboard"></i></div>
            </div>
        </div>


        <portal to="modals" v-if="showModal">
            <modal @close="showModal = false">Modal body here</modal>
        </portal>
    </div>
</template>

<script>
    // pinpad https://codepen.io/totalnerd_es/pen/AwKLk
    // https://codepen.io/search/pens?q=keypad&page=1&order=popularity&depth=everything
    export default {
        name: "BarcodeScanInput",
        inheritAttrs: false,
        props: {
            placeholder: {
                type: String,
                default: 'Barcode...'
            },
        },
        data() {
            return {
                showModal: false,
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
                        var input = vm.$refs.barcode;
                        //var input = document.getElementById('barcode');
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


    .barcode-input .input-group-text {
        font-size: 2.5rem;
        cursor: pointer;
    }
</style>