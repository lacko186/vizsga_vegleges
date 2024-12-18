require("C:/xampp2/htdocs/config/config.js").config();

const path = require('path');
require(path.join(__dirname, 'config', 'config.js')).config();

// config.js
const dotenv = require('dotenv');

// Betöltjük a .env fájlt, ha létezik
dotenv.config();

module.exports.config = function () {
    console.log('Config fájl betöltve!');
};

