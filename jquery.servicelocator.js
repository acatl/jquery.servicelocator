(function( $ ){

	var Service = function () {};
	
	Service.prototype.execute = function (type, options, fixture, useFixture) {
		if (typeof useFixture != "undefined" && useFixture) {
			options.success(fixture);
			return;
		}

		$[type](options);
	};
	
	Service.prototype.fixture = {
  	// Private
  	_rows: 20,
  	_template : null,
  	generate: function (template, numberOfRows) {

  		var dataSet = [];
  		var row = {};
      var column = null;
      
  		this._rows = numberOfRows;

  		if(numberOfRows==0) {
  			row = {};
  			for (column in template) {
  				row[column] = this._parseColumn(column, template[column]);
  			}

  			return row;
  		}

  		for (var i = 0; i < numberOfRows; i++) {
  			row = {};
  			for (column in template) {
  				row[column] = this._parseColumn(column, template[column]);
  			}
  			dataSet.push(row);
  		}
  		return dataSet;
  	},

  	_parseColumn: function (columnName, columnValue) {
  		var tokens = null;

  		if (typeof columnValue == "number") {
  			return columnValue;
  		}

  		if (typeof columnValue == "string") {
  			if (columnValue.indexOf("...") != -1) {
  				//range
  				tokens = [columnValue, 0];
  				if (columnValue.indexOf(":") != -1) {
  					tokens = columnValue.split(":");
  				}
  				var ranges = tokens[0].split("...");
  				return parseFloat(this.randomNumber(parseFloat(ranges[0]), parseFloat(ranges[1]), tokens[1]));
  			}
  		}

  		if (typeof columnValue == "object") {
  			if (columnValue.hasOwnProperty("length")) {
  				return columnValue[this.randomNumber(0, columnValue.length - 1)];
  			} else {
  				tokens = [columnValue, this._rows];
  				if (columnValue.hasOwnProperty("rows") && columnValue.hasOwnProperty("template")) {
  					tokens[0] = columnValue.template;
  					tokens[1] = columnValue.rows;
  				}
  				return this.generate(tokens[0], tokens[1]);
  			}
  		}

  		return columnValue;
  	},

  	//function to get random number upto m
  	randomNumber: function (minVal, maxVal, floatVal) {
  		var randVal = minVal + (Math.random() * (maxVal - minVal));
  		return typeof floatVal == 'undefined' ? Math.round(randVal) : randVal.toFixed(floatVal);
  	},
  
  	getRandomArrayValues: function(arrayNumber, base, limit){
  		var values = [];
  		for (var i=0; i < arrayNumber; i++) {
  			values.push(this.getRandom(base,limit));
  		};

  		return values;
  	}
  };

	$.extend({
		
		_serviceLocator:{},
		
		addService: function (name, options) {
			var newService = $.extend (new Service(), options);
			$._serviceLocator[name] = newService;
			return newService;
		}, 
		
		getService: function (name) {
			return $._serviceLocator[name];
		}
		
	});

})( jQuery );