const express = require("express");
const router = express.Router();
const productService = require("../../../services/product.service");
const productCategoryService = require("../../../services/product-category.service");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [product, productCategories] = await Promise.all([
      productService.getProductById(id),
      productCategoryService.getProductCategories(),
    ]);

    const randomProducts = await productService.getRandomProducts(product);
    console.log(randomProducts);
    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "client/products/product_detail",
        {
          product: product,
          productCategories: productCategories,
          randomProducts: randomProducts,
        },
        (err, html) => {
          if (err) return reject(err);
          resolve(html);
        }
      );
    });
    res.render("layout/client-layout/layout", {
      title: "Products",
      body: bodyHtml,
      dirname: __dirname,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching product details");
  }
});

module.exports = router;
