const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const assignmentSmallDetails = require('./partials/assignmentSmallDetails');

const SubjectSchema = new Schema({
    subjectCode:{
        type:String,
        required:[true, "sub code not specified"]
    },
    name:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    latestUpdate:{
        type:String,
    },
    assignments:[assignmentSmallDetails],
    announcements:[],
    notes:[]
},{
    timestamps:true
});

module.exports = mongoose.model("Subject", SubjectSchema);