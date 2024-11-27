const mongoose = require("mongoose");

const mockProductCategories = [
  {
    name: "T-Shirts",
    description: "Short-sleeved or long-sleeved casual tops.",
  },
  { name: "Shirts", description: "Formal or casual button-up shirts." },
  { name: "Pants", description: "Long trousers for men and women." },
  { name: "Jeans", description: "Denim pants suitable for casual wear." },
  {
    name: "Shorts",
    description: "Short trousers for summer or casual occasions.",
  },
  { name: "Skirts", description: "Casual or formal wear for women." },
  { name: "Dresses", description: "One-piece outfits for various occasions." },
  { name: "Jackets", description: "Outerwear for warmth or style." },
  { name: "Sweaters", description: "Knitted tops for colder weather." },
  {
    name: "Hoodies",
    description: "Sweaters with hoods, great for casual wear.",
  },
  { name: "Coats", description: "Outerwear for winter or formal settings." },
  {
    name: "Blazers",
    description: "Formal jackets for professional or casual chic looks.",
  },
  {
    name: "Suits",
    description: "Matching sets of jacket and trousers for formal occasions.",
  },
  { name: "Activewear", description: "Clothes for exercise or sports." },
  {
    name: "Underwear",
    description: "Basic inner clothing like briefs and bras.",
  },
  { name: "Swimwear", description: "Clothes for swimming or beachwear." },
  { name: "Sleepwear", description: "Clothes for sleeping or lounging." },
  { name: "Accessories", description: "Hats, scarves, gloves, or belts." },
  { name: "Footwear", description: "Shoes, sandals, or boots." },
  { name: "Kidswear", description: "Clothes designed for children." },
];

const mockProducts = [];
