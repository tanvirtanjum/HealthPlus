// Importing System Library Modules
const validator = require('validator');
const nodemailer = require('nodemailer');


var emailCheck = require('email-check');


// Importing Created Modules
const loginsService = require("../services/logins.service");

var transporter = nodemailer.createTransport({
    service: process.env.RECPASS_SERVICE,
    auth: {
      user: process.env.RECPASS_EMAIL,
      pass: process.env.RECPASS_EMAIL_PASS 
    }
});

exports.getUser = (req, res, next) => {
    var validated = true;
    const data = {
        'email' : req.body.email,
        'password' : req.body.password,
    };
    // Validation Code here
    if(!validator.isEmail(data.email)) {
        validated = false;
    }
    if(validator.isEmpty(data.password , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated) {
        loginsService.getUser(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    return res.status(200).send(results[0]);

                } else {
                    return res.status(204).send({ success: false, data: "No User Found." });
                }
            }
        });
    } else{
        return res.status(400).send({ success: false, data: "Page Not Properly Validated." });
    }

};

exports.getUserPassword = (req, res, next) => {
    var validated = true;
    const data = {
        'email' : req.body.email,
    };
    // Validation Code here
    if(!validator.isEmail(data.email)) {
        validated = false;
    }

    if(validated) {
        loginsService.getUserPassword(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                      
                    var mailOptions = {
                        from: process.env.RECPASS_EMAIL,
                        to: results[0].email,
                        subject: 'Recover Password (KFT Portal)',
                        html: '<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">'+
                                '<table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: "Open" Sans", sans-serif;">'+
                                    '<tr>'+
                                        '<td>'+
                                        ' <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">'+
                                                '<tr>'+
                                                    '<td style="height:80px;">&nbsp;</td>'+
                                                '</tr>'+
                                            
                                                '<tr>'+
                                                    '<td style="height:20px;">&nbsp;</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td>'+
                                                        '<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">'+
                                                            '<tr>'+
                                                                '<td style="height:40px;">&nbsp;</td>'+
                                                            '</tr>'+
                                                            '<tr>'+
                                                                '<td style="padding:0 35px;">'+
                                                                    '<h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:"Rubik",sans-serif;">'+
                                                                        'You have requested to recover your password'+
                                                                    '</h1>'+
                                                                    '<span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>'+
                                                                    '<p style="color:#455056; font-size:15px;line-height:24px; margin:0;">'+
                                                                        '<p>Email: <b><i>'+results[0].email+'</i></b></p>'+
                                                                        '<p>Password: <b style="color:blue;">'+results[0].password+'</b></p>'+
                                                                        '<p>Access: <b style="color:red;">'+results[0].access_name+'</b></p>'+
                                                                    '</p>'+
                                                                    '<a href="javascript:void(0);" style="background:#20e25a;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">'+
                                                                        'For safety change your password after login.'+
                                                                    '</a>'+
                                                                '</td>'+
                                                            '</tr>'+
                                                            '<tr>'+
                                                                '<td style="height:40px;">&nbsp;</td>'+
                                                            '</tr>'+
                                                        '</table>'+
                                                    '</td>'+
                                                '<tr>'+
                                                    '<td style="height:20px;">&nbsp;</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td style="text-align:center;">'+
                                                    ' <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>KFT Collegiate School</strong></p>'+
                                                    '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td style="height:80px;">&nbsp;</td>'+
                                                '</tr>'+
                                            '</table>'+
                                        '</td>'+
                                    '</tr>'+
                                '</table>'+
                            '</body>'
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            return res.status(204).send({ success: false, data: "Something went wrong." });
                        } else {
                            return res.status(200).send({ success: true, data: "Password sent to email." });
                        }
                    });

                    // return res.status(200).send(results[0]);

                } else {
                    return res.status(204).send({ success: false, data: "No User Found." });
                }
            }
        });
    } else{
        return res.status(400).send({ success: false, data: "Page Not Properly Validated." });
    }

};

exports.updateUserPassword = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.body.id,
        'password' : req.body.password,
    };
    // Validation Code here
    if(validator.isEmpty(data.password , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated) {
        loginsService.updateUserPassword(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    return res.status(200).send(results);

                } else {
                    return res.status(204).send({ success: false, data: "No User Found." });
                }
            }
        });
    } else{
        return res.status(400).send({ success: false, data: "Page Not Properly Validated." });
    }

};

