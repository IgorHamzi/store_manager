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
    if (sale.length === 0) {
      return { message: 'Sale not found', status: 404 };
    }
    return sale;
  } catch (error) {
    console.log(error);
    throw new Error('Database problems');
  }
};

const createSales = async (sales) => {
  const newsales = await salesModel.createSales(sales);
  return newsales;
};

const updateSales = async (id, sales) => {
  const upSales = await salesModel.updateSales(id, sales);
  return upSales;
};

module.exports = {
  getAll,
  getById,
  createSales,
  updateSales,
};
