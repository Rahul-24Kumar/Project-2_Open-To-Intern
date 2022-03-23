const mongoose = require('mongoose')

const collegeSchema = new mongoose.Schema({

    name: {
        type: String, 
        required: true, 
        unique: [true, 'this name is already used'] },

    fullName: {
        type: String, 
        required: true, 
        unique: [true, 'this fullName is already used'] },

    logoLink: { 
        type: String, 
        required: true },

    isDeleted: { 
        type: Boolean, 
        default: false }

}, { timestamps: true })

module.exports = mongoose.model('College', collegeSchema)