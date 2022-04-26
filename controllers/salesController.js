const salesService = require('../services/salesService');

const getAll = async (req, res) => {
  try {
      const sales = await salesService.getAll();    
      return res.status(200).json(sales);
  } catch (err) {
      return res.status(404).json({ message: err.message });
  }  
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getById(id);
    if (sale.message) {
      return res.status(sale.status).json({ message: sale.message });
    }
    return res.status(200).json(sale);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Sale not found' });
  }
};

module.exports = {
  getAll,
  getById,
};
