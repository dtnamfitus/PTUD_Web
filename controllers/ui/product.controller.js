const productService = require("../../services/product.service");
const productCategoryService = require("../../services/product-category.service");
const commentService = require("../../services/comment.service");
const renderLayout = require("./renderLayout");
const qs = require("qs");

const getProducts = async (req, res) => {
  try {
    const parsedQuery = qs.parse(req.query);
    const [products, productCategories] = await Promise.allSettled([
      productService.getAllProducts(parsedQuery),
      productCategoryService.getProductCategories(),
    ]);
    console.log(products);

    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "client/products/product",
        { products: products.value, productCategories: productCategories },
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
    const [product, productCategories, comments] = await Promise.allSettled([
      productService.getProductById(id),
      productCategoryService.getProductCategories(),
      commentService.getCommentByProductId(id),
    ]);
    console.log(JSON.stringify(product.value.colors, null, 2));
    const randomProducts = await productService.getRandomProducts(product);
    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "client/products/product_detail",
        {
          product: product.value,
          productCategories: productCategories,
          randomProducts: randomProducts,
          comments: comments.value,
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
