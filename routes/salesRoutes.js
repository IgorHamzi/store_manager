const express = require('express');
const salesController = require('../controllers/salesController');
const {
  productIdValidator,
  quantityValidator,
} = require('../middlewares/validationSales');

const routes = express.Router();

routes.get('/', salesController.getAll); 

routes.get('/:id', salesController.getById); 

routes.post('/', productIdValidator, quantityValidator, salesController.createSales);

routes.put('/:id', productIdValidator, quantityValidator, salesController.updateSales);

routes.delete('/sales/:id', salesController.deleteSale);

module.exports = routes;
