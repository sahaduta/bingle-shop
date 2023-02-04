const router = require('express').Router();
const {OrdersController} = require('../controllers/orders.controller');

const ordersController = new OrdersController();

router.post('/orders', ordersController.createOrder);

router.patch('/update-status-order', ordersController.updateStatusOrder);

module.exports = router;