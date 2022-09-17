const Product = require("../models/Product");

exports.getProdutcsServices = async () => {
  const products = await Product.find({});
  return products;
};

exports.createProductsServices = async (data) => {
  const products = await Product.create(data);
  return products;
};

exports.updateProductServices = async (productId, data) => {
  const result = await Product.updateOne(
    { _id: productId },
    { $set: data },
    {
      runValidators: true,
    }
  );
  return result;
};

exports.bulkUpdateProductServices = async (data) => {
  // const result = await Product.updateMany({ _id: data.ids }, data, {
  //   runValidators: true,
  // });

  const products = [];
  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });
  const result = await Promise.all(products);

  return result;
};
