const { Router } = require('express');
const orderRouter = Router();
const controller = require('../controllers/ordercontroller');
const { checkAuthenticated } = require('../../passport');

orderRouter.get('/:customerId', controller.getCustomersOrders, (req, res) =>{});
orderRouter.get('/:customerId/:orderId', controller.getOrder, (req, res) =>{});

module.exports = orderRouter;