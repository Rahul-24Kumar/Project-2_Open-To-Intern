const mongoose = require('mongoose')

const collegeModel = new mongoose.Schema({
    name:{
        type:String,
        required: [true,"name is required !"],
        unique: true
    },
    fullName:{
        type:String,
        required: [true,"fullName is required !"],
    },
    logoLink:{
        type:String,
        required: [true,"logoLink is required !"],
    },
    isDeleted:{ 
        type:Boolean,
       default:false
},
});

module.exports = mongoose.model('college', collegeModel)