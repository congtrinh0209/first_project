function load_map () {
    $.getJSON("./data.json", (data) => {
        $.each(data.news, (key, value) => {
            var selector_position = `.position.item${key + 1}`;
            const coor_lat = value.coordinate_lat;
            const coor_long = value.coordinate_long;
            $(selector_position).click(function () {
                let mapholder = document.getElementById(`googleMap${key + 1}`);
                // Thông báo với trình duyệt không hỗ trợ googlemap
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition, showError);
                } else {
                    mapholder.innerHTML = "Geolocation không hỗ trợ trên trình duyệt này.";
                }
                function showPosition(position, item) {
                    // Vị trí center cho map = vị trí địa điểm
                    let myOptions = {
                        center: {lat: coor_lat, lng: coor_long},
                        zoom: 16,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        mapTypeControl: true
                    };
                    let map = new google.maps.Map(mapholder, myOptions); // Hiển thị map
                    // Tọa độ vị trí người dùng
                    let lat = position.coords.latitude;
                    let lon = position.coords.longitude;
                    let latlon = new google.maps.LatLng(lat, lon); // Hiển thị vị trí người dùng trên map
                    // Marker cho vị trí người dùng
                    let marker = new google.maps.Marker({
                        position: latlon,
                        map: map,
                        title: "Vị trí của bạn!",
                        icon: 'https://congtrinh0209.github.io/Du_anTN/IMG/position-marker.png',
                        draggable: false,
                    });
                    // Marker cho địa điểm
                    let marker2 = new google.maps.Marker({
                        position: {lat: coor_lat, lng: coor_long},
                        icon: 'https://congtrinh0209.github.io/Du_anTN/IMG/house-marker2.png',
                        map: map,
                        title: "Chỉ đường tới đây",
                        draggable: false,
                    });
                    // Tạo vòng tròn đánh dấu địa điểm
                    let myCity = new google.maps.Circle({
                        center: {lat: coor_lat, lng: coor_long},
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
                        let directionsService = new google.maps.DirectionsService;
                        let directionsDisplay = new google.maps.DirectionsRenderer({
                            map: map
                        });
                        // get route from A to B
                        function calculateAndDisplayRoute(directionsService, directionsDisplay) {
                            directionsService.route(
                                {
                                    origin: latlon,
                                    destination: {lat: coor_lat, lng: coor_long},
                                    avoidTolls: true,
                                    avoidHighways: false,
                                    travelMode: google.maps.TravelMode.DRIVING
                                },
                                function (response, status) {
                                    if (status == google.maps.DirectionsStatus.OK) {
                                        directionsDisplay.setDirections(response);
                                    } else {
                                        window.alert('Directions request failed due to ' + status);
                                    }
                                }
                            );
                        }
                        calculateAndDisplayRoute(directionsService, directionsDisplay);
                    });
                    /***********Địa điểm lân cận*************/
                    function search_nearby_item(item) {
                        var pyrmont = {lat: coor_lat, lng: coor_long};
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
                        var placesList = document.getElementById(`place${key + 1}`);
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
                    $(`#select_item${key + 1}`).click(function() {
                        document.getElementById(`place${key + 1}`).innerHTML = " ";
                        if ($(`#select_item${key + 1}`).val() == "Trường CĐ, ĐH"){
                            search_nearby_item("university");
                        }
                        else if ($(`#select_item${key + 1}`).val() == "Điểm buýt"){
                            search_nearby_item("bus_station");
                        }
                        else if ($(`#select_item${key + 1}`).val() == "Bệnh viện"){
                            search_nearby_item("hospital");
                        }
                        else if ($(`#select_item${key + 1}`).val() == "Bãi gửi xe"){
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
$(document).ready(function () {
    load_map();
});
$(".page>a").click(function () {
    load_map();
});

