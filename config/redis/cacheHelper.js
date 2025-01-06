const redisClient = require("./redisClient");

/**
 * Get data from Redis cache.
 * @param {string} key
 * @returns {Promise<any>} Cached data or null if not found
 */
const getCache = async (key) => {
  try {
    const cachedData = await redisClient.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (err) {
    console.error("Redis get error:", err);
    return null;
  }
};

/**
 * Set data to Redis cache with expiration.
 * @param {string} key
 * @param {any} value
 * @param {number} ttl Time to live in seconds
 */
const setCache = async (key, value, ttl = 3600) => {
  try {
    await redisClient.set(key, JSON.stringify(value), { EX: ttl });
  } catch (err) {
    console.error("Redis set error:", err);
  }
};

/**
 * Delete data from Redis cache.
 * @param {string} key
 */
const deleteCache = async (key) => {
  try {
    await redisClient.del(key);
  } catch (err) {
    console.error("Redis delete error:", err);
  }
};

module.exports = { getCache, setCache, deleteCache };
