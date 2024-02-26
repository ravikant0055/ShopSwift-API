const express = require('express')

const router = express.Router();

const userController = require('../controller/userController')

router.get('/users', userController.getAllUsers)
router.post('/user/register',userController.registerUser)
router.get('/user/login', userController.loginUser)
router.patch('/user/update', userController.updateUser)
exports.routes = router;