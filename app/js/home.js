'use strict';

//**Scroll fixed menu navigation-mobile,tablet
$(document).ready(function () {
    var window_width = innerWidth;
    if (window_width <= 768) {
        $('.header').attr('data-offset-top', '89');
    };
    //*****Hiển thị sign-in, sign-up
    if ($(location).attr('href').search('psw') > 0) {
        $('.navbar-right').css('display', 'none');
        $('.info-acc').css('display', 'block');
    }
    $(".sign-out").on("click", function () {
        window.location.href = 'home.html';
    });
});
//*************Check sign-in//demo 2 user_data
var users = [{
    fullname: 'Trịnh Công Trình',
    mobile: '0868979193',
    email: 'congtrinh0209@gmail.com',
    pass: '02092008'
}, {
    fullname: 'Vũ Thị Quý',
    mobile: '0972047443',
    email: 'vuquy@gmail.com',
    pass: '123456789'
}];
$('#sign-in').on('submit', function () {
    var error = true;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = users[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var user = _step.value;

            if ($('#uname').val() != user.mobile && $('#uname').val() != user.email || $('#psw').val() != user.pass) {
                $('#psw').next('span').html('<i class="fa fa-exclamation-circle"></i>' + 'Tên đăng nhập hoặc mật khẩu không chính xác</br>');
                error = false;
            } else {
                if ($('#uname').val() == user.mobile || $('#uname').val() == user.email && $('#psw').val() == user.pass) {
                    $('#uname').next('span').text('');
                    $('#psw').next('span').text('');
                    $('.error3').css('padding', '0px');
                    $('.error1').css('padding', '0px');
                    return true;
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return error;
});
//****************Request send password
$('#request-pass').on('submit', function () {
    var error = true;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = users[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var user = _step2.value;

            if ($('#send-mobile').val() != user.mobile) {
                $('#send-mobile').next('span').html('<i class="fa fa-exclamation-circle"></i>' + ' Số điện thoại không tồn tại trên hệ thống!</br>');
                error = false;
            } else {
                $('#send-mobile').next('span').text('');
                $('.error3').css('padding', '0px');
                alert('Vui lòng kiểm tra tin nhắn để nhận lại mật khẩu!');
                return true;
            }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return error;
});