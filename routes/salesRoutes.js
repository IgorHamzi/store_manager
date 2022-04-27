const express = require('express');
const salesController = require('../controllers/salesController');
const { idValidator, quantityValidator } = require('../middlewares/validationSales');

const routes = express.Router();

routes.get('/', salesController.getAll); 

routes.get('/:id', salesController.getById); 

routes.post('/', idValidator, quantityValidator);

module.exports = routes;
