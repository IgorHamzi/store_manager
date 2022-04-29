const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection
    .execute(
      'SELECT id, name, quantity FROM StoreManager.products;',
    );

  return result;
};

const getById = async (id) => {
  const [result] = await connection
    .execute(
      'SELECT id, name, quantity FROM StoreManager.products WHERE id = ?;',
      [id],
    );

  return result;
};

const createProduct = async ({ name, quantity }) => {
  await connection
    .execute(
      'INSERT INTO StoreManager.products (name, quantity) VALUES (?,?);',
      [name, quantity],
    );
};

const updateProduct = async ({ id, name, quantity }) => {
  await connection
    .execute(
      'UPDATE StoreManager.products set name=?, quantity=? WHERE id=?;',
      [name, quantity, id],
    );
};

const deleteProduct = async ({ id }) => {
  await connection
    .execute(
      'DELETE FROM StoreManager.products WHERE id=?;',
      [id],
    );
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};
