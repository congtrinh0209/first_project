$(document).ready(function() {
    //Scroll fixed menu navigation
    var window_width = innerWidth;
    if (window_width <= 768) {
        $('.navbar').attr('data-offset-top','89')
    };
});
//Check sign-in//demo 2 user
var users = [
    {
        fullname: 'Trịnh Công Trình',
        mobile: '0868979193',
        email: 'congtrinh0209@gmail.com',
        pass: '02092008'
    },
    {
        fullname: 'Vũ Thị Quý',
        mobile: '0972047443',
        email: 'vuquy@gmail.com',
        pass: '123456789'
    }
];
$('#sign-in').on('submit',()=>{
    var error = true;
    for (let user of users){
        if ($('#uname').val() != user.mobile && $('#uname').val() != user.email || $('#psw').val() != user.pass) {
            $('#psw').next('span').html('<i class="fa fa-exclamation-circle"></i>' + 'Tên đăng nhập hoặc mật khẩu không chính xác</br>');
            error = false;
        } else {
            if($('#uname').val() == user.mobile || $('#uname').val() == user.email && $('#psw').val() == user.pass){
                $('#uname').next('span').text('');
                $('#psw').next('span').text('');
                $('.error3').css('padding', '0px');
                $('.error1').css('padding', '0px');
                return true;
            }
        }
    }
    return error;
})
