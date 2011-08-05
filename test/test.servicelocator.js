/*
 * ServiceLocator jQuery plugin
 *
 * Copyright 2011, Acatl Pacheco
 * Licensed under the MIT License.
 **/
 
$(function(){

	/* servicelocator plugin */
	module("jquery servicelocator plugin", {
		setup : function(){

			$.addService("myService", {
			  
				getRemoteService: function (data, success, error) {		
					this.execute("ajax", {
						url: "dummy.json", 
						data: data, 
						dataType: "text",
						success: success, 
						error: error
					}, 
					this.fixture.generate(this.getRemoteServiceFixture, 25),
					true);
				},

				getRemoteServiceFixture: {
					"someData":200,
					"numbers":"1...35", 
					"bla":["uno", "dos", "tres"],
					"clicks": "400...1000"
				}
			});
		},
		teardown : function(){
			$._serviceLocator.myService = null;
		}
	});



	test("serviceLocator should exist", function(){
		equals(typeof $._serviceLocator, "object", "service locator exists");

		var result = null;
		$.getService("myService").getRemoteService( null,	
		  function(data) {
				result = data;
				console.log("success", result);
			}, 
			function(data) {
				console.log("error", arguments);
			});
			
			//console.log(result);
			equals(result[0].someData, 200, "fixture was served");
	});

});