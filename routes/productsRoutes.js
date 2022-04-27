const express = require('express');
const productsController = require('../controllers/productsController');
const { nameValidator, quantityValidator } = require('../middlewares/validationProducts');

const routes = express.Router();

routes.get('/', productsController.getAll); 

routes.get('/:id', productsController.getById); 

routes.post('/', nameValidator, quantityValidator, productsController.createProduct);

module.exports = routes;
