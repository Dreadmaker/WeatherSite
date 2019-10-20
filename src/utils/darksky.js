const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/066c87c8884df0194fe4254db7aa5b03/' + lat + ',' + long + '?units=ca'

    request({ url: url, json: true }, (error, {body}) => {

        if (error) {

            callback('unable to connect to weather services', undefined);

        } else if (body.error) {

            callback('unable to find location', undefined);

        } else {

            callback(undefined, {
                currentTemperature: body.currently.temperature,
                currentPrecipProbability: body.daily.data[0].precipProbability,
                currentSummary: body.daily.summary,
                currentPrecipType: body.daily.data[0].precipType,
                dailySummary: body.daily.data[0].summary
            });
        }
    });

}

module.exports = forecast;