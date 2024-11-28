const fs = require("fs");
const crawledData = require("./uniqlo.crawled.json");

const data = crawledData.items.map((item) => {
  const mainImage = Object.values(item.images.main)[0]?.image || null;
  const sizes = item.sizes.map((size) => size.name);
  const colors = item.colors.map((color) => {
    const colorImages = Object.entries(item.images.main)
      .filter(([key]) => key === color.displayCode)
      .map(([_, value]) => value.image);

    return {
      color_name: color.name,
      images: colorImages,
    };
  });
  return {
    name: item.name,
    price: item.prices.base.value,
    mainImage,
    colors,
    size: sizes,
  };
});

const jsonData = JSON.stringify(data, null, 2);

fs.writeFile("santinized-data.json", jsonData, (err) => {
  if (err) {
    return;
  }
  console.log("Successful santinized");
});
