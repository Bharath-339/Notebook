const mongoose = require('mongoose');

const Notes = mongoose.Schema({
    title : {
        type : String ,
        required : true
    },
    description : {
        type: String
    },
    data : {
        type : Date,
        default : Date.now
    },
    tag : {
        type : String,
        default : 'General'
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
})


module .exports = mongoose.model('Notes' , Notes);