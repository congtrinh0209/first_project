"use strict";

//**Scroll fixed menu navigation-mobile,tablet
$(document).ready(function () {
    /***Gán dữ liệu vào menu search khi chọn loại hình quan tâm******/
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
    //*************Check login//demo 2 user_data
    //****Lấy dữ liệu từ JSON - Gán cho biến
    var data_json;
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
                $("#psw").next("span").html("<i class=\"fa fa-exclamation-circle\"></i>T\xEAn \u0111\u0103ng nh\u1EADp ho\u1EB7c m\u1EADt kh\u1EA9u kh\xF4ng ch\xEDnh x\xE1c</br>");
            }
        });
        return false;
    });
    //****************Request send password
    $("#send").on("click", function () {
        $.each(data_json.users, function (key, value) {
            if ($("#send-mobile").val() == value.mobile) {
                $("#send-mobile").next("span").text("");
                $(".error3").css("padding", "0px");
                alert("Vui lòng kiểm tra tin nhắn để nhận lại mật khẩu!");
                $("#request-pass").submit();
                return true;
            } else {
                $("#send-mobile").next("span").html("<i class=\"fa fa-exclamation-circle\"></i> S\u1ED1 \u0111i\u1EC7n tho\u1EA1i kh\xF4ng t\u1ED3n t\u1EA1i tr\xEAn h\u1EC7 th\u1ED1ng!</br>");
            }
        });
        return false;
    });
    //*************Load các quận huyện theo địa danh-menu search
    function data_locale(data) {
        $.each(data, function (key, value) {
            display_locale += "<option>" + value + "</option>";
        });
    }
    function load_locale() {
        var display_locale = "<option>Quận, Huyện</option>";
        if ($(".locale-item").val() == "Hà Nội") {
            $.each(data_json.district_locale.district_hn, function (key, value) {
                display_locale += "<option>" + value + "</option>";
            });
        } else if ($(".locale-item").val() == "Đà Nẵng") {
            $.each(data_json.district_locale.district_dn, function (key, value) {
                display_locale += "<option>" + value + "</option>";
            });
        } else if ($(".locale-item").val() == "TP.Hồ Chí Minh") {
            $.each(data_json.district_locale.district_hcm, function (key, value) {
                display_locale += "<option>" + value + "</option>";
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
});