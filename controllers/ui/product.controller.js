const productService = require("../../services/product.service");
const productCategoryService = require("../../services/product-category.service");
const commentService = require("../../services/comment.service");
const renderLayout = require("./renderLayout");
const qs = require("qs");

const getProducts = async (req, res) => {
  try {
    const parsedQuery = qs.parse(req.query);
    const [products, productCategories] = await Promise.all([
      productService.getAllProducts(parsedQuery),
      productCategoryService.getProductCategories(),
    ]);

    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "client/products/product",
        { products: products, productCategories: productCategories },
        (err, html) => {
          if (err) return reject(err);
          resolve(html);
        }
      );
    });
    await renderLayout(req, res, bodyHtml, "Home");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching products");
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const [product, productCategories, comments] = await Promise.all([
      productService.getProductById(id),
      productCategoryService.getProductCategories(),
      commentService.getCommentByProductId(id),
    ]);
    console.log(productCategories);
    const randomProducts = await productService.getRandomProducts(product);
    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "client/products/product_detail",
        {
          product: product,
          productCategories: productCategories,
          randomProducts: randomProducts,
          comments: comments,
        },
        (err, html) => {
          if (err) return reject(err);
          resolve(html);
        }
      );
    });
    await renderLayout(req, res, bodyHtml, "Home");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching product details");
  }
};

module.exports = {
  getProducts,
  getProductDetails,
};
