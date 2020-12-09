const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnnounementSchema = new Schema({
    branch:{
        type:String,
        required:[true, "Announcement: Branch not specified"]
    },
    subject:{
        subjectId:{type:mongoose.Types.ObjectId},
        subjectName:{type:String}
    },
    title:{
        type:String,
        required:[true, "Announcement : title not specified"]
    },
    body:{
        type:String,
        required:[true, "Announcement : body not specified"]
    },
    creator:{
        creatorId:{type:mongoose.Types.ObjectId},
        required:true
    }
});

module.exports = mongoose.model('AnnouncementSchema', AnnounementSchema);