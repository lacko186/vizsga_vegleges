const { Client } = require("@googlemaps/google-maps-services-js");
const { googleMapsApiKey } = require("../../config/config");

const client = new Client();

module.exports.getRoute = async (origin, destination) => {
    try {
        const response = await client.directions({
            params: {
                origin,
                destination,
                key: googleMapsApiKey,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Google Maps API error: ${error.message}`);
    }
};
