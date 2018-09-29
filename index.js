const express = require('express')
const app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


//body-parser
app.use (bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));



//mongoose connnections
mongoose.connect("mongodb://localhost/mcq");
var SignUpSchema = new mongoose.Schema({
	name : String,
    mail: String,
    password: String
});
var SignUp = mongoose.model("SignUp", SignUpSchema);

var TestSchema = new mongoose.Schema({
	title : String,
    time: String
});
var Test = mongoose.model("Test", TestSchema);
//mongoose connection ends











//list definations
var accountList = [
    {name : "salmond", mail:"salmond@gmail.com", password: "12345"}
];
var contestList = [
    {title : "salmond", time:"2:30"}
];




//post requests


//login post request
app.post('/login',function (req, res) {
    var name = req.body.username;
    var password = req.body.pass;
    
   
    SignUp.find({$and: [{name: name}, {password: password}]}, function(err, listSignUp){
		if (err){
			console.log(err);
		}else{
            console.log("login command executed Successful!!!");
            if (listSignUp.length != 0){
                
                //contests
                Test.find({}, function(err, listTest){
                    if (err){
                        console.log(err);
                    }else{
                        console.log("Test command executed Successful!!!");
                        console.log(listTest);
                        contestList = listTest;  
                    }
                });

                accountList = listSignUp;
                res.render("user",{contests: contestList, account: accountList});
                console.log("login successful!!!");
                
            }else{ 
                res.redirect("login");
                console.log("login failed!!!");
            }
		}
	});
});

//signup post request
app.post('/signup',function (req, res) {
    //var dbo = db.db("mcq");
    var name = req.body.name;
    var mail = req.body.mail;
    var password = req.body.pass;
	var newAccount = {name: name, mail: mail, password: password};

	SignUp.create(newAccount,function(err, newlyCre){
		if(err)
		{
			console.log(err);
		}
		else{
            console.log("account created!!!");
			res.redirect("/home");
        }
       
	});
	
	
});



app.get('/', function(req, res) { 
    //res.send('Hello World!')
    console.log("Home page");
    res.render("home");}
);

app.get('/home', function(req, res) { 
    //res.send('Hello World!')
    console.log("Home page");
    res.render("home");}
);

app.get('/signup',function (req, res) {
    console.log("Signup page");
    res.render("signup");}
);

app.get('/login',function (req, res) {
    console.log("Login page");
    res.render("login");}
);

//test taker
app.get('/user',function (req, res) {
    console.log("User profile");
    Test.find({}, function(err, listTest){
        if (err){
            console.log(err);
        }else{
            console.log("Test command executed Successful!!!");
            console.log(listTest);
            contestList = listTest;  
        }
    });
    res.render("user", {contests: contestList, account: accountList});
});

app.get('/test',function (req, res) {
    console.log("User profile");
    res.render("test");}
);

app.get('/setter',function (req, res) {
    console.log("User profile");
    res.render("setter");}
);

app.listen(4000, () => console.log('App server starting at port 3000!'))
