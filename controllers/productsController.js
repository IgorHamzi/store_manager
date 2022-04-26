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

module.exports = {
  getAll,
  getById,
};
