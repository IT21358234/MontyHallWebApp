const express = require('express')
const simulationController = require('../controllers/simulationController')

const router = express.Router()

router.post('/run', simulationController.simulation)

module.exports = router;