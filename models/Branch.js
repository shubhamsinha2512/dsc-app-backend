const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const teacherSmallDetails = require('./partials/teacherSmallDetails');

const BranchSchema = new Schema({
    branchId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    branchName:{
        type:String,
        required:true
    },
    branchTeachers:[teacherSmallDetails]
});

module.exports = mongoose.model('BranchSchema', BranchSchema);