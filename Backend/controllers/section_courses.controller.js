// Importing System Library Modules
const validator = require('validator');

// Importing Created Modules
const section_coursesService = require("../services/section_courses.service");


exports.getCourse = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(validated){
        section_coursesService.getCourse(data, (error, results) => {
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

exports.getCourseBySession_Teacher = (req, res, next) => {
    var validated = true;
    const data = {
        'session_id' : req.params.session_id,
        'teacher_id' : req.params.teacher_id,
    };

    if(validated){
        section_coursesService.getCourseBySession_Teacher(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    // console.log(results)
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

exports.getCoursesBySection = (req, res, next) => {
    var validated = true;
    const data = {
        'section_id' : req.params.id,
    };

    if(validated){
        section_coursesService.getCoursesBySection(data, (error, results) => {
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

exports.postCourse = (req, res, next) => {
    var validated = true;
    const data = {
        'session_id' : req.body.session_id,
        'section_id' : req.body.section_id,
        'subject_id' : req.body.subject_id,
        'class_timing' : req.body.class_timing,
        'teacher_id' : req.body.teacher_id,
    };

    if(validator.isEmpty(data.class_timing , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        section_coursesService.postCourse(data, (error, results) => {
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

exports.updateCourse = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
        'subject_id' : req.body.subject_id,
        'class_timing' : req.body.class_timing,
        'teacher_id' : req.body.teacher_id,
    };

    if(data.id <= 0) {
        validated = false;
    }

    if(validator.isEmpty(data.class_timing , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        section_coursesService.updateCourse(data, (error, results) => {
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

exports.deleteCourse = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(data.id <= 0) {
        validated = false;
    }

    if(validated){
        section_coursesService.deleteCourse(data, (error, results) => {
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
