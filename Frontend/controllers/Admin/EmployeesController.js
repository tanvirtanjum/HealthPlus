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
    var LoadAllAdminStatusOptions = function(){
        $.ajax({
            url: api_base_URL+"/api/admin_status/get-all-status",
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
    LoadAllAdminStatusOptions();

    //
    var LoadAllEmployees = function(){
        $.ajax({
            url: api_base_URL+"/api/employees/get-all-employees",
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
                                        "<td>"+ data[i].essn  +"</td>"+
                                        "<td>"+ data[i].name +"</td>"+
                                        "<td>"+ data[i].department  +"</td>"+
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateEmployeeModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-edit'></i> Edit</button></td>"+
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
    LoadAllEmployees();

    // 
    $('#addEmployeeModal').on('show.bs.modal', function(e) {
        $('#msgP').attr('hidden', true);
    });

    // 
    var loadAllEmployeesByEmail = function (email) {
        var result = true;
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);

            $.ajax({
                url: api_base_URL+"/api/logins/checkemail/"+email,
                method: "GET",
                headers : {
                    role : decryptLoginInfo.status_id,
                },
                complete: function (xhr, status) {
                    if (xhr.status == 200) {
                        var data = xhr.responseJSON;

                        result = true;

                        $('#emailP').addClass("is-invalid");
                    }
                    
                    else {

                        result = false;
                        $('#emailP').removeClass("is-invalid");
                    }
                }
            });

            return result;
    }
    $("#emailP").on("keyup change",function(){
        if($.trim($("#emailP").val()).length > 0)
        {
            $('#emailP').removeClass("is-invalid");
            loadAllEmployeesByEmail($("#emailP").val());
        }
        else
        {
            $('#emailP').addClass("is-invalid");
        }
    });

    // 
    var InsertEmployee = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        // console.log(login_id);
        $.ajax({
            url: api_base_URL+"/api/employees/post-employee",
            method: "POST",
            data : {
                login_id: id,
                essn: (new Date().getTime()+'').substr(3,7),
                name: $('#nameP').val(),
                phone_no: $('#contactP').val(),
                address: $('#addressP').val(),
                admin_status_id: $('#statusP').val(),
                salary: $('#salaryP').val(),
                department: $('#deptP').val(),
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
                        $('#msgP').html('<small>Employee Added.</small>');
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
                LoadAllEmployees();
            }
        });
    }

    var InsertLogin = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/logins/insert-user",
            method: "POST",
            data : {
                email: $('#emailP').val(),
                password: Math.floor(100000 + Math.random() * 900000),
                status_id: $('#statusP').val(),
            },
            headers : {
                role : decryptLoginInfo.status_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    var data = xhr.responseJSON;

                    InsertEmployee(data.insertId);
                }
                else 
                {
                    alert("Something Went Wrong.");
                }
            }
        });
    }

    var validateEmployeeInsert= function() {
        var validate = true;
        if($.trim($('#nameP').val()).length <= 0)
        {
            validate = false;
            $('#nameP').addClass("is-invalid");
        }
        else
        {
            $("#nameP").removeClass("is-invalid");
        }

        if($.trim($('#emailP').val()).length <= 0)
        {
            validate = false;
            $('#emailP').addClass("is-invalid");
        }
        else
        {

            $("#emailP").removeClass("is-invalid");
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

        if($.trim($("#deptP").val()).length <= 0)
        {
            validate = false;
            $("#deptP").addClass("is-invalid");
        }
        else
        {
            $("#deptP").removeClass("is-invalid");
        }

        if($("#salaryP").val() <= 0)
        {
            validate = false;
            $("#salaryP").addClass("is-invalid");
        }
        else
        {
            $("#salaryP").removeClass("is-invalid");
        }

        if(!validate)
        {
            $('#msgP').attr('hidden', true);
        }

        return validate;
    }

    $("#postBTN").click(function () {
        $('#msgP').attr('hidden', true);

        if(validateEmployeeInsert())
        {
            InsertLogin();
        }
        else
        {

        }
    });

    // 
    var LoadEmployee = function(id){
        $.ajax({
            url: api_base_URL+"/api/employees/get-employee/"+id,
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
                
                   $('#nameU').val(data.name);
                   $('#essnU').val(data.essn);
                   $('#contactU').val(data.phone_no);
                   $('#emailU').val(data.username);
                   $('#addressU').val(data.address);
                   $('#deptU').val(data.department);
                   $('#statusU').val(data.admin_status_id);
                   $('#salaryU').val(data.salary);
                   $('#id').val(data.id);
        
                   $('#renderEmBtn').html("<button type='button' data-bs-toggle='modal' data-bs-target='#updateEmployeeEmailModal' data-bs-id='"+data.login_id+"' class='btn btn-dark'>Update Email</button>");

                   if(data.admin_status_id == 2)
                   {
                        $('#renderRole').html("<button type='button' data-bs-toggle='modal' data-bs-target='#updateEmployeeRoleModal' data-bs-id='"+data.login_id+"' class='btn btn-primary'>Give Admin Privilege</button>")
                   }
                   else
                   {
                    $('#renderRole').html("<button type='button' data-bs-toggle='modal' data-bs-target='#updateEmployeeRoleModal' data-bs-id='"+data.login_id+"' class='btn btn-danger'>Remove Admin Privilege</button>")
                   }
                }
                else {}
            }
        });
    }

    $('#updateEmployeeModal').on('show.bs.modal', function(e) {
        $('#msgU').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        LoadEmployee(id);
    });

    // 
    var LoadEmployeeLoginDetails = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/logins/get-login/id/"+id,
            method: "GET",
            headers : {
                role : decryptLoginInfo.status_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
                
                   $('#idU4').val(data.id);
                   $('#roleU4').val(data.status_id);
                }
                else {}
            }
        });
    }

    $('#updateEmployeeRoleModal').on('show.bs.modal', function(e) {
        $('#msgU4').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        LoadEmployeeLoginDetails(id);
    });

    // 
    var LoadEmployeeLoginDetails2 = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/logins/get-login/id/"+id,
            method: "GET",
            headers : {
                role : decryptLoginInfo.status_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
                
                   $('#emailU2').val(data.username);
                   $('#idu3').val(data.id);
                }
                else {}
            }
        });
    }

    $('#updateEmployeeEmailModal').on('show.bs.modal', function(e) {
        $('#msgU3').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        LoadEmployeeLoginDetails2(id);
    });

    // 
    var loadAllEmployeesByEmail2 = function (email) {
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);

            $.ajax({
                url: api_base_URL+"/api/logins/checkemail/"+email,
                method: "GET",
                headers : {
                    role : decryptLoginInfo.status_id,
                },
                complete: function (xhr, status) {
                    if (xhr.status == 200) {
                        var data = xhr.responseJSON;

                        $('#nemailU2').addClass("is-invalid");
                    }
                    
                    else {
                        $('#nemailU2').removeClass("is-invalid");
                    }
                }
            });
    }
    $("#nemailU2").on("keyup change",function(){
        if($.trim($("#nemailU2").val()).length > 0)
        {
            $('#nemailU2').removeClass("is-invalid");
            loadAllEmployeesByEmail2($("#nemailU2").val());
        }
        else
        {
            $('#nemailU2').addClass("is-invalid");
        }
    });

    // 
    var UpdateEmployeeEmail = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);


        $.ajax({
            url: api_base_URL+"/api/logins/update-user-authentication-email",
            method: "PUT",
            data: {
                id: $('#idu3').val(),
                username: $('#nemailU2').val(),
            },
            headers : {
                role : decryptLoginInfo.status_id,
            },
            complete: function (xhr, status) {
                console.log($('#nemailU2').val()+"   "+ $('#idu3').val())
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    if(data.affectedRows >= 1)
                    {
                        $("#msgU3").removeClass("alert-danger");
                        $("#msgU3").addClass("alert-success");
                        $('#msgU3').html('<small>Email Updated.</small>');
                        $('#msgU3').removeAttr('hidden');
                    }
                    else 
                    {
                        alert("this")
                        $("#msgU3").removeClass("alert-success");
                        $("#msgU3").addClass("alert-danger");
                        $('#msgU3').html('<small>Something Went Wrong.</small>');
                        $('#msgU3').removeAttr('hidden');
                    }
                }
                else 
                {
                    $("#msgU3").removeClass("alert-success");
                    $("#msgU3").addClass("alert-danger");
                    $('#msgU3').html('<small>Something Went Wrong.</small>');
                    $('#msgU3').removeAttr('hidden');
                }
                LoadAllEmployees();
                LoadEmployee($('#id').val());
                LoadEmployeeLoginDetails2($('#idu3').val());
            }
        });
    }

    $("#updateEmailBTN").click(function () {
        $('#msgU3').attr('hidden', true);

        if($('#nemailU2').hasClass("is-invalid"))
        {
            $('#nemailU2').addClass("is-invalid");
        }
        else
        {
            UpdateEmployeeEmail();
        }
    });


    // 
    var UpdateEmployeeLoginRole = function(role){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        if(role == 1)
        {
            role = 1;
        }
        else
        {
            role = 3;
        }

        $.ajax({
            url: api_base_URL+"/api/logins/update-user-authentication-role",
            method: "PUT",
            data: {
                id: $('#idU4').val(),
                status_id: role,
            },
            headers : {
                role : decryptLoginInfo.status_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    if(data.affectedRows >= 1)
                    {
                        $("#msgU4").removeClass("alert-danger");
                        $("#msgU4").addClass("alert-success");
                        $('#msgU4').html('<small>Role Updated.</small>');
                        $('#msgU4').removeAttr('hidden');
                    }
                    else 
                    {
                        $("#msgU4").removeClass("alert-success");
                        $("#msgU4").addClass("alert-danger");
                        $('#msgU4').html('<small>Something Went Wrong.</small>');
                        $('#msgU4').removeAttr('hidden');
                    }
                }
                else 
                {
                    $("#msgU4").removeClass("alert-success");
                    $("#msgU4").addClass("alert-danger");
                    $('#msgU4').html('<small>Something Went Wrong.</small>');
                    $('#msgU4').removeAttr('hidden');
                }
                LoadAllEmployees();
                LoadEmployee($('#id').val());
                LoadEmployeeLoginDetails($('#idu3').val());
                LoadEmployeeLoginDetails2($('#idU4').val());
            }
        });
    }

    var UpdateEmployeeRole = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        var role = 0;
        if($('#roleU4').val() == 1)
        {
            role = 2;
        }
        else
        {
            role = 1;
        }

        $.ajax({
            url: api_base_URL+"/api/employees/update-user-authentication-role",
            method: "PUT",
            data: {
                id: $('#idU4').val(),
                status_id: role,
            },
            headers : {
                role : decryptLoginInfo.status_id,
            },
            complete: function (xhr, status) {
                
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    if(data.affectedRows >= 1)
                    {
                        UpdateEmployeeLoginRole(role);
                    }
                    else 
                    {
                        alert("Wrong")
                    }
                }
                else 
                {
                    alert("Wrong")
                }
            }
        });
    }

    $("#updateRoleBTN").click(function () {
        $('#msgU4').attr('hidden', true);
        UpdateEmployeeRole();
    });

    // 
    var validateEmployeeUpdate= function() {
        var validate = true;
        if($.trim($('#nameU').val()).length <= 0)
        {
            validate = false;
            $('#nameU').addClass("is-invalid");
        }
        else
        {
            $("#nameU").removeClass("is-invalid");
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

        if($.trim($("#deptU").val()).length <= 0)
        {
            validate = false;
            $("#deptU").addClass("is-invalid");
        }
        else
        {
            $("#deptU").removeClass("is-invalid");
        }

        if($("#salaryU").val() <= 0)
        {
            validate = false;
            $("#salaryU").addClass("is-invalid");
        }
        else
        {
            $("#salaryU").removeClass("is-invalid");
        }

        if(!validate)
        {
            $('#msgP').attr('hidden', true);
        }

        return validate;
    }

    var UpdateEmployee = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/employees/update-employee/"+id,
            method: "PUT",
            data : {
                id: $('#id').val(),
                name: $('#nameU').val(),
                phone_no: $('#contactU').val(),
                address: $('#addressU').val(),
                salary: $('#salaryU').val(),
                department: $('#deptU').val(),
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
                LoadAllEmployees();
                LoadEmployee(id);
            }
        });
    }

    $("#updateBTN").click(function () {
        $('#msgU').attr('hidden', true);
        if(validateEmployeeUpdate())
        {
            UpdateEmployee($('#id').val());
        }
    });


    // 
    var loadAllEmployeesByNameOrESSN = function (param) {
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);

            $.ajax({
                url: api_base_URL+"/api/employees/name/"+param+"/essn/"+param,
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
                                            "<td>"+ data[i].essn  +"</td>"+
                                            "<td>"+ data[i].name +"</td>"+
                                            "<td>"+ data[i].department  +"</td>"+
                                            "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateEmployeeModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-edit'></i> Edit</button></td>"+
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
    $("#search").on("keyup change",function(){
        if($.trim($("#search").val()).length > 0)
        {
            loadAllEmployeesByNameOrESSN($("#search").val());
        }
        else
        {
            LoadAllEmployees();
        }
    });

});