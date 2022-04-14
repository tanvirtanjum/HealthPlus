// Importing System Library Modules
const validator = require('validator');

// Importing Created Modules
const section_course_resultsService = require("../services/section_course_results.service");


exports.getResult = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(validated){
        section_course_resultsService.getResult(data, (error, results) => {
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

exports.getVerification = (req, res, next) => {
    var validated = true;
    const data = {
        'section_course_id' : req.params.course_id,
        'term_id' : req.params.term_id,
        'student_id' : req.params.student_id,
        'section_id' : req.params.section_id,
    };

    if(validated){
        section_course_resultsService.getVerification(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    console.log(results)
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

exports.getStudentResult = (req, res, next) => {
    var validated = true;
    const data = {
        'student_id' : req.params.student_id,
        'session_id' : req.params.session_id,
    };

    if(validated){
        section_course_resultsService.getStudentResult(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    console.log(results)
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

exports.getStudentResultTerm = (req, res, next) => {
    var validated = true;
    const data = {
        'student_id' : req.params.student_id,
        'session_id' : req.params.session_id,
        'term_id' : req.params.term_id,
    };

    if(validated){
        section_course_resultsService.getStudentResultTerm(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    console.log(results)
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

exports.getResultsBySectionCourse = (req, res, next) => {
    var validated = true;
    const data = {
        'section_course_id' : req.params.course_id,
        'term_id' : req.params.term_id,
        'section_id' : req.params.section_id,
    };

    if(validated){
        section_course_resultsService.getResultsBySectionCourse(data, (error, results) => {
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

exports.postResult = (req, res, next) => {
    var validated = true;
    const data = {
        'student_id' : req.body.student_id,
        'ct1' : req.body.ct1,
        'ct2' : req.body.ct2,
        'termfinal' : req.body.termfinal,
        'session_id' : req.body.session_id,
        'section_id' : req.body.section_id,
        'section_course_id' : req.body.section_course_id,
        'term_id' : req.body.term_id,
        'remark_id' : req.body.remark_id,
    };

    if(validator.isEmpty(data.student_id , {ignore_whitespace: true})) {
        validated = false;
    }

    if(!validator.isNumeric(data.ct1))
    {
        validated = false;
    }

    if(!validator.isNumeric(data.ct2))
    {
        validated = false;
    }

    if(!validator.isNumeric(data.termfinal))
    {
        validated = false;
    }

    if(data.ct1 < 0){
        validated = false;
    }

    if(data.ct2 < 0){
        validated = false;
    }

    if(data.termfinal < 0){
        validated = false;
    }

    if(validated){
        section_course_resultsService.postResult(data, (error, results) => {
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
        console.log(data)
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.updateResult = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
        'student_id' : req.body.student_id,
        'ct1' : req.body.ct1,
        'ct2' : req.body.ct2,
        'termfinal' : req.body.termfinal,
        'session_id' : req.body.session_id,
        'section_id' : req.body.section_id,
        'section_course_id' : req.body.section_course_id,
        'term_id' : req.body.term_id,
        'remark_id' : req.body.remark_id,
    };

    if(data.id <= 0) {
        validated = false;
    }

    if(validator.isEmpty(data.student_id , {ignore_whitespace: true})) {
        validated = false;
    }

    if(!validator.isNumeric(data.ct1))
    {
        validated = false;
    }

    if(!validator.isNumeric(data.ct2))
    {
        validated = false;
    }

    if(!validator.isNumeric(data.termfinal))
    {
        validated = false;
    }

    if(data.ct1 < 0){
        validated = false;
    }

    if(data.ct2 < 0){
        validated = false;
    }

    if(data.termfinal < 0){
        validated = false;
    }

    if(validated){
        section_course_resultsService.updateResult(data, (error, results) => {
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
        
        console.log(data)
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};


