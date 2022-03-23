const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')

const isValid = function (value) {
    if (typeof value === 'undefined' || typeof value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}
const isValidName = function (value) {
    if (!(value === value.toLowerCase())) {
        return false
    } return true
}
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValidLink = function (value) {
    if (!(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(value.trim()))) {
        return false
    }
    return true
}


const createCollege = async function (req, res) {
    try {
        let data = req.params;
        if (!data)
            return res.status(400).send({ msg: "blog id needs to be present" })
        const collegeData = req.body;
        const { name, fullName, logoLink } = collegeData

        if (!isValidRequestBody(collegeData)) {
            res.status(400).send({ status: false, msg: "please enter college details" })
            return
        }

        if (!isValid(name)) {
            res.status(400).send({ status: false, msg: "please enter college name" })
            return
        }
        if (!isValidName(name)) {
            res.status(400).send({ status: false, msg: "please enter the name in lower case only" })
            return

        }
        if (!isValid(fullName)) {
            res.status(400).send({ status: false, msg: "please enter college full name" })
            return
        }
        if (!isValid(logoLink)) {
            res.status(400).send({ status: false, msg: "please enter logo link" })
            return
        }
        if (!isValidLink(logoLink)) {
            res.status(400).send({ status: false, msg: 'the logo link is not valid' })
            return
        }
        // Cheking duplicate Entry Of College 
        let duplicateEntries = await collegeModel.find();
        let duplicateLength = duplicateEntries.length

        if (duplicateLength != 0) {
            // Checking duplicate fullName
            const Name = await collegeModel.findOne({ name: name });
            if (Name) {
                return res.status(400).send({ status: false, msg: "College Name already exists" });
            }
        }

        const duplicateCollegeName = await collegeModel.findOne({ fullName: fullName });
        if (duplicateCollegeName) {
            return res.status(400).send({ status: false, msg: "College Full Name already exists" });
        }
        const Name = await collegeModel.findOne({ name: name });
        if (Name) {
            return res.status(400).send({ status: false, msg: "College Name already exists" });
        }
        if (collegeData) {
            let savedcollegeData = await collegeModel.create(collegeData)
            res.status(201).send({ status: true, data: { savedcollegeData } })
        }
        else {
            res.status(400).send({ status: false, msg: "enter valid data" })
        }
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}

const collegeDetails = async function (req, res) {
    try {
        const collegeName = req.query.collegeName;
        if (!collegeName)

            return res.status(400).send({ status: false, msg: 'please provide collegeName in the query' })

        const collegeNames = await collegeModel.findOne({ name: collegeName, isDeleted: false })
        if (!collegeNames) {
            return res.status(404).send({ status: false, message: "no college available with this name" })
        }
        // let colleges = await collegeModel.findOne({name:collegeName, isDeleted:false})
        const { name, fullName, logoLink } = collegeNames

        const collegeId = collegeNames._id

        const internDetails = await internModel.find({ collegeId: collegeId, isDeleted: false }).select
            ({ "_id": 1, "name": 1, "email": 1, "mobile": 1 })


        const interns = internDetails
        const data = { name: name, fullName: fullName, logoLink: logoLink, interns: internDetails }
        return res.status(200).send({ status: true, data: data })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }

}


module.exports.createCollege = createCollege
module.exports.collegeDetails = collegeDetails