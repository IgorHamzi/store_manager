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

const createSales = async (req, res) => {
  try {
    const sales = req.body;
    const newSale = await salesService.createSales(sales);
    return res.status(201).json(newSale);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateSales = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = req.body;
    const upSales = await salesService.updateSales(id, sales);
    return res.status(200).json(upSales);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const resultDelete = await salesService.deleteSale(id);

  if (!resultDelete) {
    return res.status(404).send({ message: 'Sale not found' });
  }

  return res.status(204).send();
};

module.exports = {
  getAll,
  getById,
  createSales,
  updateSales,
  deleteSale,
};