exports.postUser = (req, res, next) => {
    var validated = true;
    const data = {
        'email' : req.body.email,
        'password' : req.body.password,
        'role_id' : req.body.role_id,
        'access_id' : req.body.access_id,
    };

    if(validator.isEmpty(data.email , {ignore_whitespace: true})) {
        validated = false;
    }

    if(!validator.isEmail(data.email)) {
        validated = false;
    }

    if(validator.isEmpty(data.password , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.role_id , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.access_id , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        loginsService.postUser(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {

                // console.log(results);
                return res.status(201).send(results);
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.getEmail = (req, res, next) => {
    var validated = true;
    const data = {
        'email' : "%"+req.params.email+"%",
    };
    // Validation Code here
    // if(!validator.isEmail(data.email)) {
    //     validated = false;
    // }

    if(validated) {
        loginsService.getEmail(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    // console.log("1");
                    return res.status(200).send(results[0]);

                } else {
                    // console.log("2");
                    return res.status(204).send({ success: false, data: "No User Found." });
                }
            }
        });
    } else{
        // console.log("3");
        return res.status(400).send({ success: false, data: "Page Not Properly Validated." });
    }

};

exports.getLogin = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };
    // Validation Code here

    if(validated) {
        loginsService.getLogin(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    return res.status(200).send(results[0]);

                } else {
                    return res.status(204).send({ success: false, data: "No User Found." });
                }
            }
        });
    } else{
        return res.status(400).send({ success: false, data: "Page Not Properly Validated." });
    }

};

exports.updateUserEmail = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.body.id,
        'email' : req.body.email,
    };
    // Validation Code here
    if(validator.isEmpty(data.email , {ignore_whitespace: true})) {
        validated = false;
    }

    if(!validator.isEmail(data.email)) {
        validated = false;
    }

    emailCheck(data.email)
    .then(function (res) {
        // Returns "true" if the email address exists, "false" if it doesn't.
    })
    .catch(function (err) {
        if (err.message === 'refuse') {
        // The MX server is refusing requests from your IP address.
        validated = false;
        } else {
        // Decide what to do with other errors.
        validated = false;
        }
    });

    if(validated) {
        loginsService.updateUserEmail(data, (error, results) => {
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

exports.updateUserRole = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.body.id,
        'role_id' : req.body.role_id,
        'access_id': req.body.access_id
    };
    // Validation Code here
    if(validator.isEmpty(data.role_id , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.access_id , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated) {
        loginsService.updateUserRole(data, (error, results) => {
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

exports.getUserLogout = (req, res, next) => {
    return res.status(200).send({ success: true, data: "User Logged Out." });
};


exports.sendUserPassword = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.body.id,
    };
    // Validation Code here

    if(validated) {
        loginsService.sendUserPassword(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                      
                    var mailOptions = {
                        from: process.env.RECPASS_EMAIL,
                        to: results[0].email,
                        subject: 'Account Created (KFT Portal)',
                        html: '<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">'+
                                '<table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: "Open" Sans", sans-serif;">'+
                                    '<tr>'+
                                        '<td>'+
                                        ' <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">'+
                                                '<tr>'+
                                                    '<td style="height:80px;">&nbsp;</td>'+
                                                '</tr>'+
                                            
                                                '<tr>'+
                                                    '<td style="height:20px;">&nbsp;</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td>'+
                                                        '<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">'+
                                                            '<tr>'+
                                                                '<td style="height:40px;">&nbsp;</td>'+
                                                            '</tr>'+
                                                            '<tr>'+
                                                                '<td style="padding:0 35px;">'+
                                                                    '<h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:"Rubik",sans-serif;">'+
                                                                        'Your KFT account has been created.'+
                                                                    '</h1>'+
                                                                    '<span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>'+
                                                                    '<p style="color:#455056; font-size:15px;line-height:24px; margin:0;">'+
                                                                        '<p>Email: <b><i>'+results[0].email+'</i></b></p>'+
                                                                        '<p>Password: <b style="color:blue;">'+results[0].password+'</b></p>'+
                                                                        '<p>Access: <b style="color:red;">'+results[0].access_name+'</b></p>'+
                                                                    '</p>'+
                                                                    '<a href="javascript:void(0);" style="background:#20e25a;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">'+
                                                                        'For safety change your password after login.'+
                                                                    '</a>'+
                                                                '</td>'+
                                                            '</tr>'+
                                                            '<tr>'+
                                                                '<td style="height:40px;">&nbsp;</td>'+
                                                            '</tr>'+
                                                        '</table>'+
                                                    '</td>'+
                                                '<tr>'+
                                                    '<td style="height:20px;">&nbsp;</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td style="text-align:center;">'+
                                                    ' <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>KFT Collegiate School</strong></p>'+
                                                    '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td style="height:80px;">&nbsp;</td>'+
                                                '</tr>'+
                                            '</table>'+
                                        '</td>'+
                                    '</tr>'+
                                '</table>'+
                            '</body>'
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            return res.status(204).send({ success: false, data: "Something went wrong." });
                        } else {
                            return res.status(200).send({ success: true, data: "Password sent to email." });
                        }
                    });

                    // return res.status(200).send(results[0]);

                } else {
                    return res.status(204).send({ success: false, data: "No User Found." });
                }
            }
        });
    } else{
        return res.status(400).send({ success: false, data: "Page Not Properly Validated." });
    }

};