const {
  getProdutcsServices,
  createProductsServices,
  bulkUpdateProductServices,
  updateProductByIdServices,
  deleteProductByIdServices,
  bulkDeleteProductServices,
} = require("../services/products.services");

exports.getProduct = async (req, res, next) => {
  try {
    let filter = { ...req.qeury };
    console.log(filter);
    const exquleFields = ["sort", "page", "limit"];
    exquleFields.forEach((field) => delete filter[field]);

    let filterStr = JSON.stringify(filter);
    filterStr = filterStr.replace(/\b(gt | gte | lt | lte)\b/g, (match) => `$${match}`);

    filter = JSON.parse(filterStr);
    console.log(filter);

    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }

    const product = await getProdutcsServices(filter, queries);
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

exports.updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await updateProductByIdServices(id, req.body);
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

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await deleteProductByIdServices(id);

    if (!product.deletedCount) {
      res.status(400).send({
        status: "fail",
        message: "not exsit id",
      });
    }
    res.status(200).send({
      status: "success",
      message: "successfully delete by product",
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "can't delete product",
      error: error.message,
    });
  }
};

exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    const result = await bulkDeleteProductServices(req.body.ids);

    res.status(200).send({
      status: "success",
      message: "successfully delete product",
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "can't bulk delete product",
      error: error.message,
    });
  }
};
