const express = require('express');
const { signup, LoginAdmin } = require('../controllers/login.controller');

let router=express.Router()

router.post('/signup',signup)
router.post('/login',LoginAdmin)

module.exports=router