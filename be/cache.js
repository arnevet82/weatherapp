const NodeCache = require("node-cache/index");
const myCache = new NodeCache({stdTTLL: 1});
module.exports = myCache;

