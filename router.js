var express = require("express");
var router = express.Router();

const  credential = {
    email : "admin@gmail.com",
    password : "admin123"
}


// login user
router.post('/login', (req, res) => {
    if (req.body.username === credential.email && req.body.password === credential.password) {
        req.session.user = req.body.username;
        res.redirect('/route/dashboard');
    } else {
        res.send("Invalid Username or Password");
    }
});

// Route for dashboard
router.get('/dashboard', (req, res) => {
    // Assuming you have an empty array to store menu items
    const menuItems = [];

    res.render('dashboard', { user: req.session.user, menuItems: menuItems });
});


// Route to handle deleting a menu item
router.post('/delete-menu-item', (req, res) => {
    const { index } = req.body;
    
    // Retrieve menu items from session
    let menuItems = req.session.menuItems || [];

    // Check if index is valid
    if (index >= 0 && index < menuItems.length) {
        // Remove the menu item at the specified index
        menuItems.splice(index, 1);
        // Store the updated menuItems array in the session
        req.session.menuItems = menuItems;
        res.redirect('/route/dashboard');
    } else {
        res.status(400).send("Invalid menu item index");
    }
});

// Route to handle adding an item to the menu
router.post('/menu', (req, res) => {
    // Retrieve form data from request body
    const { category, item, eta } = req.body;

    // Retrieve menu items from session or initialize an empty array if not exists
    let menuItems = req.session.menuItems || [];

    // Add the new item to the menuItems array
    menuItems.push({ category, item, eta });

    // Store the updated menuItems array in the session
    req.session.menuItems = menuItems;

    // Redirect to the dashboard page after adding the item to the menu
    res.redirect('/route/dashboard');
});

// route for displaying menu form
router.get('/menu', (req, res) => {
    res.render('menu', { user: req.session.user });
});

// Route for logout
// router.get('/logout', (req ,res)=>{
//     req.session.destroy(function(err){
//         if(err){
//             console.log(err);
//             res.send("Error")
//         }else{
//             res.render('base', { title: "Express", logout : "logout Successfully...!"})
//         }
//     })
// })

module.exports = router;
