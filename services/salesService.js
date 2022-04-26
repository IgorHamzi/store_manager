const salesModel = require('../models/salesModel');

const getAll = async () => {
  try {
    const sales = await salesModel.getAll();
    return sales;
  } catch (error) {
    console.log(error);
    throw new Error('Database problems');
  }
};

const getById = async (id) => {
  try {
    const sale = await salesModel.getById(id);
    if (sale.length < 1) {
      return { message: 'Sale not found', status: 404 };
    }
    return sale;
  } catch (error) {
    console.log(error);
    throw new Error('Database problems');
  }
};

module.exports = {
  getAll,
  getById,
};
