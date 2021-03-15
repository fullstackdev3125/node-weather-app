const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoianBhaXRjaGVsbCIsImEiOiJja2xmaGUwajIxdHR6MndxZWd4MnM5aXUzIn0.Cc7pWPGm802Kq3NQJ0ksDQ&limit=1';

    request({url, json: true}, (error, {body}) => {
        // Use an 'if' statement to figure out what happened
        if (error) {
            callback('Unable to connect to location services!');
        } else if (body.features.length === 0) {
            // Case of empty error
            callback('Unable to find location. Try another search.', undefined);
        } else {
            // A valid location
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;