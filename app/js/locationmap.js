"use strict";

// Load bản đồ cho mỗi tin đăng
function load_map() {
    $.getJSON("./data.json", function (data) {
        $.each(data.news, function (key, value) {
            var selector_position = ".position.item" + (key + 1);
            var coor_lat = value.coordinate_lat;
            var coor_long = value.coordinate_long;
            $(selector_position).click(function () {
                var mapholder = document.getElementById("googleMap" + (key + 1));
                // Thông báo trình duyệt không hỗ trợ googlemap
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition, showError);
                } else {
                    mapholder.innerHTML = "Geolocation không hỗ trợ trên trình duyệt này.";
                }
                function showPosition(position, item) {
                    // Vị trí center cho map = vị trí địa điểm
                    var myOptions = {
                        center: { lat: coor_lat, lng: coor_long },
                        zoom: 16,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        mapTypeControl: true
                    };
                    var map = new google.maps.Map(mapholder, myOptions); // Hiển thị map
                    // Tọa độ vị trí người dùng
                    var lat = position.coords.latitude;
                    var lon = position.coords.longitude;
                    var latlon = new google.maps.LatLng(lat, lon); // Hiển thị vị trí người dùng trên map
                    // Marker cho vị trí người dùng
                    var marker = new google.maps.Marker({
                        position: latlon,
                        map: map,
                        title: "Vị trí của bạn!",
                        icon: 'https://congtrinh0209.github.io/Du_anTN/IMG/position-marker.png',
                        draggable: false
                    });
                    // Marker cho địa điểm
                    var marker2 = new google.maps.Marker({
                        position: { lat: coor_lat, lng: coor_long },
                        icon: 'https://congtrinh0209.github.io/Du_anTN/IMG/house-marker2.png',
                        map: map,
                        title: "Chỉ đường tới đây",
                        draggable: false
                    });
                    // Tạo vòng tròn đánh dấu địa điểm
                    var myCity = new google.maps.Circle({
                        center: { lat: coor_lat, lng: coor_long },
                        radius: 60,
                        strokeColor: "#E74C3C",
                        strokeOpacity: 0.5,
                        strokeWeight: 2,
                        fillColor: "#E74C3C",
                        fillOpacity: 0.3
                    });
                    myCity.setMap(map);
                    // Chỉ đường từ vị trí người dùng đến địa điểm tìm kiếm
                    marker2.addListener('click', function () {
                        var directionsService = new google.maps.DirectionsService();
                        var directionsDisplay = new google.maps.DirectionsRenderer({
                            map: map
                        });
                        // get route from A to B
                        function calculateAndDisplayRoute(directionsService, directionsDisplay) {
                            directionsService.route({
                                origin: latlon,
                                destination: { lat: coor_lat, lng: coor_long },
                                avoidTolls: true,
                                avoidHighways: false,
                                travelMode: google.maps.TravelMode.DRIVING
                            }, function (response, status) {
                                if (status == google.maps.DirectionsStatus.OK) {
                                    directionsDisplay.setDirections(response);
                                } else {
                                    window.alert('Directions request failed due to ' + status);
                                }
                            });
                        }
                        calculateAndDisplayRoute(directionsService, directionsDisplay);
                    });
                    /***********Địa điểm lân cận*************/
                    function search_nearby_item(item) {
                        var pyrmont = { lat: coor_lat, lng: coor_long };
                        var service = new google.maps.places.PlacesService(map);
                        service.nearbySearch({
                            location: pyrmont,
                            radius: 1000,
                            type: [item]
                        }, processResults);
                    }
                    function processResults(results, status, pagination) {
                        if (status !== google.maps.places.PlacesServiceStatus.OK) {
                            return;
                        } else {
                            createMarkers(results);
                        }
                    }
                    function createMarkers(places) {
                        var bounds = new google.maps.LatLngBounds();
                        var placesList = document.getElementById("place" + (key + 1));
                        for (var i = 0, place; place = places[i]; i++) {
                            var image = {
                                url: place.icon,
                                size: new google.maps.Size(71, 71),
                                origin: new google.maps.Point(0, 0),
                                anchor: new google.maps.Point(17, 34),
                                scaledSize: new google.maps.Size(15, 15)
                            };
                            var marker = new google.maps.Marker({
                                map: map,
                                icon: image,
                                title: place.name,
                                position: place.geometry.location
                            });
                            placesList.innerHTML += '<li>' + place.name + '</li>';
                            bounds.extend(place.geometry.location);
                        }
                        map.fitBounds(bounds);
                    }
                    $("#select_item" + (key + 1)).click(function () {
                        document.getElementById("place" + (key + 1)).innerHTML = " ";
                        if ($("#select_item" + (key + 1)).val() == "Trường CĐ, ĐH") {
                            search_nearby_item("university");
                        } else if ($("#select_item" + (key + 1)).val() == "Điểm buýt") {
                            search_nearby_item("bus_station");
                        } else if ($("#select_item" + (key + 1)).val() == "Bệnh viện") {
                            search_nearby_item("hospital");
                        } else if ($("#select_item" + (key + 1)).val() == "Bãi gửi xe") {
                            search_nearby_item("parking");
                        }
                    });
                }
                // Thông báo các lỗi liên quan đến map
                function showError(error) {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            mapholder.innerHTML = "Chia sẻ vị trí chưa được kích hoạt.";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            mapholder.innerHTML = "Không có thông tin vị trí.";
                            break;
                        case error.TIMEOUT:
                            mapholder.innerHTML = "The request to get user location timed out.";
                            break;
                        case error.UNKNOWN_ERROR:
                            mapholder.innerHTML = "An unknown error occurred.";
                            break;
                    }
                }
            });
        });
    });
}
// Load bản đồ tìm kiếm quanh đây
function search_locale() {
    var x = document.getElementById("mapholder");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Geolocation không hỗ trợ trên trình duyệt này.";
    }
    function showPosition(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var lat_pst1 = position.coords.latitude + 0.001;
        var lon_pst1 = position.coords.longitude + 0.001;
        var lat_pst2 = position.coords.latitude - 0.001;
        var lon_pst2 = position.coords.longitude + 0.002;
        var lat_pst3 = position.coords.latitude - 0.001;
        var lon_pst3 = position.coords.longitude + 0.001;
        var lat_pst4 = position.coords.latitude + 0.003;
        var lon_pst4 = position.coords.longitude + 0.002;
        var lat_pst5 = position.coords.latitude - 0.002;
        var lon_pst5 = position.coords.longitude;
        var latlon = new google.maps.LatLng(lat, lon);
        var mapholder = document.getElementById('mapholder');
        mapholder.style.height = '500px';
        mapholder.style.width = '100%';
        var myOptions = {
            center: latlon,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL }
        };
        var map = new google.maps.Map(document.getElementById("mapholder"), myOptions);
        var marker = new google.maps.Marker({
            position: latlon,
            map: map,
            title: "Vị trí của bạn!",
            icon: 'https://congtrinh0209.github.io/Du_anTN/IMG/position-marker.png',
            draggable: false,
            animation: google.maps.Animation.DROP
        });
        marker.addListener('click', toggleBounce);
        function toggleBounce() {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        }
        /**** Circle position center*****/
        var myCity = new google.maps.Circle({
            center: latlon,
            radius: parseFloat($('.input-radius').val()),
            strokeColor: "#0000FF",
            strokeOpacity: 0.3,
            strokeWeight: 2,
            fillColor: "#0000FF",
            fillOpacity: 0.2
        });
        myCity.setMap(map);

        /**** Add Marker nearby position*****/
        var iconBase = 'https://congtrinh0209.github.io/Du_anTN/IMG/';
        var icons = {
            house: {
                icon: iconBase + 'house-marker2.png'
            },
            room: {
                icon: iconBase + 'room-marker2.png'
            },
            store: {
                icon: iconBase + 'store-marker2.png'
            },
            flat: {
                icon: iconBase + 'flat-marker2.png'
            }
        };
        var features = [{
            position: new google.maps.LatLng(lat_pst1, lon_pst1),
            type: 'room',
            content: '<div class="container-locale"><div class="content-left-locale"><img src="https://congtrinh0209.github.io/Du_anTN/IMG/img-p1/1.jpg"></div><div class="content-right-locale"><p>NHÀ TÔI CHÍNH CHỦ CHO THUÊ PHÒNG TRỌ TẠI SỐ 32 THỂ GIAO - LÊ ĐẠI HÀNH - QUẬN HAI BÀ TRƯNG</p><p>Diện tích: 45m²</p><p>Giá: 3 triệu/tháng</p><button class="btn-locale"><a href="#locale1">Xem phòng</a></button></div><div class="clear"></div></div>',
            title: "Diện tích: 45m2 + Giá:3tr/tháng"
        }, {
            position: new google.maps.LatLng(lat_pst2, lon_pst2),
            type: 'flat',
            content: '<div class="container-locale"><div class="content-left-locale"><img src="https://congtrinh0209.github.io/Du_anTN/IMG/123.jpg"></div><div class="content-right-locale"><p>CHO THUÊ CĂN HỘ TẠI SỐ 41B - NGUYỄN ĐÌNH CHIỂU - LÊ ĐẠI HÀNH - QUẬN HAI BÀ TRƯNG</p><p>Diện tích: 35m²</p><p>Giá: 2 triệu/tháng</p><button class="btn-locale"><a href="#locale2">Xem phòng</a></button></div><div class="clear"></div></div>',
            title: "Diện tích: 35m2 + Giá:2tr/tháng"
        }, {
            position: new google.maps.LatLng(lat_pst3, lon_pst3),
            type: 'store',
            content: '<div class="container-locale"><div class="content-left-locale"><img src="https://congtrinh0209.github.io/Du_anTN/IMG/img-p2/1.jpg"></div><div class="content-right-locale"><p>CHO THUÊ MẶT BẰNG KINH DOANH TẠI SỐ 266 BÀ TRIỆU- LÊ ĐẠI HÀNH - QUẬN HAI BÀ TRƯNG</p><p>Diện tích: 20m²</p><p>Giá: 1,5 triệu/tháng</p><button class="btn-locale"><a href="#locale1">Xem phòng</a></button></div><div class="clear"></div></div>',
            title: "Diện tích: 20m2 + Giá:1,5tr/tháng"
        }, {
            position: new google.maps.LatLng(lat_pst4, lon_pst4),
            type: 'house',
            content: '<div class="container-locale"><div class="content-left-locale"><img src="https://congtrinh0209.github.io/Du_anTN/IMG/img-p3/1.jpg"></div><div class="content-right-locale"><p>CHO THUÊ NHÀ RIÊNG TẠI SỐ 135-BÙI THỊ XUÂN- QUẬN HAI BÀ TRƯNG</p><p>Diện tích: 25m²</p><p>Giá: 1,8 triệu/tháng</p><button class="btn-locale"><a href="#locale2">Xem phòng</a></button></div><div class="clear"></div></div>',
            title: "Diện tích: 25m2 + Giá:1,8tr/tháng"
        }, {
            position: new google.maps.LatLng(lat_pst5, lon_pst5),
            type: 'house',
            content: '<div class="container-locale"><div class="content-left-locale"><img src="https://congtrinh0209.github.io/Du_anTN/IMG/img-p1/1.jpg"></div><div class="content-right-locale"><p> 41B - NGUYỄN ĐÌNH CHIỂU - QUẬN HAI BÀ TRƯNG</p><p>Diện tích: 15m²</p><p>Giá: 1,2 triệu/tháng</p><button class="btn-locale"><a href="#locale1">Xem phòng</a></button></div><div class="clear"></div></div>',
            title: "Diện tích: 15m2 + Giá:1,2tr/tháng"
        }];
        /*******Create markers and Content when click marker********/
        features.forEach(function (feature) {
            var marker = new google.maps.Marker({
                position: feature.position,
                icon: icons[feature.type].icon,
                map: map,
                title: feature.title
            });
            var infowindow = new google.maps.InfoWindow({
                content: feature.content
            });
            marker.addListener('click', function () {
                infowindow.open(map, marker); /********Hiển thị content**********/
                /***********Chỉ đường*************/
                directionsService = new google.maps.DirectionsService();
                directionsDisplay = new google.maps.DirectionsRenderer({
                    map: map
                });
                // get route from A to B
                var pointB = feature.position;
                calculateAndDisplayRoute(directionsService, directionsDisplay, latlon, pointB);
                function calculateAndDisplayRoute(directionsService, directionsDisplay, latlon, pointB) {
                    directionsService.route({
                        origin: latlon,
                        destination: pointB,
                        avoidTolls: true,
                        avoidHighways: false,
                        travelMode: google.maps.TravelMode.DRIVING
                    }, function (response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                        } else {
                            window.alert("Directions request failed due to " + status);
                        }
                    });
                }
            });
        });
    }
    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                x.innerHTML = "User denied the request for Geolocation.";
                break;
            case error.POSITION_UNAVAILABLE:
                x.innerHTML = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                x.innerHTML = "The request to get user location timed out.";
                break;
            case error.UNKNOWN_ERROR:
                x.innerHTML = "An unknown error occurred.";
                break;
        }
    }
}
$(".search_nearby").click(function () {
    $(".search_place").css("display", "block");
    $(".nav-text").css("display", "none");
    search_locale();
});

$(document).ready(function () {
    load_map();
});
$(".page>a").click(function () {
    load_map();
});