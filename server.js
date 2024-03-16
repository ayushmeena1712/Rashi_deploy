// Import necessary modules
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

// Import router module
const router = require('./router');

// Create an Express app
const app = express();

const port = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Serve static assets
app.use('/static', express.static(path.join(__dirname, 'public')))

// Session management middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Route handling
app.use('/route', router);

// Home route
app.get('/', (req, res) => {
    res.render('base', { title: "Login System" });
});

// Form submission route
app.post('/route/menu', (req, res) => {
    const { category, item, eta } = req.body;

    // Perform validation if needed
    if (!category || !item || !eta) {
        return res.status(400).send("Please fill all fields.");
    }

    // Here you would typically store the form data in your database
    // For simplicity, let's just log the data for now
    console.log("Category:", category);
    console.log("Item:", item);
    console.log("ETA:", eta);

    // Redirect to a confirmation page or back to the menu page
    res.redirect('/route/dashboard'); // Adjust the URL as per your application's structure
});

// Start the server
app.listen(port, () => {
    console.log("Listening to the server on http://localhost:3000");
});
