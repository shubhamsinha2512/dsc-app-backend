const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSmallSchema = new Schema({
    subjectCode:{type:String, required:true},
    subjectName:{type:String, required:false},
    title:{type:String, required:false}
});

module.exports = mongoose("assignmentSmallSchema", assignmentSmallSchema);