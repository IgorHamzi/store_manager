const SalesModel = require('../models/salesModel');
const ProductsModel = require('../models/productsModel');

const getAll = async () => {
  const result = await SalesModel.getAll();
  
  return result;
};

const getById = async (id) => {
  if (!id) return false;

  const result = await SalesModel.getById(id);

  return result;
};

const updateProductQuantity = async (productId, quantity) => {
  const [result] = await ProductsModel.getById(productId);
  const newQuantity = result.quantity - quantity;

  await SalesModel.updateProductQuantity(productId, newQuantity);
};

// let teste = true;
// const validateQuantityProduct = async ({ productId, quantity }) => {
//   const [result] = await ProductsModel.getById(productId);
//   const newQuantity = result.quantity - quantity;
//   console.log(newQuantity);
//   if (newQuantity < 0) {
//     teste = false;
//     console.log(teste);
//   }
// };

const createSale = async (arraySales) => {
  const allSales = await SalesModel.getAllSales();
  const id = allSales.length + 1;
  const date = new Date();

  await SalesModel.createSale(date);

  const createSalesProducts = async (saleId, { productId, quantity }) => {
    await SalesModel.createSalesProducts(saleId, productId, quantity);
    await updateProductQuantity(productId, quantity);
  };
   
  // await arraySales.forEach(async (element) => {
  //   const validate = await validateQuantityProduct(element);
  //   // if (!validate) result = false;
  //   // if (validate === false) console.log(false);
  // });
  // console.log(result);

  arraySales.forEach((element) => {
    createSalesProducts(id, element);
  });
  // if (teste === false) return false;
  return { id, itemsSold: [...arraySales] };
};

const updateSale = async (id, productId, quantity) => {
  await SalesModel.updateSale(id, productId, quantity);
  await updateProductQuantity(productId, quantity);

  const result = {
    saleId: Number(id),
    itemUpdated: [{
      productId,
      quantity,
    }],
  };

  return result;
};

const deleteSale = async (id) => {
  const allSales = await SalesModel.getAllSales();
  const sale = allSales.find((p) => p.id === Number(id));
  
  if (!sale) {
    return false;
  }

  const result = await SalesModel.getAll();
  const arraySales = result.filter((e) => e.saleId === Number(id));

  arraySales.forEach((element) => { 
    updateProductQuantity(element.productId, (-element.quantity));
  });
  
  await SalesModel.deleteSale(id);

  return sale;
};

module.exports = {
  getAll,
  getById,
  createSale,
  updateSale,
  deleteSale,
};
