var express = require('express');
var router = express.Router();

const user=require('../controllers/user.controller');

/* GET users listing. */
router.get('/user', user.getUserData);
router.post('/user', user.createUserData);


module.exports = router;
