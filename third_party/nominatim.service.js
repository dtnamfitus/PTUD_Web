const baseURL = "https://nominatim.openstreetmap.org/search?format=json";

require("dotenv").config();

const shopLat = parseFloat(process.env.SHOP_LATITUDE);
const shopLong = parseFloat(process.env.SHOP_LONGITUDE);
const R = 6371;
const toRadians = (degree) => (degree * Math.PI) / 180;
const lat1 = toRadians(shopLat);
const long1 = toRadians(shopLong);

const calculateHaversine = (latitude, longitude) => {
  const lat2 = toRadians(latitude);
  const long2 = toRadians(longitude);

  const deltaLat = lat2 - lat1;
  const deltaLong = long2 - long1;

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLong / 2) ** 2;
  const c = 2 * Math.asin(Math.sqrt(a));

  const distance = R * c;

  return distance;
};

const calculateShippingCost = (distanceKm, weightKg) => {
  const baseFee = 10000;
  const ratePerKm = distanceKm <= 10 ? 100 : 500;
  const weightSurcharge = weightKg > 3 ? (weightKg - 3) * 10000 : 0;

  const shippingCost = baseFee + ratePerKm * distanceKm + weightSurcharge;

  const shippingCostInDollar = shippingCost / 25000;

  return shippingCostInDollar;
};

const search = (address, timeout = 5000) => {
  const url = `${baseURL}&q=${address}`;
  const controller = new AbortController();
  const signal = controller.signal;
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  return fetch(url, { signal })
    .then((res) => {
      clearTimeout(timeoutId);
      return res.json();
    })
    .catch((err) => {
      if (err.name === "AbortError") {
        throw new Error("Request timed out");
      }
      throw err;
    });
};

module.exports = {
  search,
  calculateHaversine,
  calculateShippingCost,
};
