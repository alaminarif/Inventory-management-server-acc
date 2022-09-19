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
  .route("/bulk-delete")
  /** */
  .delete(productControllers.bulkDeleteProduct);
router
  .route("/:id")
  /** */
  .get()
  .post(productControllers.updateProductById)
  .patch()
  .delete(productControllers.deleteProductById);

module.exports = router;
