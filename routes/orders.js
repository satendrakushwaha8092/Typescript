var express = require('express');
var router = express.Router();

const order=require('../controllers/order.controller');

/* GET users listing. */
router.get('/order', order.getOrderData);
router.post('/order', order.createOrderData);
router.put('/order', order.updateOrderData);


module.exports = router;
