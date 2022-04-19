$(document).ready(function () {
    // var base_URL = "http://127.0.0.1:5500";
    // var api_base_URL = "http://localhost:3000";


    $('#topLayout').load("../Layouts/_PhysicianLayout.html");
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

        if(decryptLoginInfo.status_id == 2) 
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
    var LoadMyID = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/physicians/get-physician/login/"+decryptLoginInfo.id,
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    $('#myID').val(data.id);

                   
                }
                else 
                {
                    
                }
            }
        });
    }
    LoadMyID();

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

                    $("#phyP").html(str);
                    $("#phyU").html(str);
                }
                else 
                {
                    str += "";
                    $("#phyP").html(str);
                    $("#phyU").html(str);
                }
            }
        });
    }
    LoadAllPhysicianOptions();

    // 
    var LoadAllPatientOptions = function(){
        $.ajax({
            url: api_base_URL+"/api/patients/get-all-patients",
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    var str = '';

                    if(data.length > 0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            str += '<option value="'+data[i].id+'">'+data[i].ssn+'-'+data[i].name+'</option>';
                        }
                    }
                    else
                    {
                        str += "";
                    }

                    $("#patP").html(str);
                    $("#patU").html(str);
                }
                else 
                {
                    str += "";
                    $("#patP").html(str);
                    $("#patU").html(str);
                }
            }
        });
    }
    LoadAllPatientOptions();

    //
    var LoadAllMedications = function(){
        $.ajax({
            url: api_base_URL+"/api/medications/get-records",
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
                                        "<td>"+ data[i].code  +"</td>"+
                                        "<td>"+ data[i].name +"</td>"+
                                        "<td>"+ data[i].brand  +"</td>"+
                                        "<td>"+
                                            "<button type='button' data-bs-toggle='modal' data-bs-target='#updateEmployeeModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-edit'></i> Edit</button>&nbsp;"+
                                        "</td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='5' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#empTable tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='5' align='middle'>NO DATA FOUND</td></tr>";
                    $("#empTable tbody").html(str);
                }
            }
        });
    }
    LoadAllMedications();

    // 
    $('#addEmployeeModal').on('show.bs.modal', function(e) {
        $('#msgP').attr('hidden', true);
    });

    // 
    var InsertMedicine = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        // console.log(login_id);
        $.ajax({
            url: api_base_URL+"/api/medications/post-record",
            method: "POST",
            data : {
                code : $('#codeP').val(),
                name : $('#nameP').val(),
                physician_id : $('#myID').val(),
                brand : $('#brandP').val(),
                description : $('#desP').val(),
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
                        $('#msgP').html('<small>Medicine Added.</small>');
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
                LoadAllMedications();
            }
        });
    }

    var validateAppointmentInsert= function() {
        var validate = true;
        if($.trim($('#codeP').val()).length <= 0)
        {
            validate = false;
            $('#codeP').addClass("is-invalid");
        }
        else
        {
            $("#codeP").removeClass("is-invalid");
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

        

        if(!validate)
        {
            $('#msgP').attr('hidden', true);
        }

        return validate;
    }

    $("#postBTN").click(function () {
        $('#msgP').attr('hidden', true);

        if(validateAppointmentInsert())
        {
            InsertMedicine();
        }
        else
        {

        }
    });

    // 
    var LoadAppointment = function(id){
        $.ajax({
            url: api_base_URL+"/api/medications/get-record/"+id,
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
                
                   $('#codeU').val(data.code);
                   $('#nameU').val(data.name);
                   $('#desU').val(data.description);
                   $('#brandU').val(data.brand);
                   
                   $('#id').val(data.id);
    
                }
                else {}
            }
        });
    }

    $('#updateEmployeeModal').on('show.bs.modal', function(e) {
        $('#msgU').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        LoadAppointment(id);
    });


    // 
    var validateAppointmentUpdate = function() {
        var validate = true;
        if($.trim($('#codeU').val()).length <= 0)
        {
            validate = false;
            $('#codeU').addClass("is-invalid");
        }
        else
        {
            $("#codeU").removeClass("is-invalid");
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

        

        if(!validate)
        {
            $('#msgP').attr('hidden', true);
        }

        return validate;
    }

    var UpdateAppointment = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/medications/update-record/"+id,
            method: "PUT",
            data : {
                code : $('#codeU').val(),
                name : $('#nameU').val(),
                physician_id : $('#myID').val(),
                brand : $('#brandU').val(),
                description : $('#desU').val(),
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
                LoadAllMedications();
                LoadAppointment(id);
            }
        });
    }

    $("#updateBTN").click(function () {
        $('#msgU').attr('hidden', true);
        if(validateAppointmentUpdate())
        {
            UpdateAppointment($('#id').val());
        }
    });

});