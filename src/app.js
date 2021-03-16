// Using 'path' to work with directories
const path = require('path');
// 'express' is actually a function as opposed to an object
const express = require('express');

// Make sure to load 'hbs' for handlebars
// Note: They have an .hbs extension
const hbs = require('hbs');

// Require GeoCode into our project
const geocode = require('./utils/geocode');
// Require ForeCast into our project
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(__filename);
// Second parameter in 'path()' function will manipulate the string
// console.log(path.join(__dirname, '../public')); 

// Store the express application
const app = express();
// When this app runs on Heroku, you need to use an Environment variable
// Use port 3000 as a fallback
const port = process.env.PORT || 3000;
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
// For when you call your 'views' folder some other name
const viewsPath = path.join(__dirname, '../templates/views');
// For creating a path for your partials
const partialsPath = path.join(__dirname, '../templates/partials');

// Use the npm package 'hbs' (handlebars using Express.js) 
// To set up a dynamic template engine throughout your app
// Remember that Handlebars templates need to live in a specific folder
// It has to be named "views" and sit within the root of your project

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
// Now you have to 'set' the 'viewsPath' filePath
app.set('views', viewsPath);

// Now you need to register the 'hbs' Partials
hbs.registerPartials(partialsPath);

// You can actually serve up the 'path' directory
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Need to set up a route for your Handlebars files
app.get('', (req, res) => {
    // 'render' method will render one of your handlebars templates
    // It will get the html from the view and render it out
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    });
});

// Need to set up a route for your Handlebars files
app.get('/about', (req, res) => {    
    res.render('about', {
        title: 'About Me',
        name: 'John Doe'
    });
});

// Need to set up a route for your Handlebars files
app.get('/help', (req, res) => {    
    res.render('help', {
        title: 'Help',
        message: "The help message",
        name: 'John Doe'
    });
});

// We can tell our Express application to do the following below

// For instance, let's say we need to access the following urls:
// app.com
// app.com/help
// app.com/about

// Use app.get() to configure what the server should do
// When someone tries to get the resource at a specific resource
// e.g. HTML, JSON data

// Example 1 - Base domain
// app.get takes the route as the first argument
// And a function, which describes what we want to do
// When someone visits that particular route

// req -> Request -> An object containing information about the incoming request to the server
// res -> Response -> Contains a bunch of methods allowing us to customize what to send back to the requester
/*
app.get('', (req, res) => {
    res.send('<h1>Weather</h1>');
});
*/

/*
app.get('/help', (req, res) => {
    // res.send('Help page');
    res.send([{
        name: 'John'
    } , {
        name: 'Jane' 
    }]);
});
*/

/*
app.get('/about', (req, res) => {
    res.send('<h1>About page</h1>');
});
*/

/*
app.get('/weather', (req, res) => {
    res.send({
        forecast: 50,
        location: 'Hoboken'
    });
});
*/

app.get('/weather', (req, res) => {
    // To get query string information
    if (!req.query.address){        
        return res.send({
            error: 'You must provide an address'
        });
    }

    // Call the geocode function
    // Has been updated to create a default value of an empty object
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        }); 
    });

    /*
    // Example of using Dummy Data
    res.send({
        forecast: 'It is snowing',
        location: 'Hoboken',
        address: req.query.address
    });
    */

});

app.get('/products', (req, res) => {
    // To get query string information
    if (!req.query.search){
        // Use a return statement to avoid the 
        // 'Cannot send request to headers' or multiple requests sent error
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query.search);    
    res.send({
        products: []
    });
});

// Match any page that hasn't been matched 
// That starts with '/help'
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'John Doe',
        errorMessage:'Help article not found'
    });
});

// For rendering out 404 pages
// * - wildcard - match anything that hasn't been matched so far
// This must come last
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'John Doe',
        errorMessage:'Page not found'
    });
});

// Now you need to start the server
// This is an asynchronous process
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});