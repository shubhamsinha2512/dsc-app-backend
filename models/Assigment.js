const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subjectSamllDetails = require('./partials/subjectSmallDetails');

const AssignmentSchema = new Schema({
    title:{
        type:String,
        required:[true, "title not specified"]
    },
    subject:{
        type:subjectSamllDetails,
        required:true
    },
    semester:{
        type:Number,
        required:true,
    },
    branch:{
        type:String,
        required:true
    },
    dueDate:{
        type:Date,
        required:true
    },
    assignmentBody:{
        message:{type:String},
        filePath:{type:String}
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Assignment', AssignmentSchema);