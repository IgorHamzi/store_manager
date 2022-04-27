const express = require('express');
const productsController = require('../controllers/productsController');
const {
  nameValidator,
  quantityValidator,
  idValidator } = require('../middlewares/validationProducts');

const routes = express.Router();

routes.get('/', productsController.getAll); 

routes.get('/:id', productsController.getById); 

routes.post('/', nameValidator, quantityValidator, productsController.createProduct);

routes.put('/:id', idValidator, nameValidator, quantityValidator, productsController.updateProduct);

routes.delete('/:id', productsController.deleteProduct);

module.exports = routes;
