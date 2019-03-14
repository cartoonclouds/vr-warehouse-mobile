@extends('warehouse.mobile.templates.simplePageBootstrapFullPage')
@include('warehouse.mobile.invoices.modals.menuPopover')
@include('warehouse.mobile.invoices.modals.keyboard')

@section('head')
	@parent

	<link href="{{mix('/assets/mobile/css/invoices.css')}}" rel="stylesheet">

	<style>
		.paddedNo {
			padding: 5px;
			border: 1px solid white;
			border-radius: 5px;
			margin-right: 10px;
		}
	data_med {
		font-size: 16px;
	}
	.data_large {
		font-size: 22px;
	}
	.group {
		padding: 10px;
	}
	.group:nth-child(odd) {
		background: #f3f3f3;
	}
	.faded {
		color: #ababab;
	}

	</style>

	@yield('popoverStyle')
	@yield('keyboardStyle')
@stop


@section('content')

	<div class="content">

        <?php $message = Session::get('message')?>
		@if(!empty($message))
			<div class="notification success">
				{{$message}}
			</div>
		@endif

		<div v-cloak id='control' class="card" style="padding-bottom: 20px" >
			<div class="card-header bg-primary">

				<a href="{{ url("m/invoices_new/")}}">
					<h1 style="display: inline-block; margin-top: 2px;"><i class="fa fa-chevron-left" aria-hidden="true"></i> Verifying</h1>
				</a>

				<strong>Invoice/s </strong><span v-for="(idNo, id) in idNoLst" class="paddedNo" v-html='idNo'></span>

				<div class="pull-right" style="margin-top: 10px;">
					<a href="#" data-target='#remaining' class="scrollTo btn btn-primary"><i class="fa fa-chevron-down" aria-hidden="true"></i>Remaining</a>
					<a href="#" data-target='#verified' class="scrollTo btn btn-primary"><i class="fa fa-chevron-down" aria-hidden="true"></i>Verified</a>
					@yield('popoverHTML')
				</div>

			</div>
			<div class="card-block">
				<div class="row">

					<div class='col-sm-10 bdr inputs'>

						<div class="alert alert-danger" v-if="error">@{{ error }}</div>

						<div class="row">

						<div class='col-xs-8 col-sm-10 col-md-8 bdr'>
							<input id="barcode" class='barcode form-control input-lg' type="text" placeholder="Barcode..." v-on:keyup.enter="checkBarcode()"  v-model="barcode">
							<span id="showQty" style="position: absolute; margin-top: 10px; font-size: 16px;"><strong>Qty Invoiced:<span style="font-size: 22px;"> @{{ currentItem.qty }}</span></strong></span>
						</div>

						<div class='col-xs-2 nopadding bdr' v-on:click="openKeyboard">
							<input class='qty text-center form-control input-lg'  type="text" placeholder="Qty..." v-model="qty"  />
							<small style="position: absolute; white-space: nowrap; right: 0; margin-top: 10px;">If Blank/0, Invoiced Quantity Will Be Scanned</small>
						</div>

						<div class="col-xs-2 text-center">
							<a href="#" class="btn btn-primary btn-lg btn-block" v-on:click="manualProcess()" v-html="processBtnText" v-bind:disabled="processBtnDisabled"></a>
						</div>
						</div>
					</div>

					<div class='col-sm-2 bdr nopadding last' style='padding-left: 10px; padding-right: 10px;'>
						<span>Last scan</span>
						{{--<a href='#' v-on:click="clrLast()">
							<i class="fa fa-times-circle" aria-hidden="true" style="float: right;"></i>
						</a>--}}
						<div class="row bdr" >
							<div class='col-sm-4 bdr qty'>
								@{{ lastItem.qty_scanned }}
							</div>
							<div class='text-center col-sm-8 col-md-8 bdr name'>
								@{{ lastItem.name }}
								<small>@{{ lastItem.barcode }}</small>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class='col-sm-8'>
					<div class="progress">
						<div class="progress-bar progress-bar-info progress-bar-striped" :style="{ width: progress + '%' }" >@{{ progress }}%</div>
					</div>
				</div>
				<div class='col-sm-2'>
					<button type="button" v-on:click="completeScanning" class="btn btn-sm btn-info btn-block">Complete Scanning</button>
				</div>
				<div class='col-sm-2'>
					<button type="button" class="btn btn-sm btn-block btn-outline-primary" v-on:click="autoPrintBarcodes = !autoPrintBarcodes">Barcode Printing: @{{ autoPrintBarcodes ? 'On' : 'Off' }}</button>
				</div>
			</div>
		</div>

		<div v-cloak class='container-fluid pt-2' id="main">

			<div class='row'>
				<div class='col-lg-12'>

						<h2 id="remaining">Items Remaining: @{{ itemsNotDoneTotal }}</h2>

						<div class='row'>
							<div class='col-sm-3'><strong>Barcode</strong></div>
							<div class='col-sm-4'><strong>Name</strong></div>
							<div class='col-sm-1'><strong>Qty Invoiced</strong></div>
							<div class='col-sm-1'><strong>Qty Scanned</strong></div>
							<div class='col-sm-2'><strong>Invoice No</strong></div>
							<div class='col-sm-1'></div>
						</div>


						<div v-for="(items, barcode) in itemsNotDone" class='group multi'>

							<div v-if="items.length > 1">

								<!-- multiple item, per bc -->
								<div class='row' v-for='summaryItem in getSummary(items)'>
									<div v-on:click="updateControl(summaryItem.barcode, 'barcode')" class='digit data_large col-sm-2'>@{{summaryItem.barcode}}</div>
									<div class='data_med col-sm-4'>@{{summaryItem.name}}</div>
									<div v-on:click="updateControl(summaryItem.qty, 'qty')" class='data_large col-sm-2'>@{{summaryItem.qty}}</div>
									<div class='data_large col-sm-2'>@{{summaryItem.qty_scanned}}</div>
									<div class='data col-sm-2'>
										@{{summaryItem.invoice_number}} <span data-toggle="collapse" v-bind:data-target="'#' + items[0].barcode" class="badge" v-html="items.length"></span>
									</div>

								</div>

								<div class='collapse faded' v-bind:id="items[0].barcode">
									<div v-for="item in items" class="row">

										<div v-on:click="updateControl(item.barcode, 'barcode')" class='digit data_large col-sm-3'>@{{item.barcode}}</div>
										<div class='data_med col-sm-4'>@{{item.name}}</div>
										<div v-on:click="updateControl(item.qty, 'qty')" class='data_large col-sm-1'>@{{item.qty}}</div>
										<div class='data_large col-sm-1'>@{{item.qty_scanned}}</div>
										<div class='data col-sm-2'>@{{item.invoice_number}}</div>
										<div class='col-sm-1'>
											<a :href="item.editUrl" target="_blank" class="btn btn-outline-primary"><i class=" fa fa-pencil-square-o"></i></a>
										</div>

									</div>
								</div>
							</div>

							<!-- one item, per bc -->
							<div v-if="items.length == 1">

								<div v-for="item in items">
									<div class='row'>
										<div v-on:click="updateControl(item.barcode, 'barcode')" class='digit data_large col-sm-3'>@{{item.barcode}}</div>
										<div class='data_med col-sm-4'>@{{item.name}}</div>
										<div v-on:click="updateControl(item.qty, 'qty')" class='data_large col-sm-1'>@{{item.qty}}</div>
										<div class='data_large col-sm-1'>@{{item.qty_scanned}}</div>
										<div class='data col-sm-2'>@{{item.invoice_number}}</div>
										<div class='col-sm-1'>
											<a :href="item.editUrl" target="_blank" class="btn btn-outline-primary"><i class=" fa fa-pencil-square-o"></i></a>
										</div>

									</div>
								</div>
							</div>
						</div>

						<h2 id="verified">Items Verified: @{{ itemsDoneTotal }}</h2>

						<div v-for="(items, barcode) in itemsDone" class='group multi'>

							<div v-if="items.length > 1">

								<!-- multiple item, per bc -->
								<div class='row' v-for='summaryItem in getSummary(items)'>
									<div v-on:click="updateControl(summaryItem.barcode, 'barcode')" class='digit data_large col-sm-2'>@{{summaryItem.barcode}}</div>
									<div class='data_med col-sm-4'>@{{summaryItem.name}}</div>
									<div v-on:click="updateControl(summaryItem.qty, 'qty')" class='data_large col-sm-2'>@{{summaryItem.qty}}</div>
									<div class='data_large col-sm-2'>@{{summaryItem.qty_scanned}}</div>
									<div class='data col-sm-1'>@{{summaryItem.invoice_number}} <span data-toggle="collapse" v-bind:data-target="'#' + items[0].barcode" class="badge" v-html="items.length"></span></div>
									<div class='data col-sm-1'>
										<button type="button" class="btn btn-sm btn-outline-primary" v-on:click="manualReprint(summaryItem)"><span class="fa fa-barcode"></span></button>

									</div>
								</div>

								<div class='collapse faded' v-bind:id="items[0].barcode">
									<div v-for="item in items" class="row">

										<div v-on:click="updateControl(item.barcode, 'barcode')" class='digit data_large col-sm-2'>@{{item.barcode}}</div>
										<div class='data_med col-sm-4'>@{{item.name}}</div>
										<div v-on:click="updateControl(item.qty, 'qty')" class='data_large col-sm-2'>@{{item.qty}}</div>
										<div class='data_large col-sm-2'>@{{item.qty_scanned}}</div>
										<div class='data col-sm-2'>@{{item.invoice_number}}</div>

									</div>
								</div>
							</div>

							<!-- one item, per bc -->
							<div v-if="items.length == 1">

								<div v-for="item in items">
									<div class='row'>
										<div v-on:click="updateControl(item.barcode, 'barcode')" class='digit data_large col-sm-2'>@{{item.barcode}}</div>
										<div class='data_med col-sm-4'>@{{item.name}}</div>
										<div v-on:click="updateControl(item.qty, 'qty')" class='data_large col-sm-2'>@{{item.qty}}</div>
										<div class='data_large col-sm-2'>@{{item.qty_scanned}}</div>
										<div class='data col-sm-1'>@{{item.invoice_number}}</div>
										<div class='data col-sm-1'>
											<button type="button" class="btn btn-sm btn-outline-primary" v-on:click="manualReprint(item)"><span class="fa fa-barcode"></span></button>
										</div>
									</div>
								</div>
							</div>
						</div>

						{{--<div class='row'>
							<div class='col-sm-2'><strong>Barcode</strong></div>
							<div class='col-sm-4'><strong>Name</strong></div>
							<div class='col-sm-2'><strong>Qty Invoiced</strong></div>
							<div class='col-sm-2'><strong>Qty Scanned</strong></div>
							<div class='col-sm-2'><strong>Invoice No</strong></div>
						</div>

						<div v-for="(items, barcode) in itemsDone" class='group'>
							<div v-for="item in items">
								<div class='row'>
									<div class='digit data_large col-sm-2'>@{{item.barcode}}</div>
									<div class='data_med col-sm-4'>@{{item.name}}</div>
									<div class='data_large col-sm-2'>@{{item.qty}}</div>
									<div class='data_large col-sm-2'>@{{item.qty_scanned}}</div>
									<div class='data col-sm-2'>@{{item.invoice_number}}</div>
								</div>
							</div>
						</div>--}}

					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="modal fade" id="confirmModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Confirmation</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<p>Modal body text goes here.</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary modal-confirm">Ok</button>
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
				</div>
			</div>
		</div>
	</div>

	@include('warehouse.mobile.invoices.modals.confirm')
	@include('warehouse.mobile.invoices.modals.completeScanning')
	@yield('keyboardHTML')

