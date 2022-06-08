const { Router } = require('express');
const productRouter = Router();
const controller = require('../controllers/productcontroller');
const { checkAuthenticated } = require('../../passport');

productRouter.get('/', checkAuthenticated, controller.getAllProducts ,(req, res) =>{});
productRouter.get('/:productId', controller.getProduct, (req, res) =>{});
productRouter.post('/', controller.addProduct, (req, res) =>{});
productRouter.put('/:productId', checkAuthenticated, controller.updateProduct, (req, res) =>{});
productRouter.delete('/:productId', checkAuthenticated,controller.deleteProduct, (req, res) =>{});

module.exports = productRouter;