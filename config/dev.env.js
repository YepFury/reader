'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // BASE_URL: '"//127.0.0.1:7070/"'
    BASE_URL: '"//localhost:7123/"'
})