@stop

@section('scripts')
	@parent

	@yield('confirmScript')
	@yield('keyboardScript')
	@yield('completeScanningScript')

	<script type="text/javascript">

        let ctrl = new Vue({
			el: '#control',
            data: {
                barcode: '',
                qty: 0,
                progress: 0,
                lastItem: {
                    qty_scanned: '0', name: '', barcode: ''
                },
                idNoLst: {!! $idNoLst !!},
				currentItems: [],
				processBtnText: "Process",
				processBtnDisabled: false,
				autoPrintBarcodes: false,
				error: '',
				currentItem: {
                    qty: ''
				},
				editUrl: ''
            },
            methods: {
			    openKeyboard: function(e){
			        e.preventDefault();
			        console.log('opening keyboard');
			        keyboardModal.show();
				},
                completeScanning: function(id, idNo){
                    completeModal.show(); //pass directly to the modal
                },
				setCurrentItem: function(invoiceItem){
					this.barcode = invoiceItem.barcode;
                    //this.newBarcode();
				},
				newBarcode: function(){  //a new barcode has been entered
                    let barcode = this.barcode;
                    //this.currentItems = app.findInvoiceItems(barcode);
				},
                checkBarcode: function(){

				    ctrl.error = '';

                    ctrl.processBtnDisabled = true;
					ctrl.processBtnText = '<span class="fa fa-spinner spinning"></span> Processing...';

                    let barcode = this.barcode;
                    let invoiceItems = app.findInvoiceItems(barcode);

                    if (!invoiceItems.length){
                        ctrl.error = "Barcode " + barcode + " was not found in the invoice(s)";
                        ctrl.processBtnDisabled = false;
						ctrl.processBtnText = 'Process';
                        return;
					}

                    let qty = this.getTotals(invoiceItems, 'qty');
                    let qty_scanned = this.getTotals(invoiceItems, 'qty_scanned');
                    let dispName = invoiceItems[0].name;

                    if(ctrl.qty == 0) {
                        scanQty = qty - qty_scanned;
                        var msg = "Mark  ALL remaining <strong>(" + scanQty + ")</strong> as scanned for " + dispName + "?";
                    } else {
                        scanQty = ctrl.qty;
                        var msg = "Mark <strong>" + scanQty + "</strong> as scanned for " + dispName + "? ("+qty_scanned+" out of "+qty+" already scanned)";
					}

					if (ctrl.qty > (qty - qty_scanned)){
                        let over = ctrl.qty - (qty - qty_scanned);
                        msg += "<div style='margin-top: 10px; text-align: center'><strong>This is "+over+" over the expected total quantity, are you sure?</strong></div>";
					}

					self = this;
                    confirm.show(msg, function(){
                        self.doUpdate(invoiceItems, 'qty_scanned', scanQty);
					});
				},
				getTotals: function(invoiceItems, field) {
                    let total = 0;
					for (let i in invoiceItems){
					    let invoice = invoiceItems[i];
					    total += invoice[field];
					}
					return total;
                },
				doUpdate: function(invoiceItems, field, value){

					let idLst = [];
                    for (let i in invoiceItems){
                        let invoice = invoiceItems[i];
                        idLst.push(invoice['id']);
                        invoice.loading = true;
                    }

                    self = this;

					axios.post('{{ url("m/invoices_new/updateQtyScanned/")}}/', {idLst: idLst, field: field, value: value})
                        .then(function(response){
                            if (response.data.success){

                                if (response.data.lastItem){
                                    ctrl.lastItem.barcode = response.data.lastItem.carton_barcode;
                                    ctrl.lastItem.name = response.data.lastItem.name;
                                    ctrl.lastItem.qty_scanned = response.data.lastItem.qty_scanned;
                                    setTimeout(function(){ window.setOffset();}, 100);

                                    if(ctrl.autoPrintBarcodes) {
                                        app.printBarcode(response.data.lastItem, response.data.lastItem.qty_scanned)
                                    }
								}
                                app.get();
                                ctrl.clr();
                            }else{
								ctrl.error = 'Failed to update quantity on server. Please refresh the page to try again.';
							}
                            ctrl.processBtnDisabled = false;
							ctrl.processBtnText = 'Process';
                    }).catch(function(error){
                        ctrl.error = 'Fatal error connecting to server. Please refresh the page to try again.';
                        ctrl.processBtnDisabled = false;
						ctrl.processBtnText = 'Process';
						console.log(error);
					});
				},
				clr: function(){
				    this.barcode = "";
                    this.qty = 0;
				},
				clrLast: function(){
                    this.lastItem.barcode = ''; this.lastItem.name = ''; this.lastItem.qty_scanned = 0;
				},
				manualProcess: function(){
				    this.checkBarcode();
				}
            },
			watch: {
                barcode: function() {
                    let barcode = this.barcode;
                    let invoiceItems = app.findInvoiceItems(barcode);
                    let qty = this.getTotals(invoiceItems, 'qty');

                    console.log(invoiceItems);

                    this.currentItem.qty = qty;
                }
			}
        });

        let app = new Vue({
            el: '#main',

           data: {
               itemsNotDone: {},
               itemsDone: {},
               itemsNotDoneTotal: 0,
               itemsDoneTotal: 0
            },

            mounted(){ this.get();},

            methods: {
                get: function(){
                    self = this;

                    axios.get('{{ url("m/invoices_new/items/to_verify") }}/{{$ids}}')
						.then(function(response){
							self.itemsNotDone = response.data.itemsNotDone;
							self.itemsNotDoneTotal = response.data.itemsNotDoneTotal;
                            self.itemsDone = response.data.itemsDone;
                            self.itemsDoneTotal = response.data.itemsDoneTotal;

                            ctrl.progress = Math.round((self.itemsDoneTotal / response.data.total) * 100);
					 });
                },
				clr: function(){
				},
				getSummary: function(items){
				    let qty = 0;
                    let qty_scanned = 0;

                    for (let i in items){
                        let invoice = items[i];
                        qty += parseInt(invoice['qty']);
                        qty_scanned += parseInt(invoice['qty_scanned']);
                    }

                    let summaryItem = JSON.parse( JSON.stringify(items.slice(0)[0]));  //strips the vue data that causes issues within a loop
                    summaryItem.qty = parseInt(qty);
                    summaryItem['qty_scanned'] = parseInt(qty_scanned);
                    return [summaryItem]; //return as a single item lst
				},
                itemPropUpdated: function(field, invoiceItem){  //change is prompted from this enc

                    let value = Math.floor(Math.random() * 1000);  //making a fake update to qty_scanned for now
                    invoiceItem.loading = true;
                    ctrl.makeUpdate(invoiceItem, field, value);
                },
                updateItemProp: function(id, field, value){  //change from elsewhere
                    this.get();  //full update, need partial?

                    //var invoiceItem = this.findInvoiceItem(id);  //can be done partially
                    //if (invoiceItem){
                    //    invoiceItem[field] = value;
					//}
				},
                findInvoiceItems:function(barcode){  //all invoices matching the barcode

                    let matchingItemsNotDone = this.itemsNotDone[barcode];
                    let matchingItemsDone = this.itemsDone[barcode];

                    if (matchingItemsNotDone && matchingItemsDone){
                        return matchingItemsDone.concat(matchingItemsNotDone);
					}
					if (matchingItemsNotDone){  return matchingItemsNotDone; }
					if (matchingItemsDone){ return matchingItemsDone;  }
					return [];
                },
				findInvoiceItem:function(value, keyA, keyB = null){

					let lstA = this.itemsNotDone.filter(function( obj ) {
					    if (!keyB){
                            return obj[keyA] == value;
						} else {
                            return obj[keyA][keyB] == value;
						}
					});
                    let lstB = this.itemsDone.filter(function( obj ) {
                        //return obj[field] == value;
                        if (!keyB){
                            return obj[keyA] == value;
                        } else {
                            return obj[keyA][keyB] == value;
                        }
                    });

                    if (lstA.length > 0){ return lstA[0];}
                    if (lstB.length > 0){ return lstB[0];}
                },
				updateControl: function(value, type) {
					ctrl[type] = value;
				},
				itemClicked: function(invoiceItem) {
                    ctrl.setCurrentItem(invoiceItem);
				},
                invoiceName: function (item) {
					  console.log(item);
          			  return (item.item_details.name ? item.item_details.name : item.name);
        		},
                invoiceBarcode: function (item) {
				    return (item.item_details.carton_barcode ? item.item_details.carton_barcode : '-');
                },
				printBarcode: function(item, qty){

				    axios.post('/api/v1/products/labelling/print', {barcode : item.barcode, qty : qty}).then(function(response){
				        if(!response.data.success){
				            ctrl.error = 'Failed to print barcode. Error: '+response.data.message;
						}
                    }).catch(function(error){
                        ctrl.error = 'Failed to print barcode. Please try refreshing the page and try again. Sincerest apologies for the terrible inconvenience.'
					});
				},
				manualReprint: function(item){
                    confirm.show('Are you sure you want to reprint '+item.qty_scanned+' barcodes?', this.printBarcode(item, item.qty_scanned));
				}
            }
        });

        Echo.channel('supplier_invoice_item').listen('UpdateSupplierInvoiceItemEvt', function(e) {

            console.log('an item has been updated');
            app.updateItemProp(e.id, e.field, e.value)
			return;


            if (app.findInvoiceItem(e.id, 'id')){  //only update if we have that item
                app.updateItemProp(e.id, e.field, e.value)

                console.log('running update');
			} else {
                console.log('does not effect us');
			}
        });

        //////
        $( document ).ready(function() {
            let ctrl = $('#control');
            let main = $('#main');
            let barcode = $('#barcode');

            function setOffset(){
				main.css('margin-top', (ctrl.outerHeight() + 20)+ 'px');
			}
			$( window ).resize(function() {
				setOffset();
			});
			window.setOffset = setOffset;
            setOffset();

            $('.scrollTo').click(function(e){
                e.preventDefault();
                let target = $(this).data('target');

                $('html, body').animate({
                    scrollTop: $(target).offset().top - ctrl.outerHeight() - 40
                }, 1000);
            });

            barcode.focus();
            setInterval(function(){

                if(!$('.modal').hasClass('in')){
                    barcode.focus();
                }
            }, 1000);
        });
	</script>

	@yield('popoverScript')
@stop