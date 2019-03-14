
@section('keyboardHTML')
    <div class="modal fade" id="keyboardModal" tabindex="-1" role="dialog" aria-hidden="true">

        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body" style="text-align: center;">

                    <div class="numpad">
                        <div class="row">
                            <div class="col-sm-4">
                                <input type="text"  maxlength="4" :name="type" :value="value" placeholder="Qty" class="numpadField" style="width: 150px;font-size: 36px;height: 100px;text-align: center; margin:80px auto 0;  display: block; padding-left: 5px; padding-right: 5px; border: 1px solid grey;"/>
                            </div>
                            <div class="col-sm-8">
                                <section class="numpad">
                                    <ul id="keyboard">
                                        <li><button class="symbol" v-on:click="keypadButtonClicked('1', type)">1</button></li>
                                        <li><button class="symbol" v-on:click="keypadButtonClicked('2', type)">2</button></li>
                                        <li><button class="symbol" v-on:click="keypadButtonClicked('3', type)">3</button></li>
                                        <li><button class="symbol" v-on:click="keypadButtonClicked('4', type)">4</button></li>
                                        <li><button class="symbol" v-on:click="keypadButtonClicked('5', type)">5</button></li>
                                        <li><button class="symbol" v-on:click="keypadButtonClicked('6', type)">6</button></li>
                                        <li><button class="symbol" v-on:click="keypadButtonClicked('7', type)">7</button></li>
                                        <li><button class="symbol" v-on:click="keypadButtonClicked('8', type)">8</button></li>
                                        <li><button class="symbol" v-on:click="keypadButtonClicked('9', type)">9</button></li>
                                        <li><button class="symbol" v-on:click="keypadButtonClicked('0', type)">0</button></li>
                                        <li><button class="delete" v-on:click="deleteChar(type)">Del</button></li>
                                        <li><button class="symbol" v-on:click="keypadButtonClicked('.', type)">.</button></li>
                                    </ul>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop

@section('keyboardStyle')
    <style>
        #keyboardModal {

        }
        .numpadField {
            margin: 20px 20px !important;
        }
        #keyboard {
            width: 250px;
            margin-left: 10px;
        }
        #keyboard li {
            width: 60px;
            height: 35px;
            display: inline-block;
            list-style: none;
            margin: 7px 3px;
        }
        #keyboard button {
            width: 60px;
            height: 40px;
            text-align: center;
            font-size: 24px;
            overflow: hidden;
            padding: 6px 8px 7px;
            margin-bottom: 0;
            font-size: 12px;
            font-weight: 400;
            line-height: 1;
            color: #333;
            text-align: center;
            white-space: nowrap;
            vertical-align: top;
            cursor: pointer;
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 3px;
        }
        #keyboard button small {
          font-size: 8px;
        }
    </style>
@stop


@section('keyboardScript')

    <script type="text/javascript">

        var keyboardModal = new Vue({
            el: '#keyboardModal',
            data: {
                type: 'qtyKeyboard',
                value: '0'
            },
            methods: {
                show: function () {
                    this.value = ctrl.qty;
                    $('#keyboardModal').modal();
                },
                keypadButtonClicked: function(key, type){
                    if (this.value == '0'){
                        this.value = '';
                    }
                    this.value = this.value + key;
                    event.preventDefault();
                    this.updated();
                },
                deleteChar: function(type){
                    this.value =  this.value.substr(0, this.value.length - 1);
                    this.updated();
                },
                updated: function(){
                    ctrl.qty = this.value;
                }
            }
        });

    </script>
@stop