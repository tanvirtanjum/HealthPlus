// Importing System Library Modules
const validator = require('validator');

const physiciansService = require("../services/physicians.service");


exports.getAllPhysicians = (req, res, next) => {
    var validated = true;
    const data = {};

    if(validated){
        physiciansService.getAllPhysicians(data, (error, results) => {
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


exports.getPhysician = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(validated){
        physiciansService.getPhysician(data, (error, results) => {
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

exports.getPhysiciansByNameOrEssn = (req, res, next) => {
    var validated = true;
    const data = {
        'param1' : "%"+req.params.param1+"%",
        'param2' : "%"+req.params.param2+"%",
    };

    if(validated){
        physiciansService.getPhysiciansByNameOrEssn(data, (error, results) => {
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

exports.postPhysician = (req, res, next) => {
    var validated = true;
    const data = {
        'login_id' : req.body.login_id,
        'name' : req.body.name,
        'pssn' : req.body.pssn,
        'phone_no' : req.body.phone_no,
        'address' : req.body.address,
        'department' : req.body.department,
        'internship' : req.body.internship,
        'employee_id' : req.body.employee_id,
    };

    if(data.login_id <= 0) {
        validated = false;
    }

    if(validator.isEmpty(data.name , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.pssn , {ignore_whitespace: true})) {
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

    if(validator.isEmpty(data.internship, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.employee_id, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        console.log(data);
        physiciansService.postPhysician(data, (error, results) => {
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

exports.updatePhysician = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
        'name' : req.body.name,
        'phone_no' : req.body.phone_no,
        'address' : req.body.address,
        'department' : req.body.department,
        'internship' : req.body.internship,
        'employee_id' : req.body.employee_id,
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

    if(validator.isEmpty(data.internship, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.employee_id, {ignore_whitespace: true})) {
        validated = false;
    }


    if(validated){
        physiciansService.updatePhysician(data, (error, results) => {
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
