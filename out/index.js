"use strict";
const common_1 = require("./common");
module.exports = function init(baseUrl) {
    if (baseUrl)
        common_1.setBaseUrl(baseUrl);
    require('./modules/unique-number');
    require('./modules/small-data');
};
