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

exports.getRecord = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(validated){
        medical_recordsService.getRecord(data, (error, results) => {
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
        'sex' : req.body.sex,
        'patient_id' : req.body.patient_id,
        'disability_status' : req.body.disability_status,
        'diabetes_status' : req.body.diabetes_status,
        'blood_pressure_status' : req.body.blood_pressure_status,
        'allergies_status' : req.body.allergies_status,
    };

    if(validator.isEmpty(data.patient_id , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        console.log(data);
        medical_recordsService.postRecord(data, (error, results) => {
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
        'sex' : req.body.sex,
        'disability_status' : req.body.disability_status,
        'diabetes_status' : req.body.diabetes_status,
        'blood_pressure_status' : req.body.blood_pressure_status,
        'allergies_status' : req.body.allergies_status,
    };

    if(data.id <= 0) {
        validated = false;
    }


    if(validated){
        medical_recordsService.updateRecord(data, (error, results) => {
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
