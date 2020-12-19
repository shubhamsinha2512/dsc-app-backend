const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSmallDetails = new Schema({
    subjectCode:{type:String, required:false},
    subjectName:{type:String, required:false},
    latestUpdate:{type:String, required:false}
});

module.exports = mongoose.model("SubjectSmallDetails", subjectSmallDetails);