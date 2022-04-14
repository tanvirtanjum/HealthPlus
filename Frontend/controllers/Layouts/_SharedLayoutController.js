$(document).ready(function () {
    // var base_URL = "http://127.0.0.1:5500";
    // var api_base_URL = "http://localhost:3000";

    $('#homeTab').attr("href", base_URL+"/views/Public/Home.html");
    $('#kftTrustTab').attr("href", base_URL+"/views/Public/AboutKFTTrust.html");
    $('#kftSchoolTab').attr("href", base_URL+"/views/Public/AboutKFTCollegiateSchool.html");
    $('#teacherTab').attr("href", base_URL+"/views/Public/Rules.html");
    $('#dressTab').attr("href", base_URL+"/views/Public/DressCode.html");
    $('#admissionTab').attr("href", base_URL+"/views/Public/Admission.html");
    $('#conatctTab').attr("href", base_URL+"/views/Public/ContactUs.html");
    $('#noticeTab').attr("href", base_URL+"/views/Public/Notice.html");
    $('#loginTab').attr("href", base_URL+"/views/Public/SignIn.html");

    function activeSection()
    {
        if(window.location.href == base_URL+"/views/Public/Home.html")
        {
            $('#homeTab').addClass("active");
            $('#kftOptionTab').removeClass("active");
            $('#academicOptionTab').removeClass("active");
            $('#admissionTab').removeClass("active");
            $('#conatctTab').removeClass("active");
            $('#noticeTab').removeClass("active");
            $('#loginTab').removeClass("active");
        }

        if(window.location.href == base_URL+"/views/Public/AboutKFTTrust.html" || window.location.href == base_URL+"/views/Public/AboutKFTCollegiateSchool.html")
        {
            $('#kftOptionTab').addClass("active");
            $('#homeTab').removeClass("active");
            $('#academicOptionTab').removeClass("active");
            $('#admissionTab').removeClass("active");
            $('#conatctTab').removeClass("active");
            $('#noticeTab').removeClass("active");
            $('#loginTab').removeClass("active");
        }
        // Write Code for academic options here...
        if(window.location.href == base_URL+"/views/Public/Rules.html" || window.location.href == base_URL+"/views/Public/DressCode.html")
        {
            $('#academicOptionTab').addClass("active");
            $('#homeTab').removeClass("active");
            $('#kftOptionTab').removeClass("active");
            $('#admissionTab').removeClass("active");
            $('#conatctTab').removeClass("active");
            $('#noticeTab').removeClass("active");
            $('#loginTab').removeClass("active");
        }

        if(window.location.href == base_URL+"/views/Public/Admission.html")
        {
            $('#admissionTab').addClass("active");
            $('#kftOptionTab').removeClass("active");
            $('#academicOptionTab').removeClass("active");
            $('#homeTab').removeClass("active");
            $('#conatctTab').removeClass("active");
            $('#noticeTab').removeClass("active");
            $('#loginTab').removeClass("active");
        }

        if(window.location.href == base_URL+"/views/Public/SignIn.html")
        {
            $('#loginTab').addClass("active");
            $('#kftOptionTab').removeClass("active");
            $('#academicOptionTab').removeClass("active");
            $('#admissionTab').removeClass("active");
            $('#conatctTab').removeClass("active");
            $('#noticeTab').removeClass("active");
            $('#homeTab').removeClass("active");
        }

        if(window.location.href == base_URL+"/views/Public/ContactUs.html")
        {
            $('#conatctTab').addClass("active");
            $('#kftOptionTab').removeClass("active");
            $('#academicOptionTab').removeClass("active");
            $('#admissionTab').removeClass("active");
            $('#homeTab').removeClass("active");
            $('#noticeTab').removeClass("active");
            $('#loginTab').removeClass("active");
        }

        if(window.location.href == base_URL+"/views/Public/Notice.html")
        {
            $('#noticeTab').addClass("active");
            $('#kftOptionTab').removeClass("active");
            $('#academicOptionTab').removeClass("active");
            $('#admissionTab').removeClass("active");
            $('#homeTab').removeClass("active");
            $('#homeTab').removeClass("active");
            $('#loginTab').removeClass("active");
        }

    }

    activeSection();
});