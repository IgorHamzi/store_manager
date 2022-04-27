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

const updateProduct = async ({ id, name, quantity }) => {
  const productId = await productsModel.getById(id);
  if (!productId) {
    throw Error('Product not found');
  }
  const upProduct = await productsModel.updateProduct({ id, name, quantity });
  return upProduct;
};

const deleteProduct = async (id) => {
  const productId = await productsModel.getById(id);
  if (!productId) {
    throw Error('Product not found');
  }

  const delproduct = await productsModel.deleteProduct(id);
  return delproduct;
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};
