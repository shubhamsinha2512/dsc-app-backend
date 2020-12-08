const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subjectSmallDetails = require('./partials/subjectSmallDetails');

const TeacherSchema = new Schema({
    teacherId:{
        type:String,
        required:[true, "teacher id not specified"]
    },
    name:{
        first:{type:String, required:[true, "first name not specified"]},
        last:{type:String, required:[true, "last name not specified"]}
    },
    email:{
        type:String,
        required:[true, "email not specified"]
    },
    password:{
        type:String,
        required:[true, "password not specified"]
    },
    branch:{
        type:String,
        required:[true, "branch not specified"]
    },
    semesters:[Number],
    subjects:[subjectSmallDetails],
    assignments:[assignmentSmallSchema]

},{
    timestamps:true
})



module.exports = mongoose.model("Teacher", TeacherSchema);