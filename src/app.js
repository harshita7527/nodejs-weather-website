const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPaths = path.join(__dirname, '../templates/partials')

//Setup handelbars engine and views location
app.set('view engine', 'hbs') //to setup handlebars
app.set('views', viewsPath)
hbs.registerPartials(partialsPaths)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Harshita'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Harshita'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Harshita'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, city, country } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                city,
                country,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Harshita',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Harshita',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server is up on port '+ port)
})



// app.get('', (req, res) => {
//     res.send('<h1>weather<h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name:'andrew',
//         age:27
//     }, {
//         name:'rose',
//         age:22
//     }
// ])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About<h1>')
// })

// app.get('/product', (req, res) => {
//     if(!req.query.search) {
//         return res.send({
//             error: 'you must provide a search term'
//         })
//     }
//     res.send({
//         products: []
//     })
// })