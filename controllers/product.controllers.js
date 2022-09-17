const { getProdutcsServices, createProductsServices, updateProductServices, bulkUpdateProductServices } = require("../services/products.services");

exports.createProducts = async (req, res, next) => {
  try {
    const result = await createProductsServices(req.body);
    // const product = new Product(req.body);
    // const result = await product.save();
    res.status(200).json({
      status: "success",
      message: "data inserted successful",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      messege: "data is not inserted",
      error: error.message,
    });
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await getProdutcsServices();
    res.status(200).send({
      status: "success",
      data: product,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: 'data can"t find',
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await updateProductServices(id, req.body);
    res.status(200).send({
      status: "success",
      message: "data successfully updated",
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "can't update data",
      error: error.message,
    });
  }
};

exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const product = await bulkUpdateProductServices(req.body);
    res.status(200).send({
      status: "success",
      message: "successfully updated product",
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "can't update product",
      error: error.message,
    });
  }
};
