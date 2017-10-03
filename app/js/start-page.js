"use strict";

function transition(selector) {
	$(selector).css({ "transform": "translateX(0)", "opacity": "1" });
}
$(window).scroll(function () {
	var window_width = $(window).width();
	var a = $(window).scrollTop();
	console.log(a);
	if (window_width >= 769) {
		if (a > 250) {
			transition(".wr1");
		}
		if (a > 1000) {
			transition(".wr2");
		}
		if (a > 1700) {
			transition(".wr3");
		}
		if (a > 2900) {
			transition(".wr4");
		}
	} else {
		if (a > 600) {
			transition(".wr1");
		}
		if (a > 1700) {
			transition(".wr2");
		}
		if (a > 3600) {
			transition(".wr4");
		}
	}
});