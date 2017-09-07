$(document).ready(function() {
    $.getJSON("./data.json", (data) => {
        let content_new = "";
        $.each(data.news, (key, value) => {
            content_new += `<div class="content" id="content${key+1}">
                <div id="content-left" class="col-xs-12 col-sm-5 col-md-4">
                    <div id="myCarousel" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                            <li data-target="#myCarousel" data-slide-to="1"></li>
                            <li data-target="#myCarousel" data-slide-to="2"></li>
                            <li data-target="#myCarousel" data-slide-to="3"></li>
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
                        <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                </div>
                <div id="content-right" class="col-xs-12 col-sm-7 col-md-8">
                    <div class="content-right1 col-xs-12 col-md-8">
                    <div class="item-cr1 title">
                      <a data-toggle="collapse" data-target="#content-detail"><p>${value.title}</p></a>
                    </div>
                    <div class="item-cr1 summarize-desc">
                      <p>${value.summary}</p>
                    </div>
                    <div class="item-cr1 local">Khu vực: <span>${value.add}</span></div>
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
                    <button class="button-detail" data-toggle="collapse" data-target="#content-detail"><i class="fa fa-arrow-right"></i> Xem chi tiết</button>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="clear"></div>
            </div>`;
        });
        $(".main-content").html(content_new);
    });
});