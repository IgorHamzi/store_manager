const ProductsModel = require('../models/productsModel');

const getAll = async () => {
  const result = await ProductsModel.getAll();
  
  return result;
};

const getById = async (id) => {
  if (!id) return false;
  
  const [result] = await ProductsModel.getById(id);
  
  return result;
};

const createProduct = async (name, quantity) => {
  const allProducts = await getAll();
  
  if (allProducts.find((product) => product.name === name)) {
    return false;
  }

  const id = allProducts.length + 1;

  await ProductsModel.createProduct({ name, quantity });

  return { id, name, quantity };
};

const updateProduct = async ({ id, name, quantity }) => {
  const allProducts = await getAll();
  const product = allProducts.find((p) => p.id === Number(id));

  if (!product) {
    return false;
  }
  
  await ProductsModel.updateProduct({ id, name, quantity });

  return { id, name, quantity };
};

const deleteProduct = async ({ id }) => {
  const allProducts = await getAll();
  const product = allProducts.find((p) => p.id === Number(id));
  
  if (!product) {
    return false;
  }
  
  await ProductsModel.deleteProduct({ id });

  return product;
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};
