const productService = require("../../services/product.service");
const productCategoryService = require("../../services/product-category.service");
const commentService = require("../../services/comment.service");
const renderLayout = require("./renderLayout");
const qs = require("qs");
const { getCache, setCache } = require("./../../config/redis/cacheHelper");

const getProducts = async (req, res) => {
  try {
    const parsedQuery = qs.parse(req.query);
    const cacheKey = `products:${JSON.stringify(parsedQuery)}`;

    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      return await renderLayout(req, res, cachedData.bodyHtml, "Home");
    }

    const [products, productCategories] = await Promise.all([
      productService.getAllProducts(parsedQuery),
      productCategoryService.getProductCategories(),
    ]);

    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "client/products/product",
        { products, productCategories },
        (err, html) => (err ? reject(err) : resolve(html))
      );
    });

    await setCache(cacheKey, { bodyHtml }, 3600); // 1 hour

    await renderLayout(req, res, bodyHtml, "Home");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching products");
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `productDetails:${id}`;

    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      return await renderLayout(req, res, cachedData.bodyHtml, "Home");
    }

    const [product, productCategories, comments] = await Promise.all([
      productService.getProductById(id),
      productCategoryService.getProductCategories(),
      commentService.getCommentByProductId(id),
    ]);

    const randomProducts = await productService.getRandomProducts(product);

    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "client/products/product_detail",
        {
          product,
          productCategories,
          randomProducts,
          comments,
        },
        (err, html) => (err ? reject(err) : resolve(html))
      );
    });

    await setCache(cacheKey, { bodyHtml }, 3600);

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
