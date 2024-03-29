const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/darksky');

const app = express();
const port = process.env.PORT || 3000;

// Define path for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Normal Weather',
        name: 'Jordan Burrows'
    });

});

app.get('/1337', (req, res) => {
    res.render('1337', {
        title: 'Hacker Weather',
        name: 'Jordan Burrows'
    });

});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jordan Burrows'
    });

});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'you must provide a search term!'
        });

    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
           return res.send({ error });
        }
    
        forecast(latitude, longitude, (error, {currentSummary, currentTemperature, currentPrecipProbability, currentPrecipType, dailySummary} = {}) => {
    
            if (error)
            {
                return res.send({ error });
            }
    
            res.send({
                currentWeather: 'Current weather data for ' + location + ':',
                Summary: currentSummary,
                temperature: 'Today\'s forecast: ' + dailySummary +' It is currently ' + currentTemperature + ' degrees outside.',
                precipProbability: 'There is a ' + currentPrecipProbability*100 + '% chance of ' + currentPrecipType +'.'
            });
          });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        });

    }
    console.log(req.query.search)
    res.send({
        products: []
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'quoth the server, 404',
        message: 'we fucked up. Or you did. dunno. But it happened.',
        name: 'Jordan Burrows'
    });
});


app.listen(port, () => {
    console.log('we\'re up and running');
});