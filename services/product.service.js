const Product = require("./../models/product.model");
const Manufacturer = require("./../models/manufacturer.model");
const Category = require("./../models/product-category.model");

//get  products
const getProducts = async (filter) => {
  try {
    const {keyword, manufacturer, sortBy, sortOrder} = filter;
    // const products = await Product.find().populate("categories").populate("_manufacturer");
    // if (keyword) {
    //   const products = await Product.find({
    //     $or: [
    //       { name: { $regex: keyword, $options: "i" } },
    //       { description: { $regex: keyword, $options: "i" } },
    //     ],
    //   }).sort({ [sortBy]: sortOrder }).populate("categories").populate("_manufacturer");
    //   return products;
    // } else {
    //   const products = await Product.find().sort({ [sortBy]: sortOrder }).populate("categories").populate("_manufacturer");
    //   return products;
    // }
    /// find with keyword ( name or description), manufacturer, sort by, sort order
    const query = {};
    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }
    if (manufacturer) {
      query._manufacturer = manufacturer;
    }
    const products = await Product.find(query).sort({ [sortBy]: sortOrder }).populate("categories").populate("_manufacturer");
    
    
    // console.log(products);
    return products;
  } catch (err) {
    throw new Error("Error fetching products: " + err.message);
  }
};

const getAllProducts = async (parsedQuery) => {
  try {
    const {
      page,
      limit,
      sortBy = "createdAt",
      sortDirection = "asc",
      priceFrom,
      priceTo,
      key,
      categories,
    } = parsedQuery;

    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 9;

    const filter = {};

    if (key && key.trim()) {
      filter.$or = [
        { name: { $regex: key.trim(), $options: "i" } },
        { description: { $regex: key.trim(), $options: "i" } },
      ];
    }

    if ((priceFrom && !isNaN(priceFrom)) || (priceTo && !isNaN(priceTo))) {
      filter.price = {};
      if (priceFrom && !isNaN(priceFrom)) {
        filter.price.$gte = parseFloat(priceFrom);
      }
      if (priceTo && !isNaN(priceTo)) {
        filter.price.$lte = parseFloat(priceTo);
      }
    }

    if (categories && categories.trim()) {
      const categoriesArray = Array.isArray(categories)
        ? categories
        : categories.split(",").map((cat) => cat.trim());
      filter.categories = { $in: categoriesArray };
    }

    const sort = {};
    sort[sortBy] = sortDirection === "asc" ? 1 : -1;

    const options = {
      page: pageNumber,
      limit: limitNumber,
      sort,
      populate: "categories",
    };

    const result = await Product.paginate(filter, options);

    return result;
  } catch (err) {
    throw new Error("Error fetching products: " + err.message);
  }
};

const getProductById = async (id) => {
  try {
    const product = await Product.findById(id)
      .populate("categories")
      .populate("_manufacturer")
      .lean();
    if (!product) {
      throw new Error("Product not found");
    }
    // const cateId = product.category || "";
    // const category = await Category.findById(cateId.toString());
    // product.category = category;
    return product;
  } catch (err) {
    throw new Error("Error fetching product by ID: " + err.message);
  }
};

const getRandomProducts = async (product) => {
  try {
    const randomProducts = await Product.aggregate([
      { $match: { _id: { $ne: product._id } } },
      { $sample: { size: 3 } },
    ]);
    return randomProducts;
  } catch (err) {
    throw new Error("Error fetching random product: " + err.message);
  }
};

const getProductByQuery = async (query) => {
  try {
    const product = await Product.find(query)
      .populate("categories")
      .populate("_manufacturer")
      .lean();
    return product;
  } catch (err) {
    throw new Error("Error fetching product by query: " + err.message);
  }
};

const addProduct = async (product) => {
  try {
    const newProduct = new Product(product);
    const savedProduct = await newProduct.save();
    if (!savedProduct) {
      throw new Error("Error saving product");
    }
    return savedProduct;
  } catch (error) {
    throw new Error("Error saving product: " + error.message);
  }
}

const deleteProduct = async (productId) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      throw new Error("Error deleting product");
    } 
    return deletedProduct;
  } catch (error) {
    throw new Error("Error deleting product: " + error.message);
  }
};

const updateProduct = async (productId, product) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, product, { new: true });
    if (!updatedProduct) {
      throw new Error("Error updating product");
    }
    return updatedProduct;
  } catch (error) {
    throw new Error("Error updating product: " + error.message);
  }
}

module.exports = {
  getProducts,
  getAllProducts,
  getProductById,
  getRandomProducts,
  getProductByQuery,
  deleteProduct,
  updateProduct,
  addProduct
};
