'use strict';

/********** JS CHO TRANG MANAGE.HTML - TRANG QUẢN LÝ Load ảnh đại diện  **********/
function previewFile() {
				var preview = document.getElementById('displayImg');
				var file = document.querySelector('input[type=file]').files[0];
				var reader = new FileReader();

				reader.addEventListener("load", function () {
								preview.src = reader.result;
				}, false);

				if (file) {
								reader.readAsDataURL(file);
				}
}
$(document).ready(function () {
				//*************Check login//demo 2 user_data
				//****Lấy dữ liệu từ JSON - Gán cho biến
				var data_json = void 0;
				$.getJSON("./data.json", function (data) {
								data_json = data;
								return data_json;
				});
				//***Check login
				$(".login").on("click", function () {
								$.each(data_json.users, function (key, value) {
												if ($("#uname").val() == value.mobile && $("#psw").val() == value.pass || $("#uname").val() == value.email && $("#psw").val() == value.pass) {
																$("#uname").next("span").text("");
																$("#psw").next("span").text("");
																$(".error3").css("padding", "0px");
																$(".error1").css("padding", "0px");
																$("#sign-in").submit();
																return true;
												} else {
																$("#psw").next("span").html('<i class="fa fa-exclamation-circle"></i>T\xEAn \u0111\u0103ng nh\u1EADp ho\u1EB7c m\u1EADt kh\u1EA9u kh\xF4ng ch\xEDnh x\xE1c</br>');
												}
								});
								return false;
				});
				/***Gán dữ liệu vào menu search khi chọn loại hình tim kiem******/
				$(".room").on('click', function () {
								$("#arrow1").css("display", "inline-block");
								$(".loaihinh").val($(".loaihinh>option:nth-child(2)").val());
								$("#search-target").text("Phòng cho thuê");
				});
				$(".house").on('click', function () {
								$("#arrow1").css("display", "inline-block");
								$(".loaihinh").val($(".loaihinh>option:nth-child(3)").val());
								$("#search-target").text("Nhà cho thuê");
				});
				$(".flat").on('click', function () {
								$("#arrow1").css("display", "inline-block");
								$(".loaihinh").val($(".loaihinh>option:nth-child(4)").val());
								$("#search-target").text("Căn hộ cho thuê");
				});
				$(".store").on('click', function () {
								$("#arrow1").css("display", "inline-block");
								$(".loaihinh").val($(".loaihinh>option:nth-child(5)").val());
								$("#search-target").text("Mặt bằng cho thuê");
				});
				var window_width = innerWidth;
				if (window_width <= 768) {
								$(".header").attr("data-offset-top", "89");
				}
				//*****Hiển thị sign-in, sign-up
				if ($(location).attr("href").search("psw") > 0) {
								$(".navbar-right").css("display", "none");
								$(".info-acc").css("display", "block");
				}
				$(".sign-out").on("click", function () {
								window.location.href = "home.html";
				});
				//********Request send password
				$("#send").on("click", function () {
								$.each(data_json.users, function (key, value) {
												if ($("#send-mobile").val() == value.mobile) {
																$("#send-mobile").next("span").text("");
																$(".error3").css("padding", "0px");
																alert("Vui lòng kiểm tra tin nhắn để nhận lại mật khẩu!");
																$("#request-pass").submit();
																return true;
												} else {
																$("#send-mobile").next("span").html('<i class="fa fa-exclamation-circle"></i> S\u1ED1 \u0111i\u1EC7n tho\u1EA1i kh\xF4ng t\u1ED3n t\u1EA1i tr\xEAn h\u1EC7 th\u1ED1ng!</br>');
												}
								});
								return false;
				});
				//*************Load các quận huyện theo địa danh - menu search
				function data_locale(data) {
								$.each(data, function (key, value) {
												display_locale += '<option>' + value + '</option>';
								});
				}
				function load_locale() {
								var display_locale = "<option>Quận, Huyện</option>";
								if ($(".locale-item").val() == "Hà Nội") {
												$.each(data_json.district_locale.district_hn, function (key, value) {
																display_locale += '<option>' + value + '</option>';
												});
								} else if ($(".locale-item").val() == "Đà Nẵng") {
												$.each(data_json.district_locale.district_dn, function (key, value) {
																display_locale += '<option>' + value + '</option>';
												});
								} else if ($(".locale-item").val() == "TP.Hồ Chí Minh") {
												$.each(data_json.district_locale.district_hcm, function (key, value) {
																display_locale += '<option>' + value + '</option>';
												});
								} else {
												display_locale += "<option>Quận, Huyện</option>";
								}
								$(".locale_district").html(display_locale);
				}
				load_locale();
				$(".locale-item").click(function () {
								load_locale();
				});
				// JS load tin cho trang tin tức

				var _loop = function _loop(i) {
								$('#news' + i).click(function () {
												$.get("news_detail.html", function (data) {
																$("#data-new").html(data);
																$("#data-new").html($('#new' + i).html());
												});
								});
				};

				for (var i = 1; i <= 5; i++) {
								_loop(i);
				}
				/********** Trạng thái bài đăng DEMO CHO 2 BÀI ĐĂNG**********/
				var date_current = new Date();
				var msec_date_current = Date.parse(date_current);
				//demo date 1
				var date_st1 = new Date("2017-05-19");
				function date_status(date_st1) {
								var msec_dateup1 = Date.parse(date_st1);
								var msec_datedead1 = msec_dateup1 + 5 * 86400000; //Date_dead = date_up + 5days
								var date_dead1 = new Date(msec_datedead1);
								$(".date-up.item1").html(date_st1.getDate() + "-" + (date_st1.getMonth() + 1) + "-" + date_st1.getFullYear());
								$(".date-dead.item1").html(date_dead1.getDate() + "-" + (date_dead1.getMonth() + 1) + "-" + date_dead1.getFullYear());
								//So sánh ngày hết hạn và thời gian hiện tại
								if (msec_datedead1 < msec_date_current) {
												$('#status').html("Tin đã hết hạn");
												$('#status').css("color", "red");
								}
				}
				//demo date 2
				var date_st2 = new Date("2017-04-28");
				function date_status2(date_st2) {
								var msec_dateup2 = Date.parse(date_st2);
								var msec_datedead2 = msec_dateup2 + 5 * 86400000; //Date_dead = date_up + 5days
								var date_dead2 = new Date(msec_datedead2);
								$(".date-up.item2").html(date_st2.getDate() + "-" + (date_st2.getMonth() + 1) + "-" + date_st2.getFullYear());
								$(".date-dead.item2").html(date_dead2.getDate() + "-" + (date_dead2.getMonth() + 1) + "-" + date_dead2.getFullYear());
								//So sánh ngày hết hạn và thời gian hiện tại
								if (msec_datedead2 < msec_date_current) {
												$('#status2').html("Tin đã hết hạn");
								}
				}
				window.onload = date_status2(date_st2);
				window.onload = date_status(date_st1);
				//Thao tác dừng đăng tin và đăng lại tin
				$("#st1").click(function () {
								$('#status').html("Tin đã ngừng đăng");
								$('#status').css("color", "#ED2327");
								$(".date-up.item1").html("");
								$(".date-dead.item1").html("");
				});

				$("#st2").click(function () {
								date_st1 = date_current; //cập nhật ngày đăng theo ngày gia hạn
								date_status(date_st1);
								$('#status').html("Tin đang được đăng");
								$('#status').css("color", "#4CAF50");
				});

				$("#st1-2").click(function () {
								$('#status2').html("Tin đã ngừng đăng");
								$('#status2').css("color", "#ED2327");
								$(".date-up.item2").html("");
								$(".date-dead.item2").html("");
				});
				$("#st2-2").click(function () {
								date_st2 = date_current; //cập nhật ngày đăng theo ngày gia hạn
								date_status2(date_st2);
								$('#status2').html("Tin đang được đăng");
								$('#status2').css("color", "#4CAF50");
				});
});