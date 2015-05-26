/**
 * A simple view class that is used for displaying a side menu in every 
 * other admin view.
 */
define([
    'text!templates/convertModal/ConvertTemplate.html'
], 

function(ConvertTemplate) {

    var ConvertView = Backbone.View.extend({
        TEMPLATE: _.template(ConvertTemplate),

        //Constructs the convert view and splits the strings.
        initialize: function(options) {
            //Split the array
            this.queryArray = options.query.split('~');

            //Filter out the filenames.
            this.fileArray = this.queryArray[2].split(',');

            //Remove the first ,
            this.fileArray.shift();

            //Render the view when init is complete.
            this.render();
        },

        //Handles click events on the radio buttons.
        events: {
            "click #SGR": "selectSGR",
            "click #WIG": "selectWIG",
            "click #BED": "selectBED",
            "click #GFF": "selectGFF"
        },
        
        render: function() {
            //alert(this.queryArray[0]);
            this.$el.html(this.TEMPLATE({'files':this.fileArray}));
        },

        //Select allt the GFF files.
        selectGFF: function() {
            this.selectAll("gff");

                
        },

        //Select all the WIG files
        selectWIG: function() {
            this.selectAll("wig");
        },

        //Select all the BED files
        selectBED: function(){
            this.selectAll("bed");
        },

        //Select all the SGR files
        selectSGR: function(){
            this.selectAll("sgr");
        },

        selectAll: function(val) {
            // Reset all the check-boxes ckecked
            $('input:checkbox').prop('checked', false);

            $("input:checkbox").filter(function() {
                return this.value.split('.').pop() == val;
            }).prop("checked", "true");
        },


    });
    return ConvertView;
});