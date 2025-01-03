const Product = require("./../models/product.model");

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

module.exports = {
  getAllProducts,
  getProductById,
  getRandomProducts,
};
