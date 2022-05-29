const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + encodeURIComponent(lat) + '&lon=' + encodeURIComponent(lon) + '&units=metric&appid=edcd1ae5f4cb7dd4b1863d92a41a52a4'

    request({ url, json: true}, (error, {body}) => {
            if(error) {
                callback('unable to connect to weather services', undefined)
            } else if(body.message) {
                callback('Unable to find locations', undefined)
            } else {
                callback(undefined, body.current.weather[0].description +'. It is currently '+body.current.temp+' degrees out, there is '+ body.current.humidity+' % humidity')
            }
        })
}

module.exports = forecast