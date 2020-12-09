const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subjectSmallDetails = require('./partials/subjectSmallDetails');

const teacherSmallDetails = new Schema({
    teacherId:{
        type:String,
        required:[true, "teacher id not specified"]
    },
    name:{
        first:{type:String, required:[true, "first name not specified"]},
        last:{type:String, required:[true, "last name not specified"]}
    }
});

module.exports = mongoose.model('teacherSmallDetails', teacherSmallDetails);