const productService = require("../../services/product.service");
const categoryService = require("../../services/product-category.service");
const manufacturerService = require("../../services/manufacturer.service");

const renderLayout = require("../renderAdminLayout");

// get allproduct
const getAllProducts = async (req, res) => {
  try {
    // const user = req.user;
    const keyword = req.query.search || "";
    const manufacturer = req.query.manufacturer || "";
    const sortBy = req.query.sortBy || "name";
    const sortOrder = req.query.sortOrder || "asc";
    const filter = {
      keyword,
      manufacturer,
      sortBy,
      sortOrder,
    }
    const products = await productService.getProducts(filter);
    // console.log(products)
    const manufacturers = await manufacturerService.getAllManufacturers();
    const categories = await categoryService.getProductCategories();

    // console.log(categories)

    // show category of product by product.category and variable categories
    // const formatProducts = products.map(product => {
    //   console.log(product.category.toString(), categories[0]._id.toString())
    //   const category = categories.filter(category => category._id.toString() === product.category.toString())[0]
    //   console.log(category?.name)
    //   return {
    //     ...product._doc,
    //     category: category || {},
    //   }
    // })

    // console.log(formatProducts)
    
    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "admin/productList",
        { products: products || [], manufacturers: manufacturers || [], categories: categories || [] },
        (err, html) => {
          if (err) return reject(err);
          resolve(html);
        }
      );
    });
    await renderLayout(req, res, bodyHtml, "Products");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching products");
  }
};

const addProduct = async (req, res) => {
  try {
    newProduct = req.body;
    newProduct._manufacturer = req.body.manufacturerId;
    const product = await productService.addProduct(newProduct);
    res.redirect("/admin/products");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding product");
  }
}

//get product by id
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productService.getProductById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    categories = await categoryService.getProductCategories();
    manufacturers = await manufacturerService.getAllManufacturers();
    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "admin/productDetail",
        { product: product || {}, categories: categories, manufacturers: manufacturers },
        (err, html) => {
          if (err) return reject(err);
          resolve(html);
        }
      );
    });
    await renderLayout(req, res, bodyHtml, "Product");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching product");
  }
}

//update product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productService.updateProduct(productId, req.body);
    res.redirect("/admin/products/" + productId);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating product");
  }
}

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productService.deleteProduct(productId);
    res.redirect("/admin/products");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting product");
  }
}


const getAllCategories = async (req, res) => {
  try {
    // const user = req.user;
    const categories = await categoryService.getProductCategories();
    
    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "admin/categoryList",
        { categories: categories },
        (err, html) => {
          if (err) return reject(err);
          resolve(html);
        }
      );
    });
    await renderLayout(req, res, bodyHtml, "Categories");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching categories");
  }
};

//add category
const addCategory = async (req, res) => {
  try {
    const category = await categoryService.addCategory(req.body);
    res.redirect("/admin/categories");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding category");
  }
};

// edit category
const updateCategory = async (req, res) => {
  try {
    console.log("AAAAAAAAAAAAAAAAAAAAAAA2", req.body);
    const categoryId = req.body.id || "";
    const category = await categoryService.updateCategory(categoryId, req.body);
    res.redirect("/admin/categories");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating category");
  }
};

//delete category
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await categoryService.deleteCategory(categoryId);
    res.redirect("/admin/categories");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting category");
  }
};


// get all manufacturers
const getAllManufacturers = async (req, res) => {
  try {
    // const user = req.user;
    const manufacturers = await manufacturerService.getAllManufacturers();
    
    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "admin/manufacturerList",
        { manufacturers: manufacturers },
        (err, html) => {
          if (err) return reject(err);
          resolve(html);
        }
      );
    });
    await renderLayout(req, res, bodyHtml, "Manufacturers");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching manufacturers");
  }
}

// add manufacturer
const addManufacturer = async (req, res) => {
  try {
    const manufacturer = await manufacturerService.addManufacturer(req.body);
    res.redirect("/admin/manufacturers");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding manufacturer");
  }
}

// edit manufacturer
const updateManufacturer = async (req, res) => {
  try {
    const manufacturerId = req.body.id || "";
    const manufacturer = await manufacturerService
      .updateManufacturer(manufacturerId, req.body);
    res.redirect("/admin/manufacturers");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating manufacturer");
  }
}

//delete manufacturer
const deleteManufacturer = async (req, res) => {
  try {
    const manufacturerId = req.params.id;
    const manufacturer = await manufacturerService.deleteManufacturer(manufacturerId);
    res.redirect("/admin/manufacturers");
  }
  catch (error) {
    console.error(error);
    res.status(500).send("Error deleting manufacturer");
  }
}

module.exports = {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getAllManufacturers,
  addManufacturer,
  updateManufacturer,
  deleteManufacturer,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  addProduct
};
