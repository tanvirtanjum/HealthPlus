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
    var LoadMyID = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/employees/get-employee/login/"+decryptLoginInfo.id,
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
    var LoadAllAppointments = function(){
        $.ajax({
            url: api_base_URL+"/api/appointments/get-records",
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
                                        "<td>"+ data[i].pat_name  +"</td>"+
                                        "<td>"+ data[i].date_for +"</td>"+
                                        "<td>"+ data[i].times  +"</td>"+
                                        "<td>"+ data[i].phy_name  +"</td>"+
                                        "<td>"+ data[i].emp_name  +"</td>"+
                                        "<td>"+
                                            "<button type='button' data-bs-toggle='modal' data-bs-target='#updateEmployeeModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-edit'></i> Edit</button>&nbsp;"+
                                            "<button type='button' data-bs-toggle='modal' data-bs-target='#updateEmployeeRoleModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-danger'><i class='fas fa-trash-alt'></i> Delete</button>"+
                                        "</td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='7' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#empTable tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='7' align='middle'>NO DATA FOUND</td></tr>";
                    $("#empTable tbody").html(str);
                }
            }
        });
    }
    LoadAllAppointments();

    // 
    $('#addEmployeeModal').on('show.bs.modal', function(e) {
        $('#msgP').attr('hidden', true);
    });

    // 
    var InsertAppointment = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        // console.log(login_id);
        $.ajax({
            url: api_base_URL+"/api/appointments/post-record",
            method: "POST",
            data : {
                patient_id : $('#patP').val(),
                physician_id : $('#phyP').val(),
                employee_id : $('#myID').val(),
                date_for : $('#dateP').val(),
                times : $('#timeP').val(),
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
                        $('#msgP').html('<small>Appointment Added.</small>');
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
                LoadAllAppointments();
            }
        });
    }

    var validateAppointmentInsert= function() {
        var validate = true;
        if($.trim($('#dateP').val()).length <= 0)
        {
            validate = false;
            $('#dateP').addClass("is-invalid");
        }
        else
        {
            $("#dateP").removeClass("is-invalid");
        }

        if($.trim($('#timeP').val()).length <= 0)
        {
            validate = false;
            $('#timeP').addClass("is-invalid");
        }
        else
        {
            $("#timeP").removeClass("is-invalid");
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
            InsertAppointment();
        }
        else
        {

        }
    });

    // 
    var LoadAppointment = function(id){
        $.ajax({
            url: api_base_URL+"/api/appointments/get-record/"+id,
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
                
                   $('#phyU').val(data.physician_id);
                   $('#patU').val(data.patient_id);
                   $('#dateU').val(data.date_for);
                   $('#timeU').val(data.times);
                   
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



    $('#updateEmployeeRoleModal').on('show.bs.modal', function(e) {
        $('#msgU3').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        $('#idU4').val(id);
    });

    // 
    var validateAppointmentUpdate = function() {
        var validate = true;
        if($.trim($('#dateU').val()).length <= 0)
        {
            validate = false;
            $('#dateU').addClass("is-invalid");
        }
        else
        {
            $("#dateU").removeClass("is-invalid");
        }

        if($.trim($('#timeU').val()).length <= 0)
        {
            validate = false;
            $('#timeU').addClass("is-invalid");
        }
        else
        {
            $("#timeU").removeClass("is-invalid");
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
            url: api_base_URL+"/api/appointments/update-record/"+id,
            method: "PUT",
            data : {
                patient_id : $('#patU').val(),
                physician_id : $('#phyU').val(),
                employee_id : $('#myID').val(),
                date_for : $('#dateU').val(),
                times : $('#timeU').val(),
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
                LoadAllAppointments();
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

    // 
    var DeleteAppointment = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/appointments/delete-record/"+id,
            method: "PUT",
            data : {
                patient_id : $('#patU').val(),
                physician_id : $('#phyU').val(),
                employee_id : $('#myID').val(),
                date_for : $('#dateU').val(),
                times : $('#timeU').val(),
            },
            headers : {
                role : decryptLoginInfo.status_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 204) {
                    $('#updateEmployeeRoleModal').modal('hide');
                }
                else 
                {
                    
                }
                LoadAllAppointments();
            }
        });
    }

    $("#updateRoleBTN").click(function () {
        DeleteAppointment($('#idU4').val());
    });

});