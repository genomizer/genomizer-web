define([],function() {
	var Experiment = Backbone.Model.extend({
		defaults : {
			"name": "experimentName1",
			"created by": "user",
			"files": [
				{
					"id": "file-id1", 
					"type": "raw",
					"name": "file1.wig"
				},
				{
					"id": "file-id2", 
					"type": "profile",
					"name": "file2.as"
				}, 
				{
					"id": "file-id3", 
					"type": "region",
					"name": "file3.df"
				}, 
			],
			"annotations": [
				{
					"id": "1", 
					"name": "pubmedId",
					"value": "abc123"
				}, 
				{
					"id": "2",
					"name": "type",
					"value": "raw"
				},
				{
					"id": "3",
					"name": "specie",
					"value": "human"
				},
				{
					"id": "4",
					"name": "genome release",
					"value": "v.123"
				},
				{
					"id": "5",
					"name": "cell line",
					"value": "yes"
				},
				{
					"id": "6",
					"name": "development stage",
					"value": "larva"
				},
				{
					"id": "7",
					"name": "sex",
					"value": "male"
				},
				{
					"id": "8",
					"name": "tissue",
					"value": "eye"
				}
			]
		},
		initialize: function() {
			
		},
		getAnnotation: function(id) {
			for (var i = 0; i < this.attributes.annotations.length; i++) {
				if(this.attributes.annotations[i].id == id) {
					return this.attributes.annotations[i];
				}
			}
			return undefined;
		}
	});
	return Experiment;
});
