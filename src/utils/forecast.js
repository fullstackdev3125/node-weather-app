const request = require('request');

const forecast = (latitude, longitude, callback) => {
    //           http://api.weatherstack.com/current?access_key=daf4e467cf1431979e43ead0840ebb09&query=&units=f
    const url = 'http://api.weatherstack.com/current?access_key=daf4e467cf1431979e43ead0840ebb09&query=' + latitude + ',' + longitude + '&units=f';

    request({url, json: true}, (error, {body}) => {
        // Use an 'if' statement to figure out what happened
        // console.log(response.body.current.weather_descriptions[0]);
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.error) {
            // Case of empty error
            callback('Unable to find location.', undefined);
        } else {  
            callback(undefined, body.current.weather_descriptions[0] + ".  It is currently " + body.current.temperature + " degrees out.  It feels like " + body.current.feelslike + " degrees out. The humidity is " + body.current.humidity + "%.");
        }
    });
}

module.exports = forecast;