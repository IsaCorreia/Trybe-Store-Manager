const salesModel = require('../models/salesModel');

const getSales = async ({ id }) => {
  let sales;
  sales = await salesModel.getSales();
  return sales.map((sale) => ({
    saleId: sale.sale_id,
    productId: sale.product_id,
    quantity: sale.quantity,
    date: sale.date,
  }));
};

module.exports = {
  getSales,
};
