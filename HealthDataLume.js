/**
 * @file HealthDataLume.js
 * @author Shelley V. Adams 
 * @copyright 2014 Shelley V. Adams
 * @license MIT License
 * @description HealthDataLume.js requires [Bootstrap]{@link http://getbootstrap.com/} v3.x and [jQuery]{@link http://jquery.com/} v1.11 or higher.
**/

/**
 * @class HealthDataLume
 * @static
 * @description Top-level application.
 * @param {Document} doc
**/
var HealthDataLume = (function(doc) {

	// Initialize stuff.
	$(doc).ready(function() {
		HelpBalloons.applyAllBalloons();
		$("#help_button").on("click", HelpBalloons.toggle);

		var fileInput = $("#xml_file");
		var fileDisplay = $("#file_path");
		$("#open_file").on("click", function(e) {
			fileInput.trigger("click");
		});
		fileInput.change(function(e) {
			fileDisplay.val("");
			var userFile = fileInput.get(0).files.item(0);
			if ( userFile.type.search(/(?:text|application)\/(?:\w[\w\.\-]+\+)?xml/) >= 0 ) {
				fileDisplay.val(userFile.name);
			} else {
				throw new Error("Sorry, HealthDataLume only understands XML files." + (userFile.name.length > 0 ? " If you're sure that " + userFile.name + " is an XML file, please report the issue." : ""));
			}
			console.log(userFile);
		});
	});

})(document);


/**
 * @class HelpBalloons
 * @static
 * @description Handles [Bootstap popovers]{@link http://getbootstrap.com/javascript/#popovers} for displaying help.
 * @todo Tenative: methods to add/destroy a help balloon.
**/
var HelpBalloons = (function() {
	/**
	 * @constant
	 * @type {String}
	 * @memberof HelpBalloons
	 * @private
	 * @description HTML class indicating an element has a popover help balloon.
	**/
	var HELP_CLASS = "popover-help";

	/**
	 * @member
	 * @type {Object}
	 * @memberof HelpBalloons
	 * @private
	 * @description Key-value pairs associating a selector (ideally an id) and an Object containing [Bootstrap popover options]{@link http://getbootstrap.com/javascript/#popovers-usage}.
	**/
	var balloons = {
		"#help_button": {
			container: "body",
			placement: "left",
			content: "Toggle help balloons.",
			trigger: "manual"
		},
		"#open_file": {
			container: "body",
			html: true,
			placement: "bottom",
			content: "Open a locally stored <abbr title='Clinical Document Architecture, Release 2'>CDA R2</abbr> or <abbr title='Consolidated Clinical Document Architecture'>C-CDA</abbr> file.",
			trigger: "manual"
		},
		"#samples_button": {
			container: "body",
			html: true,
			placement: "right",
			title: "Coming soon!",
			content: "Browse <a href='https://github.com/chb/sample_ccdas' target='_blank'>sample <abbr title='Consolidated Clinical Document Architecture'>C-CDA</abbr> files on GitHub</a> and select one to view with HealthDataLume.",
			trigger: "manual"
		},
		"#reset_button": {
			container: "body",
			placement: "left",
			content: "Start over; clear file selection and any output.",
			trigger: "manual"
		},
	};

	/**
	 * @function applyBalloon
	 * @memberof HelpBalloons
	 * @private
	 * @static
	 * @param {String} selector
	**/
	var applyBalloon = function(selector){
		var ele = $(selector);
		ele.popover(balloons[selector]);
		ele.addClass(HELP_CLASS);
	};

	return {
	/**
	 * @function applyAllBalloons
	 * @memberof HelpBalloons
	 * @static
	**/
	applyAllBalloons: function() {
		for (var key in balloons) {
			applyBalloon(key);
		}
	},

	/**
	 * @function toggle
	 * @memberof HelpBalloons
	 * @static
	 * @param {Event} e
	**/
	toggle: function(e) {
		e.preventDefault();
		$("." + HELP_CLASS).popover("toggle");
	}
	
	};
})();