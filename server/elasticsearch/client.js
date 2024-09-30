require('dotenv').config();
const { Client } = require('@elastic/elasticsearch');
const config = require('config');

const elasticConfig = config.get('elastic');

const client = new Client({
  node: elasticConfig.node,
  auth: {
    username: process.env.ELASTIC_USERNAME || elasticConfig.username,
    password: process.env.ELASTIC_PASSWORD || elasticConfig.password
  },
  tls: {
    rejectUnauthorized: false
  }
});

client.ping()
  .then(response => console.log("You are connected to Elasticsearch!"))
  .catch(error => console.error("Elasticsearch is not connected.", error));

module.exports = client;
