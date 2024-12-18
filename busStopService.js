const fs = require("fs").promises;
const path = require("path");
const axios = require("axios");
const { kkzrtApiUrl } = require("../../config/config");

const busStopsPath = path.join(__dirname, "../../data/kaposvarBusStops.json");

module.exports.getBusStops = async () => {
    try {
        const staticStops = JSON.parse(await fs.readFile(busStopsPath, "utf-8"));
        const realTimeData = await axios.get(kkzrtApiUrl);
        // Kombináld a statikus és valós idejű adatokat
        return { staticStops, realTimeData: realTimeData.data };
    } catch (error) {
        throw new Error(`Bus stop service error: ${error.message}`);
    }
};
