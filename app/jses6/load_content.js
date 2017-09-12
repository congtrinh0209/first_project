$(document).ready(function() {
    $.getJSON("./data.json", (data) => {
        let content_new = "";
        $.each(data.news, (key, value) => {
            content_new += `<div class="content" id="content${key + 1}">
                <div class="content-left col-xs-12 col-sm-5 col-md-4">
                    <div id="myCarousel${key + 1}" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                            <li data-target="#myCarousel${key + 1}" data-slide-to="0" class="active"></li>
                            <li data-target="#myCarousel${key + 1}" data-slide-to="1"></li>
                            <li data-target="#myCarousel${key + 1}" data-slide-to="2"></li>
                            <li data-target="#myCarousel${key + 1}" data-slide-to="3"></li>
                        </ol>
                        <div class="carousel-inner" role="listbox">
                            <div class="item active">
                                <img src="./images/img-p${key + 1}/1.jpg" alt="anh1" style="width:100%;">
                            </div>
                            <div class="item">
                                <img src="./images/img-p${key + 1}/2.jpg" alt="anh2" style="width:100%;">
                            </div>
                            <div class="item">
                                <img src="./images/img-p${key + 1}/3.jpg" alt="anh3" style="width:100%;">
                            </div>
                            <div class="item">
                                <img src="./images/img-p${key + 1}/4.jpg" alt="anh3" style="width:100%;">
                            </div>
                        </div>
                        <a class="left carousel-control" href="#myCarousel${key + 1}" role="button" data-slide="prev">
                            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="right carousel-control" href="#myCarousel${key + 1}" role="button" data-slide="next">
                            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                </div>
                <div class="content-right col-xs-12 col-sm-7 col-md-8">
                    <div class="content-right1 col-xs-12 col-md-8">
                    <div class="item-cr1 title">
                      <a data-toggle="collapse" data-target="#content-detail${key + 1}"><p>${value.title}</p></a>
                    </div>
                    <div class="item-cr1 summarize-desc">
                      <p>${value.summary}</p>
                    </div>
                    <div class="item-cr1 local">Khu vực: <span>${value.locale}</span></div>
                    <div class="item-cr1 area">Diện tích: <span>${value.area}</span></div>
                    <div class="item-cr1 date">Ngày đăng: <span>${value.post_date}</span></div>
                    </div>
                    <div class="content-right2 col-xs-12 col-md-4">
                    <p class="hide_op">GIÁ DỊCH VỤ:</p>
                    <ul>
                        <li class="item-cr1 water-price hide_op"><i class="fa fa-shower"></i> Nước: <span>${value.price_w}</span></li>
                        <li class="item-cr1 electric-price hide_op"><i class="fa fa-bolt"></i> Điện: <span>${value.price_e}</span></li>
                        <li class="item-cr1 internet-price hide_op"><i class="fa fa-wifi"></i> Mạng: <span>${value.price_i}</span></li>
                        <li class="item-cr1 park-price hide_op"><i class="fa fa-motorcycle"></i> Gửi xe: <span>${value.price_p}</span></li>
                        <li class="item-cr1 price"><i class="fa fa-money"></i> Phòng: <span>${value.price}</span></li>
                        <li class="item-cr1 phone"><i class="fa fa-phone"></i> LH: <span>${value.phone}</span></li>
                    </ul>
                    <button class="button-detail" data-toggle="collapse" data-target="#content-detail${key + 1}"><i class="fa fa-arrow-right"></i> Xem chi tiết</button>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="clear"></div>
                 <!--Thông tin xem chi tiết-->
                <article id="content-detail${key + 1}" class="content-detail collapse">
                    <div class="menu-detail"><!-- Navs Tabs-->
                        <button class="btn-close button-detail" data-toggle="collapse" data-target="#content-detail${key + 1}">
                            <i class="fa fa-times"></i> Đóng
                        </button>
                        <ul class="nav nav-tabs">
                            <li class="active"><a data-toggle="tab" href="#menu1_${key + 1}">THÔNG TIN CHUNG</a></li>
                            <li><a data-toggle="tab" href="#menu2_${key + 1}">MÔ TẢ CHI TIẾT</a></li>
                            <li><a data-toggle="tab" href="#menu3_${key + 1}">HÌNH ẢNH</a></li>
                            <li><a data-toggle="tab" href="#menu5_${key + 1}">ẢNH 360<sup>o</sup></a></li>
                            <li class="position item1"><a data-toggle="tab" href="#menu4_${key + 1}">VỊ TRÍ</a></li>
                        </ul>
                        <!-- Content navs tabs-->
                        <div class="tab-content">
                            <div id="menu1_${key + 1}" class="tab-pane fade in active" style="overflow-x:auto;">
                                <table class="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td style="font-weight: bold">Địa chỉ</td>
                                            <td colspan="3" >${value.add}</td>
                                        </tr>
                                        <tr>
                                            <th>Loại hình cho thuê</th>
                                            <td>Chung cư mini</td>
                                            <th>Ngày cập nhật</th>
                                            <td>${value.post_date}</td>
                                        </tr>
                                        <tr>
                                            <th>Người đăng</th>
                                            <td>Trịnh Công Trình</td>
                                            <th>Điện thoại</th>
                                            <td>${value.phone}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>congtrinh0209@gmail.com</td>
                                            <th>ADSDSDAS</th>
                                            <td>ddddddđ</td>
                                        </tr>
                                        <tr>
                                            <th>Diện tích</th>
                                            <td>${value.area}</td>
                                            <th>Giá cho thuê</th>
                                            <td>${value.price}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div id="menu2_${key + 1}" class="tab-pane fade">
                                <div class="des-detail-content">
                                  <p>${value.content}</p>
                                </div>
                            </div>
                            <div id="menu3_${key + 1}" class="tab-pane fade">
                                <div class="image-item">
                                    <div id="myCarousel2_${key + 1}" class="carousel slide slide2" data-ride="carousel">
                                        <!-- Indicators -->
                                        <ol class="carousel-indicators">
                                            <li data-target="#myCarousel2_${key + 1}" data-slide-to="0" class="active"></li>
                                            <li data-target="#myCarousel2_${key + 1}" data-slide-to="1"></li>
                                            <li data-target="#myCarousel2_${key + 1}" data-slide-to="2"></li>
                                            <li data-target="#myCarousel2_${key + 1}" data-slide-to="3"></li>
                                        </ol>
                                        <!-- Wrapper for slides -->
                                        <div class="carousel-inner" role="listbox">
                                            <div class="item active">
                                                <img src="./images/img-p${key + 1}/1.jpg" alt="anh1" style="height: 400px; width: 100%">
                                            </div>
                                            <div class="item">
                                                <img src="./images/img-p${key + 1}/2.jpg" alt="anh2" style="height: 400px; width: 100%">
                                            </div>
                                            <div class="item">
                                                <img src="./images/img-p${key + 1}/3.jpg" alt="anh3" style="height:400px;width: 100%">
                                            </div>
                                            <div class="item">
                                                <img src="./images/img-p${key + 1}/4.jpg" alt="anh4" style="height: 400px; width: 100%">
                                            </div>
                                        </div>
                                        <!-- Left and right controls -->
                                        <a class="left carousel-control" href="#myCarousel2_${key + 1}" role="button" data-slide="prev">
                                            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                                            <span class="sr-only">Previous</span>
                                        </a>
                                        <a class="right carousel-control" href="#myCarousel2_${key + 1}" role="button" data-slide="next">
                                            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                                            <span class="sr-only">Next</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div id="menu4_${key + 1}" class="tab-pane fade" style="position: relative;">
                                <div class="des-detail-content">
                                    <p style="color: green">Bật định vị để sử dụng được tính năng này</p>
                                    <div id="googleMap1" style="width:100%;height:400px;"></div>
                                    <div id="right-panel">
                                        <select class="near_by_item">
                                            <option>Địa điểm lân cận</option>
                                            <option>Trường CĐ, ĐH</option>
                                            <option>Điểm buýt</option>
                                            <option>Bệnh viện</option>
                                            <option>Bãi gửi xe</option>
                                        </select>
                                        <ul id="places"></ul>
                                    </div>
                                </div>
                            </div>
                            <div id="menu5_${key + 1}" class="tab-pane fade">
                                <p style="color: green">Tính năng này hiện chỉ hỗ trợ trên Chrome Browser</p>
                                <div id="panorama1" class="panorama"></div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>`;
        });
        $(".main-content").html(content_new);
    });
});