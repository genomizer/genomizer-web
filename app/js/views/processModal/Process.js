define([
    // 'views/ModalAC',
    'text!templates/processModal/Process.html',
    'text!templates/process/BowtieBlock.html',
    'views/process/BowtieBlock',
    'collections/ProcessCommands'
], function(processTemplate, bowtieBlockTemplate, BowtieBlock, ProcessCommands) {

    return Backbone.View.extend({

        TEMPLATE: _.template(processTemplate),

        initialize: function(options) {
            this.collection = new ProcessCommands();
            this.render();
        },
        events: {
            // 'submit form':'submitProcess',
            // 'click #step-box' : 'toggleStepsInput',
            'click #append_process_btn' : 'appendProcess'
        },

        render: function() {
            this.$el.html(this.TEMPLATE());

            var processView = this;
            this.collection.getProcessCommands().forEach(function (cmd) {
                cmd.render();
                processView.$("#processes").append(cmd.el);
            });
        },

        appendProcess: function () {
            var blockType = $("#append_process").val().toLowerCase();
            console.log();
            switch (blockType) {
                case "bowtie": 
                    this.collection.addProcessCommand(new BowtieBlock());
                    break;
                case "ratio":
                    console.log("append ratio block");
                    break;
            }
            this.render();
        }
//      renderNotices: function() {
//          this.$el.find('#alert-container').html(this.TEMPLATEALERT({
//              'expID': this.expID[0]
//          }));
//
//          for(var i = 1; i<this.expID.length;i++) {
//              this.$el.find('#alert-container').append(this.TEMPLATEALERT({
//                  'expID': this.expID[i]
//              }));
//          }
//      },
//      radioClicked: function(e) {
//          switch(e.target.id) {
//              case "sam":
//              case "gff":
//              case "sgr":
//
//                  $('#raw-process-container input').prop('disabled', false);
//                  $('#ratio-col input, #smooth-col input, #steps-col input, #ratio-col select').prop('disabled', true);
//                  $('#ratio-col, #smooth-col, #steps-col').addClass('disabled');
//
//                  break;
//              case "smooth-radio":
//
//                  $('#raw-process-container input').prop('disabled', false);
//                  $('#ratio-col input, #steps-col input, #ratio-col select').prop('disabled', true);
//
//                  $('#raw-process-container .disabled').removeClass('disabled');
//                  $('#ratio-col, #steps-col').addClass('disabled');
//
//                  break;
//              case "steps-radio":
//
//                  $('#raw-process-container input').prop('disabled', false);
//                  $('#ratio-col input, #ratio-col select').prop('disabled', true);
//
//                  $('#raw-process-container .disabled').removeClass('disabled');
//                  $('#ratio-col').addClass('disabled');
//
//                  break;
//              case "ratio-radio":
//
//                  $('#raw-process-container input, #raw-process-container select').prop('disabled', false);
//
//                  $('#raw-process-container .disabled').removeClass('disabled');
//
//                  break;
//              default:
//                  console.log('undefined')
//                  break;
//          }
//      },
//      submitProcess: function(e) {
//          e.preventDefault();
//          this.successIDs = [];
//          this.failIDs = [];
//
//          var level = $('[name=process-radios]:checked').val();
//          var bowtieFlags = ($('#bowtie-params').val());
//          var genomeReference = ($('#genome-reference').val());
//          var gffFormat = (level >= 2 ? "y": "");
//          var sgrFormat = (level >= 3 ? "y": "");
//          var smoothParams = (level >= 4 ? (($('#window-size').val()) 
//              + " " + ($('#smooth-type')).val()
//              + " " + ($('#step-pos')).val()
//              + ($('#print-mean').prop('checked') ? " 1": " 0") 
//              + ($('#print-zeros').prop('checked') ? " 1": " 0"))
//              : "");
//          var steps = (level >= 5 ? "y " + ($('#nr-of-steps').val()): "");
//          var ratioCalculation = (level >= 6 ? ($('#ratio-select').val())
//              + " " + ($('#ratio-cut-off').val())
//              + " " + ($('#ratio-chromosomes').val())
//              : "");
//          var ratioSmoothing = (level >= 6 ? (($('#ratio-window-size').val()) 
//              + " " + ($('#ratio-smooth-type')).val()
//              + " " + ($('#ratio-step-pos')).val()
//              + ($('#ratio-print-mean').prop('checked') ? " 1": " 0") 
//              + ($('#ratio-print-zeros').prop('checked') ? " 1": " 0"))
//              : "");
//          var genomeVer = ($('#genome-reference').val());
//
//          var parameters = [
//              bowtieFlags,
//              "",//genomeReference,
//              gffFormat,
//              sgrFormat,
//              smoothParams,
//              steps,
//              ratioCalculation,
//              ratioSmoothing];
//              
//          for(var i = 0; i<this.expID.length;i++) {
//              var data = {
//                  "expid": this.expID[i],
//                  "parameters": parameters,
//                  "metadata": (parameters.join(", ")+", "+genomeReference),
//                  "genomeVersion": genomeVer,
//                  "author": "Kalle" //TODO FIX tempvalue
//              };
//
//              //Did this into a function to save which file/experiment is run in this loop.
//              var f = (function (data, that, experiment) {
//                  return function() {
//                      var rawToProfileInfo = new RawToProfileInfo(data);
//                      console.log('1 file: ',experiment);
//                      //TELL USER WHICH PROCESSES STARTED AND WAS SUCCESSFULL
//                      rawToProfileInfo.save({}, {"type":"put", 
//                          success: function () {
//                              console.log("successfully sent process request");
//                              that.handleProcessAnswer(true,experiment);
//                              //that.hide();
//                              //app.messenger.success("WOOHOOO!! The processing of raw data "
//                              //  + "from the experiment "+ experiment +" has begun!");
//                          },
//                          error: function() {
//                              that.handleProcessAnswer(false,experiment);
//                              console.log("failed to send process request of raw data from "
//                                  + "experiment "+experiment);
//                          }
//                      });
//                  };
//              })(data, this, this.expID[i]);
//              console.log('callling f');
//              f.call();
//          }
//      },
//      handleProcessAnswer: function(successfull, exp) {
//          if(successfull) {
//              this.successes++;
//              this.successIDs.push(exp);
//          } else {
//              this.failures++;
//              this.failIDs.push(exp);
//          }
//          if(this.successes == this.experiments) {
//              this.hide();
//              app.messenger.success("The processing of raw data from the experimets: "
//                  + this.expID.join(', ') + " has begun!");
//          } else if(this.successes+this.failures == this.experiments) {
//              if(this.successIDs.length>0) {
//                  app.messenger.warning("The processing of " + this.successIDs.join(', ')
//                      + " were successfull. HOWEVER the processing of " + this.failIDs.join(', ') 
//                      + " failed, try again.");
//              } else {
//                  app.messenger.warning("The processing of " + this.failIDs.join(', ')  + " failed."
//                      + " please try again.");
//              }
//              for (var i = 0; i<this.successIDs.length; i++) {
//                  var index = this.expID.indexOf(this.successIDs[i]);
//                  if (index > -1) {
//                      this.expID.splice(index, 1);
//                      this.experiments--;
//                  }
//              }
//              this.renderNotices();
//          }
//      },
//      toggleStepsInput: function() {
//          if ($('#step-box').prop('checked')) {
//              $('#nr-of-steps').prop('disabled', false);
//          } else {
//              $('#nr-of-steps').val('');
//              $('#nr-of-steps').prop('disabled', true);
//          }
//      }
    });
});

