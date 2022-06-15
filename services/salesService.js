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

const updateSale = async ({ id }, { productId: prodID, quantity: qty }) => {
  const updatedSale = await salesModel.updateSale(id, prodID, qty);
  const [result] = updatedSale.map(
    ({ sale_id: saleId, product_id: productId, quantity }) => ({
      saleId,
      itemUpdated: [{ productId, quantity }],
    }),
  );
  return result;
};
const deleteSale = async ({ id }) => {
  const canDelete = await salesModel.getSalesById(id);
  if (!canDelete.length) return false;
  await salesModel.deleteSale(id);
  return true;
};

module.exports = {
  getSales,
  addSale,
  updateSale,
  deleteSale,
};
