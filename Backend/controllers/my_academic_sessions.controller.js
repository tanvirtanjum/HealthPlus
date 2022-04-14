// Importing System Library Modules
const validator = require('validator');

// Importing Created Modules
const my_academic_sessionsService = require("../services/my_academic_sessions.service");


exports.getStudents = (req, res, next) => {
    var validated = true;
    const data = {
        'student_id' : req.params.student_id,
        'session_id' : req.params.session_id,
    };

    if(validated){
        my_academic_sessionsService.getStudents(data, (error, results) => {
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

exports.getMyStudentSession = (req, res, next) => {
    var validated = true;
    const data = {
        'student_id' : req.params.student_id,
    };

    if(validated){
        my_academic_sessionsService.getMyStudentSession(data, (error, results) => {
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

exports.postStudent = (req, res, next) => {
    var validated = true;
    const data = {
        'academic_session_id' : req.body.academic_session_id,
        'section_id' : req.body.section_id,
        'student_id' : req.body.student_id,
    };

    if(validator.isEmpty(data.student_id , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        my_academic_sessionsService.postStudent(data, (error, results) => {
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

exports.deleteSession = (req, res, next) => {
    var validated = true;
    const data = {
        'academic_session_id' : req.params.session_id,
        'section_id' : req.params.section_id,
        'student_id' : req.params.student_id,
    };

    if(data.academic_session_id <= 0) {
        validated = false;
    }

    if(validated){
        my_academic_sessionsService.deleteSession(data, (error, results) => {
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
