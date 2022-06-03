const connection = require('./connection');

const getProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products '
  + 'ORDER BY id ASC';
  const [result] = await connection.execute(query);
  return result;
};

const getProductsById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ? '
  + 'ORDER BY id ASC';
  const [[result]] = await connection.execute(query, [id]);
  return result;
};

module.exports = {
  getProducts,
  getProductsById,
};
