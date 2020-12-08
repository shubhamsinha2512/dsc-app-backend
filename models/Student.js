const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subjectSmallDetails = require('./partials/subjectSmallDetails');

const StudentSchema = new Schema({
    usn:{
        type:String,
        required:[true, "usn not specified"]
    },
    name:{
        first:{ type:String, required:[true, 'first name not specified'] },
        last:{ type:String, required:false, default:"" }
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
    semester:{
        type:String,
        required:[true, "semester not specified"]
    },
    mobile:{
        type:Number,
        required:[false, "mobile no. not specified"]
    },
    subjects:[subjectSmallDetails]

},{
    timestamps:true
});

module.exports = mongoose.model("Studnet", StudentSchema);