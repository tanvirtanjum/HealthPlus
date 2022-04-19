$(document).ready(function () {
    // var base_URL = "http://127.0.0.1:5500";
    // var api_base_URL = "http://localhost:3000";


    $('#topLayout').load("../Layouts/_AdminLayout.html");
    $('#bottomLayout').load("../Layouts/_BottomLayout.html");
        
    var redirect = function(role) {
        if(role == null)
        {
            window.location.href = base_URL+"/views/Public/Home.html";
        }
        if(role == 1)
        {
            window.location.href = base_URL+"/views/Admin/Dashboard.html";
        }
        if(role == 2)
        {
            window.location.href = base_URL+"/views/Physician/Dashboard.html";
        }     
    }
    
    var checkLocalStorage = function() {
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        if(decryptLoginInfo.status_id == 1) 
        {

        }
        else
        {   
            redirect(decryptLoginInfo.status_id);
        }
    }

    if(localStorage.getItem('loginInfo') == null)
    {
        redirect(null);
    }
    else
    {
        checkLocalStorage();
    }

    // 
    var LoadAllPhysicianOptions = function(){
        $.ajax({
            url: api_base_URL+"/api/physicians/get-all-physicians",
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    var str = '';

                    if(data.length > 0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            str += '<option value="'+data[i].id+'">'+data[i].pssn+'-'+data[i].name+' ('+data[i].department+')</option>';
                        }
                    }
                    else
                    {
                        str += "";
                    }

                    $("#statusP").html(str);
                    $("#statusU").html(str);
                }
                else 
                {
                    str += "";
                    $("#statusP").html(str);
                    $("#statusU").html(str);
                }
            }
        });
    }
    LoadAllPhysicianOptions();


        // 
        var LoadAllIllOptions = function(){
            $.ajax({
                url: api_base_URL+"/api/illness_status/get-all-status",
                method: "GET",
                complete: function (xhr, status) {
                    if (xhr.status == 200) {
                        var data = xhr.responseJSON;
    
                        var str = '';
    
                        if(data.length > 0)
                        {
                            for (var i = 0; i < data.length; i++) 
                            {
                                str += '<option value="'+data[i].id+'">'+data[i].status_name+'</option>';
                            }
                        }
                        else
                        {
                            str += "";
                        }
    
                        $("#dis1P").html(str);
                        $("#dis2P").html(str);
                        $("#dis3P").html(str);
                        $("#dis4P").html(str);

                        $("#dis1U").html(str);
                        $("#dis2U").html(str);
                        $("#dis3U").html(str);
                        $("#dis4U").html(str);
                    }
                    else 
                    {
                        str += "";
                        $("#dis1P").html(str);
                        $("#dis2P").html(str);
                        $("#dis3P").html(str);
                        $("#dis4P").html(str);

                        $("#dis1U").html(str);
                        $("#dis2U").html(str);
                        $("#dis3U").html(str);
                        $("#dis4U").html(str);
                    }
                }
            });
        }
        LoadAllIllOptions();


    //
    var LoadAllPatients = function(){
        $.ajax({
            url: api_base_URL+"/api/patients/get-all-patients",
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    var str = '';
                    var sl = 1;
                    if(data.length > 0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            str += "<tr>"+
                                        "<th>"+ sl + "</th>"+
                                        "<td>"+ data[i].ssn  +"</td>"+
                                        "<td>"+ data[i].name +"</td>"+
                                        "<td>"+ data[i].dob  +"</td>"+
                                        "<td>"+ data[i].phy_name  +"</td>"+
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateEmployeeModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-edit'></i> Edit</button></td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='6' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#empTable tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='6' align='middle'>NO DATA FOUND</td></tr>";
                    $("#empTable tbody").html(str);
                }
            }
        });
    }
    LoadAllPatients();

    // 
    $('#addEmployeeModal').on('show.bs.modal', function(e) {
        $('#msgP').attr('hidden', true);
    });

    // 
    var InsertMedicalRecord = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        // console.log(login_id);
        $.ajax({
            url: api_base_URL+"/api/medical_records/post-record",
            method: "POST",
            data : {
                sex : $('#sexP').val(),
                patient_id : id,
                disability_status : $('#dis1P').val(),
                diabetes_status : $('#dis2P').val(),
                blood_pressure_status : $('#dis3P').val(),
                allergies_status : $('#dis4P').val(),
            },
            headers : {
                role : decryptLoginInfo.status_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    var data = xhr.responseJSON;

                    if(data.insertId >= 1)
                    {
                        $("#msgP").removeClass("alert-danger");
                        $("#msgP").addClass("alert-success");
                        $('#msgP').html('<small>Physician Added.</small>');
                        $('#msgP').removeAttr('hidden');

                    }
                    else 
                    {
                        $("#msgP").removeClass("alert-success");
                        $("#msgP").addClass("alert-danger");
                        $('#msgP').html('<small>Something Went Wrong.</small>');
                        $('#msgP').removeAttr('hidden');
                    }
                }
                else 
                {
                    $("#msgP").removeClass("alert-success");
                    $("#msgP").addClass("alert-danger");
                    $('#msgP').html('<small>Something Went Wrong.</small>');
                    $('#msgP').removeAttr('hidden');
                }
                LoadAllPatients();
            }
        });
    }

    var InsertPatient = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        // console.log(login_id);
        $.ajax({
            url: api_base_URL+"/api/patients/post-patients",
            method: "POST",
            data : {
                insurance_id: id,
                ssn: (new Date().getTime()+'').substr(3,7),
                name: $('#nameP').val(),
                phone_no: $('#contactP').val(),
                address: $('#addressP').val(),
                dob: $('#dobP').val(),
                physician_id: $('#statusP').val(),
            },
            headers : {
                role : decryptLoginInfo.status_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    if (xhr.status == 201) {
                        var data = xhr.responseJSON;
    
                        InsertMedicalRecord(data.insertId);
                    }
                    else 
                    {
                        alert("Something Went Wrong.");
                    }
                }
                else 
                {
                    alert("Something Went Wrong.");
                }
                LoadAllPatients();
            }
        });
    }

    var InsertInsurance = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/insurance/post-insurance",
            method: "POST",
            data : {
                insrurance_id : $('#icP').val(),
                company_name : $('#cP').val(),
                insurance_pay : $('#ipP').val(),
                copay : $('#cpP').val(),
                p_s : $('#itP').val(),
            },
            headers : {
                role : decryptLoginInfo.status_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    var data = xhr.responseJSON;

                    InsertPatient(data.insertId);
                }
                else 
                {
                    alert("Something Went Wrong.");
                }
            }
        });
    }

    var validatePatientInsert= function() {
        var validate = true;
        if($.trim($('#icP').val()).length <= 0)
        {
            validate = false;
            $('#icP').addClass("is-invalid");
        }
        else
        {
            $("#icP").removeClass("is-invalid");
        }

        if($.trim($('#cP').val()).length <= 0)
        {
            validate = false;
            $('#cP').addClass("is-invalid");
        }
        else
        {
            $("#cP").removeClass("is-invalid");
        }

        if($.trim($('#ipP').val()).length <= 0 || $('#ipP').val() <= 0)
        {
            validate = false;
            $('#ipP').addClass("is-invalid");
        }
        else
        {
            $("#ipP").removeClass("is-invalid");
        }

        if($.trim($('#cpP').val()).length <= 0 || $('#cpP').val() <= 0)
        {
            validate = false;
            $('#cpP').addClass("is-invalid");
        }
        else
        {
            $("#cpP").removeClass("is-invalid");
        }

        if($.trim($('#itP').val()).length <= 0)
        {
            validate = false;
            $('#itP').addClass("is-invalid");
        }
        else
        {
            $("#itP").removeClass("is-invalid");
        }

        if($.trim($('#nameP').val()).length <= 0)
        {
            validate = false;
            $('#nameP').addClass("is-invalid");
        }
        else
        {
            $("#nameP").removeClass("is-invalid");
        }

        if($.trim($('#dobP').val()).length <= 0)
        {
            validate = false;
            $('#dobP').addClass("is-invalid");
        }
        else
        {

            $("#dobP").removeClass("is-invalid");
        }

        if($.trim($("#contactP").val()).length <= 10)
        {
            validate = false;
            $("#contactP").addClass("is-invalid");
        }
        else
        {
            $("#contactP").removeClass("is-invalid");
        }


        if($.trim($("#addressP").val()).length <= 0)
        {
            validate = false;
            $("#addressP").addClass("is-invalid");
        }
        else
        {
            $("#addressP").removeClass("is-invalid");
        }


        if(!validate)
        {
            $('#msgP').attr('hidden', true);
        }

        return validate;
    }

    $("#postBTN").click(function () {
        $('#msgP').attr('hidden', true);

        if(validatePatientInsert())
        {
            InsertInsurance();
        }
        else
        {

        }
        
        
    });

    //
    var LoadPatientMedicalRecord = function(id){
        $.ajax({
            url: api_base_URL+"/api/medical_records/get-record/patient/"+id,
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
                   //    Medical
                   $('#dis1U').val(data.disability_status);
                   $('#dis2U').val(data.diabetes_status);
                   $('#dis3U').val(data.blood_pressure_status);
                   $('#dis4U').val(data.allergies_status);
                   $('#id_m').val(data.id);
                   validatePatientUpdate();
                }
                else {}
            }
        });
    }

    var LoadPatient = function(id){
        $.ajax({
            url: api_base_URL+"/api/patients/get-patient/"+id,
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
                   //    Insurance
                   $('#icU').val(data.i_i);
                   $('#cU').val(data.company_name);
                   $('#ipU').val(data.insurance_pay);
                   $('#cpU').val(data.copay);
                   $('#itU').val(data.p_s);

                   $('#id_i').val(data.insurance_id);
                
                    //    Personal
                   $('#nameU').val(data.name);
                   $('#ssnU').val(data.ssn);
                   $('#contactU').val(data.phone_no);
                   $('#dobU').val(data.dob);
                   $('#addressU').val(data.address);
                   $('#statusU').val(data.physician_id);
                   $('#id').val(data.id);

                   //  Medical
                   LoadPatientMedicalRecord(data.id); 
                
                }
                else {}
            }
        });
    }

    $('#updateEmployeeModal').on('show.bs.modal', function(e) {
        $('#msgU').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        LoadPatient(id);
    });



    // 
    var validatePatientUpdate= function() {
        var validate = true;
        if($.trim($('#icU').val()).length <= 0)
        {
            validate = false;
            $('#icU').addClass("is-invalid");
        }
        else
        {
            $("#icU").removeClass("is-invalid");
        }

        if($.trim($('#cU').val()).length <= 0)
        {
            validate = false;
            $('#cU').addClass("is-invalid");
        }
        else
        {
            $("#cU").removeClass("is-invalid");
        }

        if($.trim($('#ipU').val()).length <= 0 || $('#ipU').val() <= 0)
        {
            validate = false;
            $('#ipU').addClass("is-invalid");
        }
        else
        {
            $("#ipU").removeClass("is-invalid");
        }

        if($.trim($('#cpU').val()).length <= 0 || $('#cpU').val() <= 0)
        {
            validate = false;
            $('#cpU').addClass("is-invalid");
        }
        else
        {
            $("#cpU").removeClass("is-invalid");
        }

        if($.trim($('#itU').val()).length <= 0)
        {
            validate = false;
            $('#itU').addClass("is-invalid");
        }
        else
        {
            $("#itU").removeClass("is-invalid");
        }

        if($.trim($('#nameU').val()).length <= 0)
        {
            validate = false;
            $('#nameU').addClass("is-invalid");
        }
        else
        {
            $("#nameU").removeClass("is-invalid");
        }

        if($.trim($('#dobU').val()).length <= 0)
        {
            validate = false;
            $('#dobU').addClass("is-invalid");
        }
        else
        {

            $("#dobU").removeClass("is-invalid");
        }

        if($.trim($("#contactU").val()).length <= 10)
        {
            validate = false;
            $("#contactU").addClass("is-invalid");
        }
        else
        {
            $("#contactU").removeClass("is-invalid");
        }


        if($.trim($("#addressU").val()).length <= 0)
        {
            validate = false;
            $("#addressU").addClass("is-invalid");
        }
        else
        {
            $("#addressU").removeClass("is-invalid");
        }


        if(!validate)
        {
            $('#msgP').attr('hidden', true);
        }

        return validate;
    }

    var UpdatePatient = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/patients/update-patient/"+$('#id').val(),
            method: "PUT",
            data : {
                name: $('#nameU').val(),
                phone_no: $('#contactU').val(),
                address: $('#addressU').val(),
                dob: $('#dobU').val(),
                physician_id: $('#statusU').val(),
            },
            headers : {
                role : decryptLoginInfo.status_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    if(data.affectedRows >= 1)
                    {
                        $("#msgU").removeClass("alert-danger");
                        $("#msgU").addClass("alert-success");
                        $('#msgU').html('<small>Information Updated.</small>');
                        $('#msgU').removeAttr('hidden');
                    }
                    else 
                    {
                        $("#msgU").removeClass("alert-success");
                        $("#msgU").addClass("alert-danger");
                        $('#msgU').html('<small>Something Went Wrong.</small>');
                        $('#msgU').removeAttr('hidden');
                    }
                }
                else 
                {
                    $("#msgU").removeClass("alert-success");
                    $("#msgU").addClass("alert-danger");
                    $('#msgU').html('<small>Something Went Wrong.</small>');
                    $('#msgU').removeAttr('hidden');
                }
                LoadAllPatients();
                LoadPatient(id);
            }
        });
    }

    var UpdatePatientIns = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/insurance/update-record/"+$('#id_i').val(),
            method: "PUT",
            data : {
                insrurance_id : $('#icU').val(),
                company_name : $('#cU').val(),
                insurance_pay : $('#ipU').val(),
                copay : $('#cpU').val(),
                p_s : $('#itU').val(),
            },
            headers : {
                role : decryptLoginInfo.status_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    if(data.affectedRows >= 1)
                    {
                        UpdatePatient();
                    }
                    else 
                    {
                        alert("Wrong");
                    }
                }
                else 
                {
                    alert("Wrong");
                }
            }
        });
    }

    var UpdatePatientMed = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/medical_records/update-record/"+$('#id_m').val(),
            method: "PUT",
            data : {
                sex : $('#sexU').val(),
                disability_status : $('#dis1U').val(),
                diabetes_status : $('#dis2U').val(),
                blood_pressure_status : $('#dis3U').val(),
                allergies_status : $('#dis4U').val(),
            },
            headers : {
                role : decryptLoginInfo.status_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    if(data.affectedRows >= 1)
                    {
                        UpdatePatientIns();
                    }
                    else 
                    {
                        alert("Wrong");
                    }
                }
                else 
                {
                    alert("Wrong");
                }
            }
        });
    }

    $("#updateBTN").click(function () {
        $('#msgU').attr('hidden', true);
        if(validatePatientUpdate())
        {
            UpdatePatientMed();
        }
    });


    // 
    var loadAllPatientsByNameOrSSN = function (param) {
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);

            $.ajax({
                url: api_base_URL+"/api/patients/name/"+param+"/essn/"+param,
                method: "GET",
                headers : {
                    role : decryptLoginInfo.role_id,
                },
                complete: function (xhr, status) {
                    if (xhr.status == 200) {
                        var data = xhr.responseJSON;
    
                        var str = '';
                        var sl = 1;
                        if(data.length > 0)
                        {
                            for (var i = 0; i < data.length; i++) 
                            {
                                str += "<tr>"+
                                            "<th>"+ sl + "</th>"+
                                            "<td>"+ data[i].ssn  +"</td>"+
                                            "<td>"+ data[i].name +"</td>"+
                                            "<td>"+ data[i].dob  +"</td>"+
                                            "<td>"+ data[i].phy_name  +"</td>"+
                                            "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateEmployeeModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-edit'></i> Edit</button></td>"+
                                    "</tr>";
                                sl++;
                            }
                        }
                        else
                        {
                            str += "<tr><td colspan='6' align='middle'>NO DATA FOUND</td></tr>";
                        }
    
                        $("#empTable tbody").html(str);
                    }
                    else 
                    {
                        str += "<tr><td colspan='6' align='middle'>NO DATA FOUND</td></tr>";
                        $("#empTable tbody").html(str);
                    }
                }
            });
        }
    $("#search").on("keyup change",function(){
        if($.trim($("#search").val()).length > 0)
        {
            loadAllPatientsByNameOrSSN($("#search").val());
        }
        else
        {
            LoadAllPatients();
        }
    });

});