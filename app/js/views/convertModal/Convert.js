define([
    'text!templates/convertModal/Convert.html',
    'views/ModalAC'
],function(template,ModalAC) {
    var AuthModal = ModalAC.extend({
        TEMPLATE: _.template(template),
        TEMPLATE_VARS: {
            modalTitle: "Login",
            noClose: true
        },
        render: function() {
            this.$el.html(this.TEMPLATE());
        },
        updateModel: function() {
            var input = {};
            this.$("input, select").each(function() {
                var $this = $(this);
                input[$this.attr("name")] = $this.val();
            });
            this.model.set(input);
        }
    });
    return AuthModal;
});