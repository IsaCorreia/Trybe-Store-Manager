const connection = require('./connection');

const getSales = async () => {
  const query = 'SELECT * FROM StoreManager.sales_products AS sp '
    + 'INNER JOIN StoreManager.sales AS sa ON sp.sale_id = sa.id '
    + 'ORDER BY id ASC;';
  const [result] = await connection.execute(query);
  return result;
};

const getSalesById = async (id) => {
  const query = 'SELECT * FROM StoreManager.sales_products AS sp '
    + 'INNER JOIN StoreManager.sales AS sa ON sp.sale_id = sa.id '
    + 'WHERE sale_id = ? '
    + 'ORDER BY id ASC';
  const [result] = await connection.execute(query, [id]);
  return result;
};

// const getLastSale = async () => {
//   const getLastSaleQuery = 'SELECT * FROM StoreManager.sales '
//     + 'ORDER BY id DESC LIMIT 1;';
//   const [[{ id: saleId }]] = await connection.execute(getLastSaleQuery);
//   return saleId;
// };

const addSale = async (productId, quantity) => {
  // Add into sales table first
  const addSalesQuery = 'INSERT INTO StoreManager.sales() VALUES();';
  const [{ insertId: saleId }] = await connection.execute(addSalesQuery);

  // Add into sales_products
  const addSalesProductQuery = 'INSERT INTO StoreManager.sales_products'
    + '(sale_id, product_id, quantity) '
    + 'VALUES(?, ?, ?);';
  await connection.execute(addSalesProductQuery, [saleId, productId, quantity]);

  return saleId;
};

const updateSale = async (saleId, productId, quantity) => {
  const updatedSaleQuery = 'UPDATE StoreManager.sales_products '
    + 'SET quantity = ? WHERE sale_id = ? AND product_id = ?;';
  await connection.execute(updatedSaleQuery, [quantity, saleId, productId]);
};

const deleteSale = async (id) => {
  const deleteSalesQuery = 'DELETE FROM StoreManager.sales WHERE id = ?';
  await connection.execute(deleteSalesQuery, [id]);
  const deleteSalesProductQuery = 'DELETE FROM StoreManager.sales_products WHERE sale_id = ?';
  await connection.execute(deleteSalesProductQuery, [id]);
};

module.exports = {
  getSales,
  getSalesById,
  // getLastSale,
  addSale,
  updateSale,
  deleteSale,
};
