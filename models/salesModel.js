const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection
    .execute(`
    SELECT b.sale_id as saleId, a.date, b.product_id as productId, b.quantity
    FROM StoreManager.sales AS a 
    INNER JOIN StoreManager.sales_products AS b
    ON a.id = b.sale_id;`);

  return result;
};

const getById = async (id) => {
  const [result] = await connection
    .execute(`
    SELECT a.date, b.product_id as productId, b.quantity
    FROM StoreManager.sales AS a 
    INNER JOIN StoreManager.sales_products AS b
    ON a.id = b.sale_id
    WHERE sale_id = ?;`, [id]);

  return result;
};

const getAllSales = async () => {
  const [result] = await connection
    .execute(`
    SELECT *
    FROM StoreManager.sales`);

  return result;
};

const createSale = async (date) => {
  await connection
    .execute('INSERT INTO StoreManager.sales (date) VALUES (?);', [date]);
};

const createSalesProducts = async (saleId, productId, quantity) => {
  await connection
    .execute(`
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?);`, [saleId, productId, quantity]);
};

const updateSale = async (id, productId, quantity) => {
  await connection
    .execute(
      'UPDATE StoreManager.sales_products set product_id=?, quantity=? WHERE sale_id=?;',
      [productId, quantity, id],
    );
};

const deleteSale = async (id) => {
  await connection
    .execute(
      'DELETE FROM StoreManager.sales WHERE id=?;',
      [id],
    );
};

const updateProductQuantity = async (productId, quantity) => {
  await connection
    .execute(
      'UPDATE StoreManager.products set quantity=? WHERE id=?;',
      [quantity, productId],
    );
};

module.exports = {
  getAll,
  getById,
  getAllSales,
  createSale,
  createSalesProducts,
  updateSale,
  deleteSale,
  updateProductQuantity,
};
