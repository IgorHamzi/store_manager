const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();

  res
    .status(200)
    .send(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const products = await productsService.getById(id);

  if (!products) {
    return res
      .status(404)
      .send({ message: 'Product not found' });
  }

  res
    .status(200)
    .send(products);
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productsService.createProduct(name, quantity);
  
  if (!product) {
    return res
      .status(409)
      .send({ message: 'Product already exists' });
  }

  res
    .status(201)
    .send(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await productsService.updateProduct({ id, name, quantity });

  if (!product) {
    return res
      .status(404)
      .send({ message: 'Product not found' });
  }

  res
    .status(200)
    .send(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.deleteProduct({ id });

  if (!product) {
    return res
      .status(404)
      .send({ message: 'Product not found' });
  }

  res
    .status(204)
    .end();
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};