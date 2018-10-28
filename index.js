const express = require('express');
require('dotenv').config();
const app = express();
const handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

// Middleware
app.use( (req, res, next) => {
    console.log("Looking for URL: " + req.url);
    next();
});

app.get('junk', (req, res, next) => {
    console.log("Tried to access /junk");
    throw new Error("/junk doesn't exist")
});

app.use( (err, req, res, next) => {
    console.log("Error: ",err.message);
    next();
});

app.get('/', (req, res) => res.render('home'));
app.get('/about', (req, res) => res.render('about'));

app.use( (req, res) => {
    res.type("text/html");
    res.status(404);
    res.render("404");
});

app.use( (err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render("500");
})

// app.get('/' , (req, res) => res.send("Express Test"));
app.listen(app.get('port'), () => console.log("Running server... ", process.env.port));