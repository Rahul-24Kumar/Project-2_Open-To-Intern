const internModel = require("../Models/internModel")
const collegeModel = require("../Models/collegeModel")
const express = require('express');
const { Router } = require('express');
const router = express.Router();

//CREATE INTERN-
const Intern = async function (req, res) {
    try {
        let data = req.body
        let collegeId = req.body.collegeId
        if (!data) return res.status(400).send({ status:false ,message:'The request is not valid as the data are required.'})
        let collegeDetail = await collegeModel.findById(collegeId)
        if (!collegeDetail) return res.status(404).send({status:false, message:'The request is not valid as no intern is present with  given author id'})
        let createNewIntern = await internModel.create(data)
        res.status(201).send({ status:true , data:createNewIntern })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({status:false , message: err.message })
    }
}



const getDetail = async function (req, res) {
    try {
            let coll_name = req.query.collegeName
            let data = await collegeModel.findOne({ name: coll_name })
            const C_id = data._id
            if (!data) {
               return res.status(403).send({ status: false, message: "The value is Invalid" });
            }
            let internDetails = await internModel.find({ collegeId: C_id, isDeleted: false })
           res.status(200).send({ data: data, Interns: internDetails })
        } catch (err) {
        console.log(err)
        res.status(500).send({status: false, message: err.message })
    }
}


module.exports.Intern = Intern
module.exports.getDetail = getDetail