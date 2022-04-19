// Importing System Library Modules
const validator = require('validator');

const appointmentsService = require("../services/appointments.service");

exports.getAllRecords = (req, res, next) => {
    var validated = true;
    const data = {};

    if(validated){
        appointmentsService.getAllRecords(data, (error, results) => {
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

exports.getRecord = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(validated){
        appointmentsService.getRecord(data, (error, results) => {
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


exports.postRecord = (req, res, next) => {
    var validated = true;
    const data = {
        'patient_id' : req.body.patient_id,
        'physician_id' : req.body.physician_id ,
        'employee_id' : req.body.employee_id,
        'date_for' : req.body.date_for,
        'times' : req.body.times,
    };

    if(validator.isEmpty(data.date_for , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.times , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        console.log(data);
        appointmentsService.postRecord(data, (error, results) => {
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

exports.updateRecord = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
        'patient_id' : req.body.patient_id,
        'physician_id' : req.body.physician_id ,
        'employee_id' : req.body.employee_id,
        'date_for' : req.body.date_for,
        'times' : req.body.times,
    };

    if(validator.isEmpty(data.date_for , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.times , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        appointmentsService.updateRecord(data, (error, results) => {
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

exports.deleteRecord = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    

    if(validated){
        appointmentsService.deleteRecord(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                return res.status(204).send(results);
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};
