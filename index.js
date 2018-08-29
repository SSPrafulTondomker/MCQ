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

app.listen(3000, () => console.log('App server starting at port 3000!'))