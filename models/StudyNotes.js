const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subjectSmallDetails = require('./partials/subjectSmallDetails');

const StudyNotes = new Schema({
    title:{
        type:String,
        required:true
    },
    subject:{
        type:subjectSmallDetails,
        required:true
    },
    branch:{
        type:String
    },
    filePath:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    submittedBy:{
        type:String,
        required:true
    }

})