(function( $ ){

	var Service = function () {};
	
	Service.prototype.execute = function (type, options, fixture, useFixture) {
		if (typeof useFixture != "undefined" && useFixture) {
			options.success(fixture);
			return;
		}

		$[type](options);
	};

	$.extend({
		
		serviceLocator:{},
		
		addService: function (name, options) {
			var newService = $.extend (new Service(), options);
			$.serviceLocator[name] = newService;
			return newService;
		}
	});

})( jQuery );