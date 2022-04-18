// Importing System Library Modules
const validator = require('validator');

const employeesService = require("../services/employees.service");


exports.getAllEmployees = (req, res, next) => {
    var validated = true;
    const data = {};

    if(validated){
        employeesService.getAllEmployees(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    return res.status(200).send(results);
                }
    
                else {
                    return res.status(204).send({ success: false, data: "No Data Found." });
                }
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.updateUserRole = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.body.id,
        'status_id' : req.body.status_id,
    };
    // Validation Code here
    if(validator.isEmpty(data.status_id , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated) {
        employeesService.updateUserRole(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                // console.log(13);
                return res.status(200).send(results);
            }
        });
    } else{
        // console.log(11);
        return res.status(400).send({ success: false, data: "Page Not Properly Validated." });
    }

};

exports.getEmployee = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(validated){
        employeesService.getEmployee(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    return res.status(200).send(results[0]);
                }
    
                else {
                    return res.status(204).send({ success: false, data: "No Data Found." });
                }
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};


exports.getEmployeeByLogin = (req, res, next) => {
    var validated = true;
    const data = {
        'login_id' : req.params.id,
    };

    if(validated){
        employeesService.getEmployeeByLogin(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    return res.status(200).send(results[0]);
                }
    
                else {
                    return res.status(204).send({ success: false, data: "No Data Found." });
                }
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.getEmployeeByNameOrEssn = (req, res, next) => {
    var validated = true;
    const data = {
        'param1' : "%"+req.params.param1+"%",
        'param2' : "%"+req.params.param2+"%",
    };

    if(validated){
        employeesService.getEmployeeByNameOrEssn(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    return res.status(200).send(results);
                }
    
                else {
                    return res.status(204).send({ success: false, data: "No Data Found." });
                }
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.postEmployee = (req, res, next) => {
    var validated = true;
    const data = {
        'login_id' : req.body.login_id,
        'name' : req.body.name,
        'essn' : req.body.essn,
        'phone_no' : req.body.phone_no,
        'address' : req.body.address,
        'department' : req.body.department,
        'salary' : req.body.salary,
        'admin_status_id' : req.body.admin_status_id,
    };

    if(data.login_id <= 0) {
        validated = false;
    }

    if(validator.isEmpty(data.name , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.essn , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.phone_no, {ignore_whitespace: true})) {
        validated = false;
    }


    if(validator.isEmpty(data.address, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.department, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.salary, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.admin_status_id, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        console.log(data);
        employeesService.postEmployee(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                return res.status(201).send(results);
            }
        });
    }
    else{
        console.log("E 2");
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.updateEmployee = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
        'name' : req.body.name,
        'phone_no' : req.body.phone_no,
        'address' : req.body.address,
        'department' : req.body.department,
        'salary' : req.body.salary,
    };

    if(data.id <= 0) {
        validated = false;
    }

    if(validator.isEmpty(data.name , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.phone_no, {ignore_whitespace: true})) {
        validated = false;
    }


    if(validator.isEmpty(data.address, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.department, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.salary, {ignore_whitespace: true})) {
        validated = false;
    }


    if(validated){
        employeesService.updateEmployee(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                return res.status(200).send(results);
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};
