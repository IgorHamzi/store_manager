const connection = require('./mysql-connection.js');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products');
  return products;
};

const getById = async (id) => {
  const [product] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [id],
    );
  return product[0];
};

const createProduct = async ({ name, quantity }) => {
  const findAll = await getAll();
  const filterProduct = findAll.find((product) => product.name === name);
  if (filterProduct) {
    return { message: 'Product already exists' };
  }
  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (name, quantity)
    VALUES (?, ?)`, [name, quantity],
  );

  return {
    id: insertId,
    name,
    quantity,
  };
};

module.exports = {
  getAll,
  getById,
  createProduct,
};
