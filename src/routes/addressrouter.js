const { Router } = require('express');
const addressRouter = Router();
const controller = require('../controllers/addresscontroller');
const { checkAuthenticated } = require('../../passport');


addressRouter.get('/', checkAuthenticated, controller.getAllAddress, (req, res) =>{});
addressRouter.get('/:customer_id',checkAuthenticated, controller.getAddress, (req, res) =>{});
addressRouter.put('/:customer_id',checkAuthenticated, controller.updateAddress, (req, res) =>{});

module.exports = addressRouter;