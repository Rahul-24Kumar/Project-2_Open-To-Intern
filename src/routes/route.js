const express = require('express');
const { Router } = require('express');
const collegeController = require('../Controllers/collegeController')
const internController = require('../Controllers/internController')
const router = express.Router();

router.post("/functionup/colleges", collegeController.College)

router.post('/functionup/interns', internController.Intern)

router.get('/functionup/collegeDetails', internController.internsInfo)


module.exports = router;