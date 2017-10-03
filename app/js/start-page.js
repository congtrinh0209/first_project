'use strict';

var url = decodeURIComponent($(location).attr('href'));
var data_url = url.substring(url.search('html') + 5);
function transition(selector) {
	$(selector).css({ "transform": "translateX(0)", "opacity": "1" });
}
$(window).scroll(function () {
	var window_width = $(window).width();
	var a = $(window).scrollTop();
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
$(window).ready(function () {
	$(".hn").hover(function () {
		$(".first").css({ "display": "block", "visibility": "visible" });
	}, function () {
		$(".first").css({ "display": "none", "visibility": "hidden" });
	});

	$(".dn").hover(function () {
		$(".second").css({ "display": "block", "visibility": "visible" });
	}, function () {
		$(".second").css({ "display": "none", "visibility": "hidden" });
	});

	$(".hcm").hover(function () {
		$(".third").css({ "display": "block", "visibility": "visible" });
	}, function () {
		$(".third").css({ "display": "none", "visibility": "hidden" });
	});

	$(".container-popover").hover(function () {
		$(this).css({ "display": "block", "visibility": "visible" });
	}, function () {
		$(this).css({ "display": "none", "visibility": "hidden" });
	});
	/******Request-locale*******/
	switch (data_url) {
		case "locale=hanoi":
			{
				$(".locale-item").val($(".locale-item>option:nth-child(2)").val());
				break;
			}
		case "locale=danang":
			{
				$(".locale-item").val($(".locale-item>option:nth-child(3)").val());
				break;
			}
		case "locale=hochiminh":
			{
				$(".locale-item").val($(".locale-item>option:nth-child(4)").val());
				break;
			}
		default:
			{
				$(".locale-item").val("Tỉnh, TP");
			}
	}
});