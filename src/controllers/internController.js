const internModel = require("../Models/internModel")
const collegeModel = require("../Models/collegeModel")
const express = require('express');
const { Router } = require('express');
const router = express.Router();

//CREATE INTERN:
const Intern = async function (req, res) {
    try {
        let data = req.body
        let collegeId = req.body.collegeId
        if (!data) return res.status(400).send({ status:false ,message:'Data is required'})
        let collegeInfo = await collegeModel.findById(collegeId)
        if (!collegeInfo) return res.status(404).send({status:false, message:'There is no intern with the given college id'})
        let createInterns = await internModel.create(data)
        res.status(201).send({ status:true , data:createInterns })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({status:false , message: err.message })
    }
}

//  GET DETAILS OF THE INTERNS IN THEIR RESPECTIVE COLLEGES :
const internsInfo = async function (req, res) {
    try {
        let college_name = req.query.collegeName
        if(!college_name){
            return res.status(400).send({status:false,  msg: "college name must be persent"})
        }
        let dataBody = await collegeModel.findOne({ name: college_name })
        let data = JSON.parse(JSON.stringify(dataBody))
        const college_id = dataBody._id
        if (!dataBody) {
           return res.status(403).send({ status: false, message: "The given input is Invalid" });
        }
        let interns = await internModel.find({ collegeId:college_id}).select({_id:true,name:true,email:true,mobile:true})
         data = {name:dataBody.name,fullName:dataBody.fullName,logoLink:dataBody.logoLink}
        data.interest = [...interns]
        res.status(200).send({status:true,data:data});
    }
        catch (err) {
            console.log(err)
            res.status(500).send({status:false , message: err.message })
        }
    }

module.exports.Intern = Intern
module.exports.internsInfo = internsInfo