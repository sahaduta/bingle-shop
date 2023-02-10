const router = require('express').Router();
const {OrdersController} = require('../controllers/orders.controller');

const ordersController = new OrdersController();

router.post('/orders', ordersController.createOrder);

router.patch('/orders', ordersController.updateStatusOrder);

module.exports = router;