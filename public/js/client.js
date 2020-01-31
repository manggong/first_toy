$(document).ready(function () {
  // 회원가입 시작
  $('#join_btn').click(function () {
    const name = $('#name').val();
    const id = $('#id').val();
    const pw = $('#pw').val();
    const send_param = {
      name,
      id,
      pw
    };

    $.post('/join', send_param, function (returnData) {
      alert(returnData.message);
    });
  }); // 회원가입 끝

  //로그인 시작
  $('#login_btn').click(function () {
    const id = $('#id').val();
    const pw = $('#pw').val();
    const send_param = {
      id,
      pw
    };

    $.post('/login', send_param, function (returnData) {
      alert(returnData.message);
      if (returnData.flag == 1) {
        window.open("/", "_self");
      } else {
        $('#id').val("");
        $('#pw').val("");
      }
    });
  }); // 로그인 끝
}); // document ready