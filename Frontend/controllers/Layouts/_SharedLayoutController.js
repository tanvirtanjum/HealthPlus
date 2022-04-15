$(document).ready(function () {
    // var base_URL = "http://127.0.0.1:5500";
    // var api_base_URL = "http://localhost:3000";

    $('#homeTab').attr("href", base_URL+"/views/Public/Home.html");
    $('#aboutTab').attr("href", base_URL+"/views/Public/About_Us.html");
    $('#signinTab').attr("href", base_URL+"/views/Public/SignIn.html");

    function activeSection()
    {
        if(window.location.href == base_URL+"/views/Public/Home.html")
        {
            $('#homeTab').addClass("active");
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
});