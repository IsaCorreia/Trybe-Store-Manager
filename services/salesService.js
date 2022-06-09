const salesModel = require('../models/salesModel');

const getSales = async ({ id }) => {
  let sales;
  if (id) {
    sales = await salesModel.getSalesById(id);
    return sales.map((sale) => ({
      productId: sale.product_id,
      quantity: sale.quantity,
      date: sale.date,
    }));
  }
  sales = await salesModel.getSales();
  return sales.map((sale) => ({
    saleId: sale.sale_id,
    productId: sale.product_id,
    quantity: sale.quantity,
    date: sale.date,
  }));
};

const addSale = async (sales) => {
  await sales.forEach(async ({ productId, quantity }) =>
    salesModel.addSale(productId, quantity));
  return {
    id: await salesModel.getLastSale(),
    itemsSold: sales.map(({ productId, quantity }) => ({
      productId,
      quantity,
    })),
  };
};

module.exports = {
  getSales,
  addSale,
};
