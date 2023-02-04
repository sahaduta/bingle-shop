const router = require('express').Router();
const {ItemsController} = require('../controllers/items.controller');

const itemsController = new ItemsController();

router.get('/items', itemsController.getItems); 
router.post('/items', itemsController.insertItem);

module.exports = router;