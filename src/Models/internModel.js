const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const validator = require('validator')
const object = mongoose.Schema.Types.ObjectId

const internModel = new mongoose.Schema({
    name:{
        type:String,
        required: [true ,"Name is required !" ],
        lowercase: true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
              validator: validator.isEmail,
              message: '{VALUE} is not a valid email',
              isAsync: false
            }
        },        
        mobile:{
        type: String,
        required:[true , "Phone number is required !" ],
        unique:true,
         match:[/^[6-9]\d{9}$/]
    },
    collegeId:{
        type:object,
        ref:'college',
        required:[true, "collegeId is required !" ]
    },
    isDeleted:{
     type:Boolean,
     default:false
    },
})

module.exports = mongoose.model('intern', internModel )