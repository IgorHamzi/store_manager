const productsService = require('../services/productsService');

const getAll = async (req, res) => {
  try {
      const products = await productsService.getAll();    
      return res.status(200).json(products);
  } catch (err) {
      return res.status(404).json({ message: 'product not found' });
  }  
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getById(id);
    if (product.message) {
      return res.status(product.status).json({ message: product.message });
    }
    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productsService.createProduct({ name, quantity });
    if (newProduct.message) {
      return res.status(newProduct.status).json({ message: 'Product already exists' });
    }
    return res.status(201).json(newProduct);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const upProduct = await productsService.updateProduct({ id, name, quantity });
    return res.status(200).json(upProduct);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productsService.deleteProduct(id);
    return res.status(204).end();
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};
