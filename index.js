const express = require('express')
const app = express()

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res) { 
    //res.send('Hello World!')
    console.log("Home page");
    res.render("home");}
);

app.get('/login',function (req, res) {
    console.log("Login page");
    res.render("login");}
);

//test taker
app.get('/profile',function (req, res) {
    console.log("User profile");
    res.render("profile");}
);

//Test page
app.get('/test',function (req, res) {
    console.log("Test page");
    res.render("test");}
);

app.get('/instructions',function (req, res) {
    console.log("Instruction page");
    res.render("instructions");}
);


app.listen(3000, () => console.log('App server starting at port 3000!'))
