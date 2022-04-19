// Importing System Library Modules
const validator = require('validator');

const prescriptionsService = require("../services/prescriptions.service");

exports.getAllRecords = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(validated){
        prescriptionsService.getAllRecords(data, (error, results) => {
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

exports.getRecordByAppointment = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(validated){
        prescriptionsService.getRecordByAppointment(data, (error, results) => {
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


exports.postRecord = (req, res, next) => {
    var validated = true;
    const data = {
        'patient_id' : req.body.patient_id,
        'physician_id' : req.body.physician_id ,
        'appointment_id' : req.body.appointment_id,
        'examination' : req.body.examination,
    };

    if(validator.isEmpty(data.examination , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        console.log(data);
        prescriptionsService.postRecord(data, (error, results) => {
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
        'examination' : req.body.examination,
    };

    if(validator.isEmpty(data.examination , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        prescriptionsService.updateRecord(data, (error, results) => {
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
