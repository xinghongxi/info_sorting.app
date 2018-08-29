'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API:'"http://192.168.199.144:8060/baby"',
  CLIENT_SECRET:'"test0011"',
  CLIENT_ID:'"2017100001"',
  IMAGE_HOST:'http://192.168.199.144:8060/sunflower'
})

