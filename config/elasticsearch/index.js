const { Client } = require("@elastic/elasticsearch");
require("dotenv").config();

const elasticsearchClient = new Client({
  node: process.env.ELASTICSEARCH_HOST,
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD,
  },
});

module.exports = elasticsearchClient;
