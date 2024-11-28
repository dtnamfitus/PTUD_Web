const express = require("express");
const router = express.Router();
const productController = require("./../../../controllers/product.controller");
const productCategoriesController = require("./../../../controllers/productCategory.controller");

router.get("/", async (req, res) => {
  try {
    const products = await productController.getProducts(req, res);
    const user = req.user;
    const bodyHtml = await new Promise((resolve, reject) => {
      res.render("client/home", { products: products.docs }, (err, html) => {
        if (err) return reject(err);
        resolve(html);
      });
    });
    res.render("layout/client-layout/layout", {
      title: "Products",
      body: bodyHtml,
      products: products.docs,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching products");
  }
});

module.exports = router;
