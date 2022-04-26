const connection = require('./mysql-connection.js');

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT S.id AS saleId, S.date, SP.product_id AS productId, SP.quantity FROM sales AS S
    INNER JOIN sales_products AS SP
    ON S.id = SP.sale_id
    ORDER BY S.id`,
  );
  console.log(sales);
  return sales;
};

const getById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT S.date, SP.product_id AS productId, SP.quantity FROM sales AS S
    INNER JOIN sales_products AS SP
    ON S.id = SP.sale_id WHERE S.id = ?`, [id],
  );
  return sale;
};

module.exports = {
  getAll,
  getById,
};
