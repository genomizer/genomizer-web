define([
    'text!templates/editModals/EditFile.html',
    'views/ModalAC'
],function(template,ModalAC) {
    return ModalAC.extend({
        TEMPLATE: _.template(template),
        TEMPLATE_VARS: {
            modalTitle: "Edit file",
        },
        events: {
            'submit form':'submitEdit',
        },
        render: function() {
            this.$el.html(this.TEMPLATE({
                "author": this.model.get("author"),
                "filename": this.model.get("filename"),
                "metaData": this.model.get("metaData"),
            }));
        },
        submitEdit: function(e) {

            var formData = $("#edit_file_form").val();

            var filename = $("#new_filename").val();
            if (filename.length > 0) {
                this.model.set("filename", filename);
            }
            var author = $("#new_author").val();
            if (author.length > 0) {
                this.model.set("author", author);
            }
            var metaData = $("#new_metaData").val();
            if (metaData.length > 0) {
                this.model.set("metaData", metaData);
            }

            this.model.save({}, {
                "type": "put",
                success: function() {
                    console.log("success");
                },
                error: function() {
                    console.log("error!!!");
                }
            });
        }
    });
});

