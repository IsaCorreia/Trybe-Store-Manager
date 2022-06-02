const connection = require('./connection');

const getSales = async () => {
  const query = 'SELECT * FROM StoreManager.sales_products AS sp '
    + 'INNER JOIN StoreManager.sales AS sa ON sp.sale_id = sa.id;';
  const [result] = await connection.execute(query);
  return result;
};

const getSalesById = async (id) => {
  const query = 'SELECT * FROM StoreManager.sales_products AS sp '
    + 'INNER JOIN StoreManager.sales AS sa ON sp.sale_id = sa.id '
    + 'WHERE sale_id = ?';
  const [result] = await connection.execute(query, [id]);
  return result;
};

module.exports = {
  getSales,
  getSalesById,
};
