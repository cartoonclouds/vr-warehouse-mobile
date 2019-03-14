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

@section('confirmScript')

    <script type="text/javascript">
        var Confirm = {
            self: this,
            modal: $('#confirmModal'),
            body: $('#confirmModal').find('.modal-body'),
            okBtn: $('#confirmModal').find('.modal-confirm'),

            show: function (txt, onConfirm = null) {
                this.body.html(txt);

                var options = {};
                var m = this.modal.modal(options);

                this.okBtn.unbind();
                if (onConfirm){
                    this.okBtn.click(function(){
                        onConfirm();
                        m.modal('hide');
                    });
                } else {
                    this.okBtn.click(function(){
                        m.modal('hide');
                    });
                }
            }
        }
        var confirm = Object.create(Confirm);
    </script>
@stop