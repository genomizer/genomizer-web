/**
 * A simple view class that is used for displaying a side menu in every 
 * other admin view.
 */
define([
    'text!templates/convert/ConvertTemplate.html'
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

            //Filter out the fileids.
            this.idArray = this.queryArray[1].split(',');

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
            "click #GFF": "selectGFF",
            "click input:checkbox": "disableBoxes",
            "click #submit" : "startConversion"
        },

        render: function() {
            //alert(this.queryArray[0]);
            this.$el.html(this.TEMPLATE({'files':this.fileArray}));
        },

        disableBoxes: function(e){
            var filearr = []
            var filenames = this.fileArray;
            var j = 0;
            var i = 0;

            $("input:checkbox").each(function (){
                if(this.checked) {
                    filearr[j] = filenames[i];
                    j++;
                }
                i++;
            });

            for(i = 0; i < filearr.length; i++) {
                if((filearr[i]).split('.').pop() == "sgr") {
                    this.disableAll("wig");
                    this.setSGRTarget(true);
                    this.setWIGTarget(false);
                    return;
                }
                else if((filearr[i]).split('.').pop() == "wig") {
                    this.disableAll("sgr");
                    this.setSGRTarget(false);
                    this.setWIGTarget(true);
                    return;
                } else {
                    this.setSGRTarget(false);
                    this.setWIGTarget(false);
                    $('input:checkbox').prop('disabled', false);
                }
            }
            $('input:checkbox').prop('disabled', false);
        },

        //Select allt the GFF files.
        selectGFF: function() {
            this.selectAll("gff"); 
        },

        //Select all the WIG files
        selectWIG: function() {
            this.selectAll("wig");
            $("#convertTarget-SGR").prop("checked", true);
        },

        //Select all the BED files
        selectBED: function(){
            this.selectAll("bed");
        },

        //Select all the SGR files
        selectSGR: function(){
            this.selectAll("sgr");
            $("#convertTarget-WIG").prop("checked", true);
        },

        selectAll: function(val) {
            // Reset all the check-boxes ckecked
            $('input:checkbox').prop('checked', false);
            this.disableBoxes();

            $("input:checkbox").filter(function() {
                return this.value.split('.').pop() == val;
            }).prop("checked", "true");

            this.disableBoxes();
        },

        disableAll: function(val) {
            // Reset all the check-boxes checked
            $("input:checkbox").filter(function() {
                return this.value.split('.').pop() == val
            }).prop("disabled", "true");
        },

        //Toggles the convert radio button for SGR.
        setSGRTarget: function(val) {
            $("#convertTarget-SGR").attr('disabled',val);
            $("#convertTarget-WIG").prop("checked", true);
        },

         //Toggles the convert radio button for WIG.
        setWIGTarget: function(val) {
             $("#convertTarget-WIG").attr('disabled',val);
             $("#convertTarget-SGR").prop("checked", true);
        },

        getSelectedFileIDs: function() {
            var fileArray = [];
            var i = 1;

            var fileids = this.idArray;

            $("input:checkbox").each(function (){
                if(this.checked ) {
                    fileArray += fileids[i];
                    fileArray += ',';
                }
                i++;
            });
            return fileArray.split(',');
        },

        getSelectedFiles: function() {
            var fileArray = [];
            var i = 1;

            var filearr = this.fileArray;

            $("input:checkbox").each(function (){
                if(this.checked) {
                    fileArray += filearr[i];
                    fileArray += ',';
                }
                i++;
            });
            return fileArray.split(',');
        },


        //Sends the convert command to the server using JSON.
        startConversion: function(event) {
            event.preventDefault();
            var totype;
            var sgrCheckbox = document.getElementById('convertTarget-SGR');
            var that = this;

            //TODO Update to better solution.
            if(sgrCheckbox.checked){
                totype = "sgr";
            } else {
                totype = "wig";
            }

            var fileids = this.getSelectedFileIDs();
            var filearr = this.getSelectedFiles();
            for(i = 0 ; i < fileids.length - 1 ; i++) {
                var toSubmit = {fileid: fileids[i],toformat: totype};
                new Backbone.Model(toSubmit).save(null, {
               
                //REST request configuration.
                url: "/api/convertfile",
                type: "PUT",

                //Errors when converting.
                error: function (event, jqxhr) {
                    app.messenger.warning("Unable to convert: " + jqxhr.status + " " + jqxhr.responseText);
                    $( "input:checkbox:checked" ).each(function(){
                       $( this ).closest('label').addClass( 'errorLabel');
                       $( this ).prop("disabled", "false");
                    });
                },

                //Converted successfully.
                success: function (event, jqxhr) {
                    app.messenger.success("Successfully converted " +filearr[i]+ " to "+totype);
                    $( "input:checkbox:checked" ).each(function(){
                        $( this ).closest('label').addClass( 'successLabel');
                        $( this ).prop("disabled", "true");
                    });
                },
            });
            }
        }
    });
    return ConvertView;
});