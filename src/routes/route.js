const express = require('express');
const { Router } = require('express');
const collageController = require('../Controllers/collegeController')
const internController = require('../Controllers/internController')
const router = express.Router();

const collegeModel = require('../Models/collegeModel')

router.post("/colleges", collageController.Collage) 

router.post('/interns', internController.Intern)

router.get('/collegeDetail', internController.getDetail)




module.exports = router;