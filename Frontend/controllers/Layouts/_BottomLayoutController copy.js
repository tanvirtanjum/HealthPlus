$(document).ready(function () {
    // var base_URL = "http://127.0.0.1:5500";
    // var api_base_URL = "http://localhost:3000";

    $('#homeTab').attr("href", base_URL + "/views/Public/Home.html");
    $('#kftTrustTab').attr("href", base_URL + "/views/Public/About_Us.html");
    $('#loginTab').attr("href", base_URL + "/views/Public/SignIn.html");
});