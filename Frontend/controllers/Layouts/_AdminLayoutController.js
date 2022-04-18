$(document).ready(function () {
    // var base_URL = "http://127.0.0.1:5500";
    // var api_base_URL = "http://localhost:3000";

    $('#dashTab').attr("href", base_URL+"/views/Admin/Dashboard.html");
    $('#empTab').attr("href", base_URL+"/views/Admin/Employees.html");
    $('#phyTab').attr("href", base_URL+"/views/Admin/Physicians.html");
    $('#patTab').attr("href", base_URL+"/views/Admin/Patients.html");

    function activeSection()
    {
        if(window.location.href == base_URL+"/views/Admin/Dashboard.html")
        {
            $('#dashTab').addClass("active");
            $('#empTab').removeClass("active");
            $('#phyTab').removeClass("active");
            $('#patTab').removeClass("active");
        }

        if(window.location.href == base_URL+"/views/Admin/Employees.html")
        {
            $('#dashTab').removeClass("active");
            $('#empTab').addClass("active");
            $('#phyTab').removeClass("active");
            $('#patTab').removeClass("active");
        }

        if(window.location.href == base_URL+"/views/Admin/Physicians.html")
        {
            $('#dashTab').removeClass("active");
            $('#empTab').removeClass("active");
            $('#phyTab').addClass("active");
            $('#patTab').removeClass("active");
        }

        if(window.location.href == base_URL+"/views/Admin/Patients.html")
        {
            $('#dashTab').removeClass("active");
            $('#empTab').removeClass("active");
            $('#phyTab').removeClass("active");
            $('#patTab').addClass("active");
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