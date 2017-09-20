"use strict";

//  Demo tính năng xem ảnh dạng 360 tour sử dụng Pannellum API
$(document).ready(function () {
    pannellum.viewer("panorama1", {
        "default": {
            "firstScene": "circle",
            "author": "CongTrinh0209"
        },
        "scenes": {
            "circle": {
                "title": "Hình ảnh mang tính minh họa",
                "hfov": 110,
                "pitch": -3,
                "yaw": -50,
                "type": "equirectangular",
                "panorama": "https://congtrinh0209.github.io/Du_anTN/IMG/IMG-360/PANO_20170601_155002_1.jpg",
                "autoRotate": -3,
                "hotSpots": [{
                    "pitch": -3,
                    "yaw": -85,
                    "type": "scene",
                    "text": "Phòng học",
                    "sceneId": "phonghoc",
                    "targetYaw": -50,
                    "targetPitch": 0
                }]
            },

            "phonghoc": {
                "title": "Phòng học",
                "hfov": 100,
                "pitch": -50,
                "yaw": 80,
                "type": "equirectangular",
                "panorama": "https://congtrinh0209.github.io/Du_anTN/IMG/IMG-360/PANO_20170601_162248_3.jpg",
                "autoLoad": true,
                "autoRotate": -3,
                "hotSpots": [{
                    "pitch": 0,
                    "yaw": -60,
                    "type": "scene",
                    "text": "Phòng chính",
                    "sceneId": "circle",
                    "targetYaw": -48,
                    "targetPitch": 0
                }]
            }
        }
    });
    $(".panorama>.pnlm-load-button").html("<p>Click để<br>xem<br>ảnh 360</p><p></p>");
});