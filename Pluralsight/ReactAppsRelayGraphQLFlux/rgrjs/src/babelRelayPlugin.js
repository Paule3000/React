var getBabelRelayPlugin = require('babel-relay-plugin');

var schemaData = require('../schema/schema.json');

module.exports = getBabelRelayPlugin(schemaData);
