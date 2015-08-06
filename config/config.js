/* global process */

var env = process.env.NODE_ENV || 'production';

var config = {
  development: {
    port: 18080,
    neo_url: 'http://localhost:7474'
  },

  production: {
    port: 18080,
    neo_url: process.env.NEO_HOST || 'http://localhost:7474'
  }
};

module.exports = config[env];
