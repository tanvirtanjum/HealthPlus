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

                    LoadAllAppointments();

                   
                }
                else 
                {
                    
                }
            }
        });
    }
    LoadMyID();

    // 
    var LoadAllMedOptions = function(){
        $.ajax({
            url: api_base_URL+"/api/medications/get-records",
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    var str = '';

                    if(data.length > 0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            str += '<option value="'+data[i].id+'">'+data[i].code+'-'+data[i].name+'</option>';
                        }
                    }
                    else
                    {
                        str += "";
                    }

                    $("#med").html(str);
                }
                else 
                {
                    str += "";
                    $("#med").html(str);
                }
            }
        });
    }
    LoadAllMedOptions();

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
            url: api_base_URL+"/api/appointments/get-record/physician/"+$('#myID').val(),
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
                                            "<button type='button' data-bs-toggle='modal' data-bs-target='#updateEmployeeModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-eye'></i> View</button>&nbsp;"+
                                            
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
    var LoadPrescription = function(id){
        $.ajax({
            url: api_base_URL+"/api/prescriptions/get-record/appointment/"+id,
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
                                        "<td>"+ data[i].patient_id +"_"+ sl +"</td>"+
                                        "<td>"+
                                            "<button type='button' data-bs-toggle='modal' data-bs-target='#updatePUModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-eye'></i> View</button>&nbsp;"+
                                            
                                        "</td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='3' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#preTable tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='3' align='middle'>NO DATA FOUND</td></tr>";
                    $("#preTable tbody").html(str);
                }
            }
        });
    }

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

                   $('#id_a').val(data.id);
                   $('#id_phy').val(data.physician_id);
                   $('#id_pat').val(data.patient_id);
    
                   $('#ren').html("<button type='button' data-bs-toggle='modal' data-bs-target='#updatePModal' data-bs-id='"+data.id+"' class='btn btn-sm btn-primary'><i class='fas fa-pen'></i> Add Prescription</button>");
                   
                   LoadPrescription(data.id);
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



    $('#updatePModal').on('show.bs.modal', function(e) {
        $('#msgU3').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        LoadAppointment(id);
    });

    // 
    // 
    var InsertAppointment = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        // console.log(login_id);
        $.ajax({
            url: api_base_URL+"/api/prescriptions/post-record",
            method: "POST",
            data : {
                patient_id : $('#id_pat').val(),
                physician_id : $('#id_phy').val(),
                appointment_id : $('#id_a').val(),
                examination : $('#exU').val(),
            },
            headers : {
                role : decryptLoginInfo.status_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    var data = xhr.responseJSON;

                    if(data.insertId >= 1)
                    {
                        $("#msgU2").removeClass("alert-danger");
                        $("#msgU2").addClass("alert-success");
                        $('#msgU2').html('<small>Prescription Added.</small>');
                        $('#msgU2').removeAttr('hidden');

                    }
                    else 
                    {
                        $("#msgU2").removeClass("alert-success");
                        $("#msgU2").addClass("alert-danger");
                        $('#msgU2').html('<small>Something Went Wrong.</small>');
                        $('#msgU2').removeAttr('hidden');
                    }
                }
                else 
                {
                    $("#msgU2").removeClass("alert-success");
                    $("#msgU2").addClass("alert-danger");
                    $('#msgU2').html('<small>Something Went Wrong.</small>');
                    $('#msgU2').removeAttr('hidden');
                }
                LoadPrescription($('#id_a').val());
            }
        });
    }

    var validateAppointmentInsert= function() {
        var validate = true;
        if($.trim($('#exU').val()).length <= 0)
        {
            validate = false;
            $('#exU').addClass("is-invalid");
        }
        else
        {
            $("#exU").removeClass("is-invalid");
        }
        

        if(!validate)
        {
            $('#msgP').attr('hidden', true);
        }

        return validate;
    }

    $("#postBTN").click(function () {
        $('#msgU2').attr('hidden', true);

        if(validateAppointmentInsert())
        {
            InsertAppointment();
        }
        else
        {

        }
    });

     // 
     var LoadPreByI = function(id){
        $.ajax({
            url: api_base_URL+"/api/prescriptions/get-record/"+id,
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;

                //    console.log(data)
                
                   $('#exUU').val(data.examination);
                   

                   $('#id_i_i').val(data.id);
                   
    
                   LoadMedicinesList(data.id);
                   
                //    LoadPrescription(data.id);
                }
                else {}
            }
        });
    }


    $('#updatePUModal').on('show.bs.modal', function(e) {
        $('#msgU33').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        LoadPreByI(id);
    });

    // 
    var UpdateAppointment = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        // console.log(login_id);
        $.ajax({
            url: api_base_URL+"/api/prescriptions/update-record/"+id,
            method: "PUT",
            data : {
                examination : $('#exUU').val(),
            },
            headers : {
                role : decryptLoginInfo.status_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    if(data.affectedRows >= 1)
                    {
                        $("#msgU33").removeClass("alert-danger");
                        $("#msgU33").addClass("alert-success");
                        $('#msgU33').html('<small>Prescription Updated.</small>');
                        $('#msgU33').removeAttr('hidden');

                    }
                    else 
                    {
                        $("#msgU33").removeClass("alert-success");
                        $("#msgU33").addClass("alert-danger");
                        $('#msgU33').html('<small>Something Went Wrong.</small>');
                        $('#msgU33').removeAttr('hidden');
                    }
                }
                else 
                {
                    $("#msgU33").removeClass("alert-success");
                    $("#msgU33").addClass("alert-danger");
                    $('#msgU33').html('<small>Something Went Wrong.</small>');
                    $('#msgU33').removeAttr('hidden');
                }
                LoadPrescription(id);
            }
        });
    }

    var validateAppointmentUpdate= function() {
        var validate = true;
        if($.trim($('#exUU').val()).length <= 0)
        {
            validate = false;
            $('#exUU').addClass("is-invalid");
        }
        else
        {
            $("#exUU").removeClass("is-invalid");
        }
        

        if(!validate)
        {
            $('#msgP').attr('hidden', true);
        }

        return validate;
    }

    $("#upBTN").click(function () {
        $('#msgU2').attr('hidden', true);

        if(validateAppointmentUpdate())
        {
            UpdateAppointment($('#id_i_i').val());
        }
        else
        {

        }
    });

    //
    var LoadMedicinesList = function(id){
        $.ajax({
            url: api_base_URL+"/api/medicines_list/get-records/prescription/"+id,
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
                                        "<td>"+ data[i].code +"_"+ data[i].name +"</td>"+
                                        "<td>"+ data[i].dose +"</td>"+
                                        "<td>"+
                                            "<button type='button' data-bs-toggle='modal' data-bs-target='#updatePDModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-danger'><i class='fas fa-trash-alt'></i> Remove</button>&nbsp;"+
                                            
                                        "</td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='4' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#medTable tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='4' align='middle'>NO DATA FOUND</td></tr>";
                    $("#medTable tbody").html(str);
                }
            }
        });
    }


    // 
    var InsertMed = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        // console.log(login_id);
        $.ajax({
            url: api_base_URL+"/api/medicines_list/post-record",
            method: "POST",
            data : {
                medication_id : $('#med').val(),
                prescription_id : $('#id_i_i').val(),
                dose : $('#dose').val(),
            },
            headers : {
                role : decryptLoginInfo.status_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    var data = xhr.responseJSON;

                    if(data.insertId >= 1)
                    {
                        
                        LoadMedicinesList($('#id_i_i').val());
                    }
                    else 
                    {
                        
                    }
                }
                else 
                {
                    
                }
                LoadPrescription($('#id_a').val());
            }
        });
    }

    var validateMedInsert= function() {
        var validate = true;
        if($.trim($('#dose').val()).length <= 0)
        {
            validate = false;
            $('#dose').addClass("is-invalid");
        }
        else
        {
            $("#dose").removeClass("is-invalid");
        }
        

        if(!validate)
        {
            $('#msgP').attr('hidden', true);
        }

        return validate;
    }

    $("#amBTN").click(function () {

        if(validateMedInsert())
        {
            InsertMed();
        }
        else
        {

        }
    });

    // 
    $('#updatePDModal').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('bs-id');
        $('#idU4').val(id);
    });

    // 
    var DeleteMed = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/medicines_list/delete-record/"+id,
            method: "DELETE",
            headers : {
                role : decryptLoginInfo.status_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 204) {
                    LoadPreByI($('#id_a').val());

                    $('#updatePDModal').modal('hide');
                    
                }
                else 
                {
                    
                }
                
            }
        });
    }

    $("#delBTN").click(function () {
        DeleteMed($('#idU4').val());
    });

});