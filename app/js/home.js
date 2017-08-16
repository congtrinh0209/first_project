'use strict';

$(document).ready(function () {
    //Scroll fixed menu navigation
    var window_width = innerWidth;
    if (window_width <= 768) {
        $('.navbar').attr('data-offset-top', '89');
    };
});
//Check sign-in//demo 2 user
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