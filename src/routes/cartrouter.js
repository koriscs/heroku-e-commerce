const { Router } = require('express');
const cartRouter = Router();
const controller = require('../controllers/cartcontroller');
const { checkAuthenticated } = require('../../passport');

cartRouter.post('/:customerId', checkAuthenticated, controller.addItemToCart,  (req, res) =>{});
cartRouter.get('/:customerId', checkAuthenticated,controller.getCart,  (req, res) =>{});
cartRouter.get('/:customerId/checkout', checkAuthenticated,controller.checkOut,  (req, res) =>{});
cartRouter.put('/:customerId/:cartId', checkAuthenticated, controller.updateCart, (req, res) =>{});
cartRouter.delete('/:customerId/:cartId', checkAuthenticated, controller.deleteCart, (req,res) =>{});

module.exports = cartRouter;