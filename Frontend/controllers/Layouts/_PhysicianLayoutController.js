$(document).ready(function () {
    // var base_URL = "http://127.0.0.1:5500";
    // var api_base_URL = "http://localhost:3000";

    $('#dashTab').attr("href", base_URL+"/views/Physician/Dashboard.html");
    $('#medTab').attr("href", base_URL+"/views/Physician/Medications.html");
    $('#appTab').attr("href", base_URL+"/views/Physician/Appointments.html");


    function activeSection()
    {
        if(window.location.href == base_URL+"/views/Physician/Dashboard.html")
        {
            $('#dashTab').addClass("active");
            $('#medTab').removeClass("active");
            $('#appTab').removeClass("active");

        }

        if(window.location.href == base_URL+"/views/Physician/Medications.html")
        {
            $('#dashTab').removeClass("active");
            $('#medTab').addClass("active");
            $('#appTab').removeClass("active");
        }

        if(window.location.href == base_URL+"/views/Physician/Appointments.html")
        {
            $('#dashTab').removeClass("active");
            $('#medTab').removeClass("active");
            $('#appTab').addClass("active");
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