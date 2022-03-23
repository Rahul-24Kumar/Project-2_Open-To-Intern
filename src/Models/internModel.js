const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema({

    name: {
        type: String,
        required: 'name is required'
    },
    email: {
        unique: [true, 'this mail is already used'],
        type: String,
        required: [true, 'please provide the mail Id'],
        match: [/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/, 'email is not valid']
    },
    mobile: {
        type: String,
        unique: [true, 'this mobile number is already used'],

        validate: {
            validator: function (str) {
                return /\d{10}/.test(str);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },
    collegeId: {
        type: ObjectId,
        ref: 'College'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Intern', internSchema)