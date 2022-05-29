const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.openweathermap.org/geo/1.0/direct?q=' + encodeURIComponent(address) + '&limit=5&appid=edcd1ae5f4cb7dd4b1863d92a41a52a4'

    request({ url, json: true}, (error, {body}) => {
        if(error) {
            callback('unable to connect to location services', undefined)
        } else if(body.length === 0) {
            callback('Unable to find location, try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body[0].lat,
                longitude: body[0].lon,
                city: body[0].name,
                country: body[0].country
            })
        }
    })
}

module.exports = geocode