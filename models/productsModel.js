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

const addProduct = async (name, quantity) => {
  const addQuery = 'INSERT INTO StoreManager.products(name, quantity) VALUES(?, ?)';
  await connection.execute(addQuery, [name, quantity]);
  const getQuery = 'SELECT * FROM StoreManager.products ORDER BY id DESC LIMIT 1';
  const [[result]] = await connection.execute(getQuery);
  return result;
};

const updateProduct = async (id, name, quantity) => {
  const updateQuery = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?';
  await connection.execute(updateQuery, [name, quantity, id]);
};

const deleteProduct = async (id) => {
  const deleteQuery = 'DELETE FROM StoreManager.products WHERE id = ?';
  await connection.execute(deleteQuery, [id]);
};

const getProductStock = async (productId) => {
  const getStockQuery = 'SELECT quantity FROM StoreManager.products WHERE id = ?;';
  const [[{ quantity }]] = await connection.execute(getStockQuery, [productId]);
  return quantity;
};

module.exports = {
  getProducts,
  getProductsById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductStock,
};
