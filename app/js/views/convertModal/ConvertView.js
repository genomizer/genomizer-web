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
        disableBoxes: function(e){
            var filestring = []
            var filenames = this.fileArray;
            var j = 0;
            var i = 0;
            $("input:checkbox").each(function (){
                if(this.checked) {
                    filestring[j] = filenames[i];
                    j++;
                }
                i++;
            });
            alert(filestring[0]);
        }
        ,
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

            $("input:checkbox").filter(function() {
                return this.value.split('.').pop() == val;
            }).prop("checked", "true");
        },

        getSelectedFiles: function() {
            var fileArray = [];
            var i = 1;

            var fileids = this.idArray;

            $("input:checkbox").each(function (){
                if(this.checked) {
                    fileArray += fileids[i];
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

            var fileids = this.getSelectedFiles();
            for(i = 0 ; i < fileids.length - 1 ; i++) {
                var toSubmit = {fileid: fileids[i],toformat: totype};
                new Backbone.Model(toSubmit).save(null, {
                url: "/api/convertfile",
                type: "PUT",
                error: function (event, jqxhr) {
                    app.messenger.warning("Unable to convert: " + jqxhr.status + " " + jqxhr.responseText);
                    $( "input:checkbox:checked" ).each(function(){
                       $( this ).closest('label').addClass( 'errorLabel');
                    });
                },
                success: function (event, jqxhr) {
                    alert("Successfully converted "+filids[i])
                    app.messenger.success("Successfully converted file/files");
                    $( "input:checkbox:checked" ).each(function(){
                        $( this ).closest('label').addClass( 'successLabel');
                    });
                },
            });
            }
           

        }


    });
    return ConvertView;
});