$(document).ready(function () {
    $('#topLayout').load("../Layouts/_SharedLayout.html");
    $('#bottomLayout').load("../Layouts/_BottomLayout.html");

    $('#msg').attr('hidden', true);

    $('#recoverLink').attr("href", base_URL+"/views/Public/RecoverPassword.html");

    var redirect = function(role) {
        if(role == null)
        {
            window.location.href = base_URL+"/views/Public/SignIn.html";
        }
        if(role == 1)
        {
            window.location.href = base_URL+"/views/Admin/Dashboard.html";
        }
        if(role == 2)
        {
            window.location.href = base_URL+"/views/Teacher/Dashboard.html";
        }
    }
    
    var checkLocalStorage = function() {
        if(localStorage.getItem('loginInfo') === null) 
        {

        }
        else
        {
            var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);
            
            redirect(decryptLoginInfo.role_id);
        }
    }

    checkLocalStorage();

    var validateLogin = function() {
        var validate = true;
        if($.trim($("#email").val()).length <= 0)
        {
            validate = false;
            $("#email").addClass("is-invalid");
        }
        else
        {
            $("#email").removeClass("is-invalid");
        }
        if($.trim($("#password").val()).length <= 0)
        {
            validate = false;
            $("#password").addClass("is-invalid");
        }
        else
        {
            $("#password").removeClass("is-invalid");
        }

        return validate;
    }

    var userLogin = function () {
        $.ajax({
            url: api_base_URL+"/api/logins/get-user-authentication",
            method: "POST",
            data: {
                username : $("#email").val(),
                password : $("#password").val(),
            },
            
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    if(data.status_id != 3)
                    {
                        localStorage.setItem('loginInfo', CryptoJS.AES.encrypt(JSON.stringify(data), '333'));

                        $('#msg').attr('hidden', true);

                        //USER TYPE WISE REDIRECTION
                        // redirect(data.status_id);
                    }
                    else
                    {
                        $('#msg').html('<small>Login Access: <b>Restricted</b>.<br><b>Contact Support.<b></small>');
                        $('#msg').removeAttr('hidden');
                    }
                   
                }
                else {
                    var data = xhr.responseJSON;
                    $('#msg').html('<small>Invalid <b>Email</b>/<b>Password</b></small>');
                    $('#msg').removeAttr('hidden');
                }
            }
        });
    }

    $("#loginBTN").click(function () {
        $('#msg').attr('hidden', true);
        if(validateLogin())
        {
            userLogin();
        }
    });
});