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

const getLastSale = async () => {
  const getLastSaleQuery = 'SELECT * FROM StoreManager.sales '
    + 'ORDER BY id DESC LIMIT 1;';
  const [[{ id: saleId }]] = await connection.execute(getLastSaleQuery);
  return saleId;
};

const addSale = async (productId, quantity) => {
  // Add into sales table first
  const addSalesQuery = 'INSERT INTO StoreManager.sales() VALUES();';
  await connection.execute(addSalesQuery);

  // Get last sale ID
  const saleId = await getLastSale();

  // Add into sales_products
  const addSalesProductQuery = 'INSERT INTO StoreManager.sales_products'
    + '(sale_id, product_id, quantity) '
    + 'VALUES(?, ?, ?);';
  await connection.execute(addSalesProductQuery, [saleId, productId, quantity]);
  
  return saleId;
};

module.exports = {
  getSales,
  getSalesById,
  getLastSale,
  addSale,
};
