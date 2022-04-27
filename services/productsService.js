const productsModel = require('../models/productsModel');

const getAll = async () => {
  try {
    const products = await productsModel.getAll();
    return products;
  } catch (error) {
    console.log(error);
    throw new Error('Database problems');
  }
};

const getById = async (id) => {
  try {
    const product = await productsModel.getById(id);
    if (!product) {
      return { message: 'Product not found', status: 404 };
    }
    return product;
  } catch (error) {
    console.log(error);
    throw new Error('Database problems');
  }
};

const createProduct = async ({ name, quantity }) => {
  const newProduct = await productsModel.createProduct({ name, quantity });
  if (newProduct.message) {
    return { message: newProduct.message, status: 409 };
  }
  return newProduct;
};

module.exports = {
  getAll,
  getById,
  createProduct,
};
