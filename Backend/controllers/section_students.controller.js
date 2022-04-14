// Importing System Library Modules
const validator = require('validator');

// Importing Created Modules
const section_studentsService = require("../services/section_students.service");


exports.getStudents = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(validated){
        section_studentsService.getStudents(data, (error, results) => {
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

exports.postStudent = (req, res, next) => {
    var validated = true;
    const data = {
        'section_id' : req.body.section_id,
        'student_id' : req.body.student_id,
    };

    if(validator.isEmpty(data.student_id , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        section_studentsService.postStudent(data, (error, results) => {
            if (error) {
                console.log(error)
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                return res.status(201).send(results);
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.deleteStudent = (req, res, next) => {
    var validated = true;
    const data = {
        'section_id' : req.params.section_id,
        'student_id' : req.params.student_id,
    };

    if(data.student_id <= 0) {
        validated = false;
    }

    if(validated){
        section_studentsService.deleteStudent(data, (error, results) => {
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
