const Product = require("../models/Product");

exports.getProdutcsServices = async (filter, queries) => {
  console.log(filter);
  const products = await Product
    /** */
    .find(filter)
    .select(queries.fields)
    .sort(queries.sortBy);

  return products;
};

exports.createProductsServices = async (data) => {
  const products = await Product.create(data);
  return products;
};

exports.updateProductByIdServices = async (productId, data) => {
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

exports.deleteProductByIdServices = async (productId) => {
  const result = await Product.deleteOne({ _id: productId });
  return result;
};

exports.bulkDeleteProductServices = async (ids) => {
  const result = await Product.deleteMany({ _id: ids });
  console.log(result);
  return result;
};
