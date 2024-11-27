const Product = require("./../models/product.model");

const getAllProducts = async (req) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortDirection = "asc",
      priceFrom,
      priceTo,
      key,
      categories,
    } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const filter = {};

    if (key) {
      filter.$or = [
        { name: { $regex: key, $options: "i" } },
        { description: { $regex: key, $options: "i" } },
      ];
    }

    if (priceFrom !== undefined || priceTo !== undefined) {
      filter.price = {};
      if (priceFrom !== undefined) {
        filter.price.$gte = parseFloat(priceFrom);
      }
      if (priceTo !== undefined) {
        filter.price.$lte = parseFloat(priceTo);
      }
    }

    if (categories) {
      const categoriesArray = Array.isArray(categories)
        ? categories
        : categories.split(",");
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
    const product = await Product.findById(id).populate("categories");
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (err) {
    throw new Error("Error fetching product by ID: " + err.message);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
