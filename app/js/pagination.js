"use strict";

/******** PAGINATION ************/
$(document).ready(function () {
    $.getJSON("./data.json", function (data) {
        var length_arr = data.news.length; // Kích thước mảng dữ liệu tin tức
        var nper_page = 2; // Số tin trên 1 trang
        var stt_b; // Số thứ tự box giữa pagination
        var number_page = Math.ceil(length_arr / nper_page); // Tính số trang
        function pagination(a, b) {
            // Hàm render html cho mỗi trang
            var content_new = "";
            $.each(data.news, function (key, value) {
                if (a <= key && key < b) {
                    // HTML template phần nội dung tin đăng
                    content_new += "<div class=\"content\" id=\"content" + (key + 1) + "\">\n                <div class=\"content-left col-xs-12 col-sm-5 col-md-4\">\n                    <div id=\"myCarousel" + (key + 1) + "\" class=\"carousel slide\" data-ride=\"carousel\">\n                        <ol class=\"carousel-indicators\">\n                            <li data-target=\"#myCarousel" + (key + 1) + "\" data-slide-to=\"0\" class=\"active\"></li>\n                            <li data-target=\"#myCarousel" + (key + 1) + "\" data-slide-to=\"1\"></li>\n                            <li data-target=\"#myCarousel" + (key + 1) + "\" data-slide-to=\"2\"></li>\n                            <li data-target=\"#myCarousel" + (key + 1) + "\" data-slide-to=\"3\"></li>\n                        </ol>\n                        <div class=\"carousel-inner\" role=\"listbox\">\n                            <div class=\"item active\">\n                                <img src=\"./images/img-p" + (key + 1) + "/1.jpg\" alt=\"anh1\" style=\"width:100%;\">\n                            </div>\n                            <div class=\"item\">\n                                <img src=\"./images/img-p" + (key + 1) + "/2.jpg\" alt=\"anh2\" style=\"width:100%;\">\n                            </div>\n                            <div class=\"item\">\n                                <img src=\"./images/img-p" + (key + 1) + "/3.jpg\" alt=\"anh3\" style=\"width:100%;\">\n                            </div>\n                            <div class=\"item\">\n                                <img src=\"./images/img-p" + (key + 1) + "/4.jpg\" alt=\"anh3\" style=\"width:100%;\">\n                            </div>\n                        </div>\n                        <a class=\"left carousel-control\" href=\"#myCarousel" + (key + 1) + "\" role=\"button\" data-slide=\"prev\">\n                            <span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\"></span>\n                            <span class=\"sr-only\">Previous</span>\n                        </a>\n                        <a class=\"right carousel-control\" href=\"#myCarousel" + (key + 1) + "\" role=\"button\" data-slide=\"next\">\n                            <span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span>\n                            <span class=\"sr-only\">Next</span>\n                        </a>\n                    </div>\n                </div>\n                <div class=\"content-right col-xs-12 col-sm-7 col-md-8\">\n                    <div class=\"content-right1 col-xs-12 col-md-8\">\n                    <div class=\"item-cr1 title\">\n                      <a data-toggle=\"collapse\" data-target=\"#content-detail" + (key + 1) + "\">" + value.title + "</a>\n                    </div>\n                    <div class=\"item-cr1 summarize-desc\">\n                      <p>" + value.summary + "</p>\n                    </div>\n                    <div class=\"item-cr1 local\">Khu v\u1EF1c: <span>" + value.locale + "</span></div>\n                    <div class=\"item-cr1 area\">Di\u1EC7n t\xEDch: <span>" + value.area + "</span></div>\n                    <div class=\"item-cr1 date\">Ng\xE0y \u0111\u0103ng: <span>" + value.post_date + "</span></div>\n                    </div>\n                    <div class=\"content-right2 col-xs-12 col-md-4\">\n                    <p class=\"hide_op\">GI\xC1 D\u1ECACH V\u1EE4:</p>\n                    <ul>\n                        <li class=\"item-cr1 water-price hide_op\"><i class=\"fa fa-shower\"></i> N\u01B0\u1EDBc: <span>" + value.price_w + "</span></li>\n                        <li class=\"item-cr1 electric-price hide_op\"><i class=\"fa fa-bolt\"></i> \u0110i\u1EC7n: <span>" + value.price_e + "</span></li>\n                        <li class=\"item-cr1 internet-price hide_op\"><i class=\"fa fa-wifi\"></i> M\u1EA1ng: <span>" + value.price_i + "</span></li>\n                        <li class=\"item-cr1 park-price hide_op\"><i class=\"fa fa-motorcycle\"></i> G\u1EEDi xe: <span>" + value.price_p + "</span></li>\n                        <li class=\"item-cr1 price\"><i class=\"fa fa-money\"></i> Ph\xF2ng: <span>" + value.price + "</span></li>\n                        <li class=\"item-cr1 phone\"><i class=\"fa fa-phone\"></i> LH: <span>" + value.phone + "</span></li>\n                    </ul>\n                    <button class=\"button-detail\" data-toggle=\"collapse\" data-target=\"#content-detail" + (key + 1) + "\"><i class=\"fa fa-arrow-right\"></i> Xem chi ti\u1EBFt</button>\n                    </div>\n                    <div class=\"clear\"></div>\n                </div>\n                <div class=\"clear\"></div>\n                <!--Th\xF4ng tin xem chi ti\u1EBFt-->\n                <article id=\"content-detail" + (key + 1) + "\" class=\"content-detail collapse\">\n                    <div class=\"menu-detail\"><!-- Navs Tabs-->\n                        <button class=\"btn-close button-detail\" data-toggle=\"collapse\" data-target=\"#content-detail" + (key + 1) + "\">\n                            <i class=\"fa fa-times\"></i> \u0110\xF3ng\n                        </button>\n                        <ul class=\"nav nav-tabs\">\n                            <li class=\"active\"><a data-toggle=\"tab\" href=\"#menu1_" + (key + 1) + "\">TH\xD4NG TIN CHUNG</a></li>\n                            <li><a data-toggle=\"tab\" href=\"#menu2_" + (key + 1) + "\">M\xD4 T\u1EA2 CHI TI\u1EBET</a></li>\n                            <li><a data-toggle=\"tab\" href=\"#menu3_" + (key + 1) + "\">H\xCCNH \u1EA2NH</a></li>\n                            <li class = \"img-360" + (key + 1) + "\"><a data-toggle=\"tab\" href=\"#menu5_" + (key + 1) + "\">\u1EA2NH 360<sup>o</sup></a></li>\n                            <li class=\"position item" + (key + 1) + "\"><a data-toggle=\"tab\" href=\"#menu4_" + (key + 1) + "\">V\u1ECA TR\xCD</a></li>\n                        </ul>\n                        <!-- Content navs tabs-->\n                        <div class=\"tab-content\">\n                            <div id=\"menu1_" + (key + 1) + "\" class=\"tab-pane fade in active\" style=\"overflow-x:auto;\">\n                                <table class=\"table table-bordered\">\n                                    <tbody>\n                                        <tr>\n                                            <td style=\"font-weight: bold\">\u0110\u1ECBa ch\u1EC9</td>\n                                            <td colspan=\"3\" >" + value.add + "</td>\n                                        </tr>\n                                        <tr>\n                                            <th>Lo\u1EA1i h\xECnh cho thu\xEA</th>\n                                            <td>Chung c\u01B0 mini</td>\n                                            <th>Ng\xE0y c\u1EADp nh\u1EADt</th>\n                                            <td>" + value.post_date + "</td>\n                                        </tr>\n                                        <tr>\n                                            <th>Ng\u01B0\u1EDDi \u0111\u0103ng</th>\n                                            <td>Tr\u1ECBnh C\xF4ng Tr\xECnh</td>\n                                            <th>\u0110i\u1EC7n tho\u1EA1i</th>\n                                            <td>" + value.phone + "</td>\n                                        </tr>\n                                        <tr>\n                                            <th>Email</th>\n                                            <td>congtrinh0209@gmail.com</td>\n                                            <th>ADSDSDAS</th>\n                                            <td>dddddd\u0111</td>\n                                        </tr>\n                                        <tr>\n                                            <th>Di\u1EC7n t\xEDch</th>\n                                            <td>" + value.area + "</td>\n                                            <th>Gi\xE1 cho thu\xEA</th>\n                                            <td>" + value.price + "</td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                            <div id=\"menu2_" + (key + 1) + "\" class=\"tab-pane fade\">\n                                <div class=\"des-detail-content\">\n                                  <p>" + value.content + "</p>\n                                </div>\n                            </div>\n                            <div id=\"menu3_" + (key + 1) + "\" class=\"tab-pane fade\">\n                                <div class=\"image-item\">\n                                    <div id=\"myCarousel2_" + (key + 1) + "\" class=\"carousel slide slide2\" data-ride=\"carousel\">\n                                        <!-- Indicators -->\n                                        <ol class=\"carousel-indicators\">\n                                            <li data-target=\"#myCarousel2_" + (key + 1) + "\" data-slide-to=\"0\" class=\"active\"></li>\n                                            <li data-target=\"#myCarousel2_" + (key + 1) + "\" data-slide-to=\"1\"></li>\n                                            <li data-target=\"#myCarousel2_" + (key + 1) + "\" data-slide-to=\"2\"></li>\n                                            <li data-target=\"#myCarousel2_" + (key + 1) + "\" data-slide-to=\"3\"></li>\n                                        </ol>\n                                        <!-- Wrapper for slides -->\n                                        <div class=\"carousel-inner\" role=\"listbox\">\n                                            <div class=\"item active\">\n                                                <img src=\"./images/img-p" + (key + 1) + "/1.jpg\" alt=\"anh1\" style=\"height: 400px; width: 100%\">\n                                            </div>\n                                            <div class=\"item\">\n                                                <img src=\"./images/img-p" + (key + 1) + "/2.jpg\" alt=\"anh2\" style=\"height: 400px; width: 100%\">\n                                            </div>\n                                            <div class=\"item\">\n                                                <img src=\"./images/img-p" + (key + 1) + "/3.jpg\" alt=\"anh3\" style=\"height:400px;width: 100%\">\n                                            </div>\n                                            <div class=\"item\">\n                                                <img src=\"./images/img-p" + (key + 1) + "/4.jpg\" alt=\"anh4\" style=\"height: 400px; width: 100%\">\n                                            </div>\n                                        </div>\n                                        <!-- Left and right controls -->\n                                        <a class=\"left carousel-control\" href=\"#myCarousel2_" + (key + 1) + "\" role=\"button\" data-slide=\"prev\">\n                                            <span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\"></span>\n                                            <span class=\"sr-only\">Previous</span>\n                                        </a>\n                                        <a class=\"right carousel-control\" href=\"#myCarousel2_" + (key + 1) + "\" role=\"button\" data-slide=\"next\">\n                                            <span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span>\n                                            <span class=\"sr-only\">Next</span>\n                                        </a>\n                                    </div>\n                                </div>\n                            </div>\n                            <div id=\"menu4_" + (key + 1) + "\" class=\"tab-pane fade\" style=\"position: relative;\">\n                                <div class=\"des-detail-content\">\n                                    <p style=\"color: green\">Click v\xE0o \u0111\u1ECBa \u0111i\u1EC3m \u0111\u1EC3 nh\u1EADn ch\u1EC9 \u0111\u01B0\u1EDDng!</p>\n                                    <div id=\"googleMap" + (key + 1) + "\" style=\"width:100%;height:400px;\"></div>\n                                    <div class=\"right-panel\" id=\"right-panel" + (key + 1) + "\">\n                                        <select class=\"near_by_item\" id=\"select_item" + (key + 1) + "\">\n                                            <option>\u0110\u1ECBa \u0111i\u1EC3m l\xE2n c\u1EADn</option>\n                                            <option>Tr\u01B0\u1EDDng C\u0110, \u0110H</option>\n                                            <option>\u0110i\u1EC3m bu\xFDt</option>\n                                            <option>B\u1EC7nh vi\u1EC7n</option>\n                                            <option>B\xE3i g\u1EEDi xe</option>\n                                        </select>\n                                        <ul class=\"places\" id=\"place" + (key + 1) + "\"></ul>\n                                    </div>\n                                </div>\n                            </div>\n                            <div id=\"menu5_" + (key + 1) + "\" class=\"tab-pane fade\">\n                               <div id=\"panorama" + (key + 1) + "\" class=\"panorama\"></div>\n                            </div>\n                        </div>\n                    </div>\n                </article>\n            </div>";
                    $(".wrap-content").html(content_new);
                }
            });
        }
        pagination(0, nper_page);
        if (number_page <= 5) {
            $(".page").each(function (key, value) {
                if (key > number_page - 1) {
                    $(value).css("display", "none");
                }
            });
            $(".first").addClass("disabled");
            $(".last").addClass("disabled");
        }
        //Hàm phân số thứ tự trang
        function stt_page() {
            $(".page0").children().html(stt_b);
            $(".page_2").children().html(stt_b - 2);
            $(".page_1").children().html(stt_b - 1);
            $(".page1").children().html(stt_b + 1);
            $(".page2").children().html(stt_b + 2);
        }
        $(".page>a").click(function () {
            var page_first = Number($(".page_2>a").html());
            var page_last = Number($(".page2>a").html());
            var page = Number(this.innerText);
            var a = (page - 1) * nper_page;
            var b = page * nper_page;
            $(".page").removeClass("active");
            if (page > 2 && page < number_page - 1) {
                stt_b = page;
                stt_page();
                $(".page0").addClass("active");
                pagination(a, b);
            }
            // Trường hợp trang thứ 2 và trang gần cuối
            else if (page == 2 && page_first == page) {
                    $(".page>a").each(function (index, value) {
                        $(value).html(Number($(value).html()) - 1);
                    });
                    $(".page_1").addClass("active");
                    pagination(a, b);
                } else if (page == number_page - 1 && page == page_last) {
                    $(".page>a").each(function (index, value) {
                        $(value).html(Number($(value).html()) + 1);
                    });
                    $(".page1").addClass("active");
                    pagination(a, b);
                } else {
                    $(this).parent().addClass("active");
                    pagination(a, b);
                }
        });
        // Hàm load cho First-box và Last-box
        $(".first>a").click(function () {
            stt_b = 3;
            stt_page();
            pagination(0, nper_page);
            $(".page").removeClass("active");
            $(".page_2").addClass("active");
        });
        $(".last>a").click(function () {
            stt_b = number_page - 2;
            stt_page();
            pagination((number_page - 1) * nper_page, length_arr);
            $(".page").removeClass("active");
            $(".page2").addClass("active");
        });
    });
});