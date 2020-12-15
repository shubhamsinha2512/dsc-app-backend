const AuthRouter = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

var createToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

var authRes = {
    authStatus:false,
    message:'',
    accessToken:null,
    user:{}
}

AuthRouter.route('/student/login')
    .post((req, res) => {
        //USN should be in CAPS

        var bearerHeader =req.headers['authorization'];

        if(typeof bearerHeader != 'undefined'){
            const bearerToken = bearerHeader.split(' ')[1];
            //verify token sent by user
            jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET, (err, data)=>{
                if(err){res.sendStatus(403)}
                else{
                    res.redirect('/dashboard');
                }
            })
        }else{
            const usn = req.body.usn;
            Student.findOne({usn:usn}).then((student)=>{
            if(!student){
                res.setHeader('Content-Type', 'application/json');

                authRes.authStatus=false;
                authRes.message="no student found";
                //Send status
                res.json(authRes);
            }
            else if(student.password != req.body.password){
                res.setHeader('Content-Type', 'application/json');
                authRes.message="Password Incorrect";
                res.json(authRes);
            }
            else{
                res.setHeader('Content-Type', 'application/json');
                
                authRes.accessToken = createToken({usn : student.usn});
                authRes.message="Login Successful";
                authRes.authStatus=true;
                authRes.user={
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
                res.json({authRes});
            }
        })
        .catch((err)=>{
            res.send(err);
        })
    }   
})

AuthRouter.route('/student/register')
    .post(async (req, res) => {

        var usn = req.body.usn;

        Student.findOne({usn:usn}, 'usn').then((user)=>{
            if(user){
                res.setHeader('Content-Type', 'application/json');
                res.send(user);
            }
            else{
                var first = req.body.name.first;
                var last = req.body.name.last;
                var email = req.body.email;
                var password = req.body.password;
                var branch = req.body.branch;
                var semester = req.body.semester;
                var mobile = req.body.mobile;

                var student = new Student({
                    usn: usn,
                    name: {first:first, last:last},
                    email: email,
                    password: password,
                    branch: branch,
                    semester: semester,
                    mobile: mobile
                });

                student.save().then((newStudent)=>{
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