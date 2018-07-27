var getBabelRelayPlugin = require('babel-relay-plugin');

var schemaData = require('../schema/schema.json').data;

module.exports = getBabelRelayPlugin(schemaData);
