var express = require('express');
var router = express.Router();

const user=require('../controller/user')

/* GET users listing. */
router.get('/user', user.get)
router.post('/add', user.create);
router.delete('/user/:id', user.deleteData);
router.get('/user/:id', user.getUserById);
router.post('/login', (req,res) => {
    return res.send({response:"success"})
})


module.exports = router;
