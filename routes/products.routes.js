const express = require("express");
const { patch } = require("../app");
const router = express.Router();
const productControllers = require("../controllers/product.controllers");

router
  .route("/")
  /* */
  .get(productControllers.getProduct)
  .post(productControllers.createProducts);

router
  .route("/bulk-update")
  /**/
  .patch(productControllers.bulkUpdateProduct);

router
  .route("/:id")
  /** */
  .get()
  .post(productControllers.updateProduct)
  .patch();

module.exports = router;
