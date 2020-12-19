const AuthRouter = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const { check, validationResult } = require('express-validator');

var createToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

var authRes = {
        authStatus: false,
        message: '',
        accessToken: null,
        user: {}
    }
    //The bearer token should be stored in local-storage(preffered) or cookie at frontend to be sent with every request
AuthRouter.route('/student/login')
    .post((req, res) => {

        var bearerHeader = req.headers['authorization'];

        if (typeof bearerHeader != 'undefined') {

            const bearerToken = bearerHeader.split(' ')[1]; //get token

            //verify token sent by user
            jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
                if (err) {

                } else {
                    res.redirect('/dashboard');
                }
            })
        } else {

            //if no authorised token then manaul login

            //USN should be in CAPS
            const usn = req.body.usn;
            Student.findOne({ usn: usn }).then((student) => {
                    if (!student) {
                        res.setHeader('Content-Type', 'application/json');

                        authRes.authStatus = false;
                        authRes.message = "no student found";
                        //Send status
                        res.json(authRes);
                    } else if (student.password != req.body.password) {
                        res.setHeader('Content-Type', 'application/json');
                        authRes.message = "Password Incorrect";
                        res.json(authRes);
                    } else {
                        res.setHeader('Content-Type', 'application/json');

                        authRes.accessToken = createToken({ usn: student.usn });
                        authRes.message = "Login Successful";
                        authRes.authStatus = true;
                        authRes.user = {
                            name: {
                                last: student.name.first,
                                first: student.name.last
                            },
                            subjects: student.subjects,
                            _id: student._id,
                            usn: student.usn,
                            email: student.email,
                            branch: student.branch,
                            semester: student.semester,
                            mobile: student.mobile,
                        };
                        res.json({ authRes });
                    }
                })
                .catch((err) => {
                    res.send(err);
                })
        }
    })

AuthRouter.route('/student/register')
    .post([check('first').isLength({ min: 3 }), check('email').isEmail(), check('last').isAlpha(),
        check('branch').isAlpha({ min: 2 }), check('semester').isNumeric({ min: 1 }), check('mobile').isMobilePhone('en-IN'),
        check('password').custom(password => {
            if (password && password.match(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/)) {
                return true;
            }
        }), check('usn').custom(usn => {
            if (usn && usn.match(/1RN[1-9][1-9](CS|IS|EC|EE|ME|EI)[0-9][0-9][0-9]/g))
                return true;
        })
    ], async(req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        var usn = req.body.usn;

        Student.findOne({ usn: usn }, 'usn').then((user) => {
            if (user) {
                res.setHeader('Content-Type', 'application/json');
                res.send(user);
            } else {
                var first = req.body.name.first;
                var last = req.body.name.last;
                var email = req.body.email;
                var password = req.body.password;
                var branch = req.body.branch;
                var semester = req.body.semester;
                var mobile = req.body.mobile;

                var student = new Student({
                    usn: usn,
                    name: { first: first, last: last },
                    email: email,
                    password: password,
                    branch: branch,
                    semester: semester,
                    mobile: mobile
                });

                student.save().then((newStudent) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.json(newStudent);
                })
            }
        })
    })

// res.send("Register")

//var userExists = await Student.findOne({usn : req.body.usn});

// if(userExists){
//     res.send('Student Already Exists');
// }else{
//     
//     var saved = student.save();
//     res.setHeader('Content-Type', 'application/json');
//}

module.exports = AuthRouter;