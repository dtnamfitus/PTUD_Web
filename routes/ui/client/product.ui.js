const express = require("express");
const axios = require("axios");
const router = express.Router();
const apiUrl = process.env.API_URL || "http://localhost:8080/api/client";
const path = require("path");

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${apiUrl}/product`);
    const products = response.data;
    const bodyHtml = await new Promise((resolve, reject) => {
      res.render("client/products/product", { products }, (err, html) => {
        if (err) return reject(err);
        resolve(html);
      });
    });
    res.render("layout/client-layout/layout", {
      title: "Products",
      body: bodyHtml,
      products,
      dirname: __dirname,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching products");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${apiUrl}/product/${id}`);
    const product = response.data;

    res.render("products/detail", { product });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching product details");
  }
});

module.exports = router;
