const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')

const isValid = function (value) {
    if (typeof value === 'undefined' || typeof value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const createIntern = async function (req, res) {
    try {
        const internData = req.body;
        const { name, email, mobile, collegeId } = internData


        if (!isValidRequestBody(internData)) {
            res.status(400).send({ status: false, msg: 'please enter intern data' })
            return
        }
        if (!isValid(name)) {
            res.status(400).send({ status: false, msg: 'plese enter intern name' })
            return
        }
        if (!isValid(email)) {
            res.status(400).send({ status: false, msg: 'please enter intern email' })
            return
        }
        if (!isValid(mobile)) {
            res.status(400).send({ status: false, msg: 'please enter intern mobile' })
            return
        }
        if (!isValid(collegeId)) {
            res.status(400).send({ status: false, msg: 'please enter intern college Id' })
            return
        }
        const emails = await internModel.findOne({ email: email });
        if (emails) {
            return res.status(400).send({ status: false, msg: "email already exists" });
        }
        const Numbers = await internModel.findOne({ mobile: mobile });
        if (Numbers) {
            return res.status(400).send({ status: false, msg: "mobile number already exists" });
        }
        if (internData) {
            let savedData = await internModel.create(internData)
            res.status(201).send({ status: true, data: { savedData } })
        }
        else {
            res.status(400).send({ status: false, msg: "enter valid data" })
        }

        // let collegeData = await collegeModel.findOne({name:collegeName,isDeleted:false});

        // internData.collegeId=collegeData._id

        //     let savedData = await internModel.create(internData)
        //     res.status(201).send({status: true, data: {savedData} });

    }
    catch (err) {

        res.status(500).send({ status: false, msg: err.message });
    }
}



module.exports.createIntern = createIntern 