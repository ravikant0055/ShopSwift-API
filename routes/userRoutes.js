const express = require('express')

const router = express.Router();

const userController = require('../controller/userController')

router.get('/users', userController.getAllUsers)
router.post('/registerUser',userController.registerUser)
router.get('/login', userController.loginUser)
exports.routes = router;