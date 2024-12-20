const productService = require("../../services/product.service");
const renderLayout = require("./renderLayout");

const getHome = async (req, res) => {
  try {
    const products = await productService.getAllProducts(req);
    const user = req.user;
    const bodyHtml = await new Promise((resolve, reject) => {
      res.render("client/home", { products: products.docs }, (err, html) => {
        if (err) return reject(err);
        resolve(html);
      });
    });
    await renderLayout(req, res, bodyHtml, "Home");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching products");
  }
};

module.exports = {
  getHome,
};
