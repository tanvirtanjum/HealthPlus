$(document).ready(function () {
    // var base_URL = "http://127.0.0.1:5500";
    // var api_base_URL = "http://localhost:3000";

    $('#dashTab').attr("href", base_URL+"/views/Physician/Dashboard.html");
    $('#aboutTab').attr("href", base_URL+"/views/Public/About_Us.html");
    $('#signinTab').attr("href", base_URL+"/views/Public/SignIn.html");

    function activeSection()
    {
        if(window.location.href == base_URL+"/views/Physician/Dashboard.html")
        {
            $('#dashTab').addClass("active");
            $('#aboutTab').removeClass("active");
            $('#signinTab').removeClass("active");
        }

        if(window.location.href == base_URL+"/views/Public/About_Us.html")
        {
            $('#homeTab').removeClass("active");
            $('#aboutTab').addClass("active");
            $('#signinTab').removeClass("active");
        }

        if(window.location.href == base_URL+"/views/Public/SignIn.html")
        {
            $('#homeTab').removeClass("active");
            $('#aboutTab').removeClass("active");
            $('#signinTab').addClass("active");
        }

    }

    activeSection();

    var decryptLocal = function(secret) {
        var decryptLoginInfo = CryptoJS.AES.decrypt(secret, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        return decryptLoginInfo;
    }

    var userLogout = function () {
        // var decryptLoginInfo = decryptLocal(localStorage.getItem('loginInfo'));

        $.ajax({
            url: api_base_URL+"/api/logins/authenticated-user/logout",
            method: "GET",
            // headers: {
            //     role : decryptLoginInfo.role_id,
            // },
            
            complete: function (xhr, status) {
                if (xhr.status == 200) {

                    localStorage.clear();

                    window.location.href = base_URL+"/views/Public/SignIn.html";
                   
                }
                else {
                    alert(data['data']);
                }
            }
        });
    }

    $("#logoutTab").click(function () {
        userLogout();
    });
});