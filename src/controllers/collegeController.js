const collegeModel = require('../Models/collegeModel')

const Collage = async function (req, res) {
    try {
        const data = req.body
        if (!data) return res.status(400).send({ status: false, message:"data is requried" })
        const saveData = await collegeModel.create(data)
        res.status(201).send({ status: true, message: saveData })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err });
    }
}


module.exports.Collage = Collage