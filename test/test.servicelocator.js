$(function(){

	/* servicelocator plugin */
	module("jquery servicelocator plugin", {
		setup : function(){

			$.addService("myService", {
				getData: function (data, success, error) {		
					this.execute("ajax", {
						url: "dummy.json", 
						data: data, 
						dataType: "text",
						success: success, 
						error: error
					}, 
					this.getCampaignsFixture, 
					true);
				},

				getCampaignsFixture: {
					"someData":200,
					"numbers":"1...35", 
					"bla":["uno", "dos", "tres"],
					"clicks": "400...1000"
				}
			});
		},
		teardown : function(){
			$.serviceLocator.myService = null;
		}
	});



	test("serviceLocator should exist", function(){
		equals(typeof $.serviceLocator, "object", "service locator exists");

		var result = null;
		
		$.serviceLocator.myService.getData({x:1},
			function(data) {
				result = data;
			}, 
			function(data) {
				console.log("error", arguments);
			});
			
			//console.log(result);
			equals(result.someData, 200, "fixture was served");
	});

});