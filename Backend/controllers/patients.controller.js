// Importing System Library Modules
const validator = require('validator');

const patientsService = require("../services/patients.service");


exports.getAllPatients = (req, res, next) => {
    var validated = true;
    const data = {};

    if(validated){
        patientsService.getAllPatients(data, (error, results) => {
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


exports.getPatient = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(validated){
        patientsService.getPatient(data, (error, results) => {
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


exports.getPatientByNameOrSsn = (req, res, next) => {
    var validated = true;
    const data = {
        'param1' : "%"+req.params.param1+"%",
        'param2' : "%"+req.params.param2+"%",
    };

    if(validated){
        patientsService.getPatientByNameOrSsn(data, (error, results) => {
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

exports.postPatient = (req, res, next) => {
    var validated = true;
    const data = {
        'insurance_id' : req.body.insurance_id,
        'name' : req.body.name,
        'ssn' : req.body.ssn,
        'dob' : req.body.dob,
        'phone_no' : req.body.phone_no,
        'address' : req.body.address,
        'physician_id' : req.body.physician_id,
    };

    if(data.insurance_id <= 0) {
        validated = false;
    }

    if(validator.isEmpty(data.name , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.ssn , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.phone_no, {ignore_whitespace: true})) {
        validated = false;
    }


    if(validator.isEmpty(data.address, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.physician_id, {ignore_whitespace: true})) {
        validated = false;
    }


    if(validated){
        console.log(data);
        patientsService.postPatient(data, (error, results) => {
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

exports.updatePatient = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
        'name' : req.body.name,
        'dob' : req.body.dob,
        'phone_no' : req.body.phone_no,
        'address' : req.body.address,
        'physician_id' : req.body.physician_id,
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

    if(validator.isEmpty(data.physician_id, {ignore_whitespace: true})) {
        validated = false;
    }


    if(validated){
        patientsService.updatePatient(data, (error, results) => {
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
