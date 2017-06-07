//*****DEPENDENCIES*****//
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
//add express-handlebars and method-override?
var db = require("./models");

//set up Express app
var app = express();
var PORT = process.env.PORT || 8080;

//set up app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json"}));

//set up static directory for all public files
app.use(express.static(path.join(__dirname + "./public")));

//*****ROUTES*****//
require("./routes/html-routes.js")(app);
require("./routes/post-routes.js")(app);

//sequelize sync models then start express app
// This we'll use if we need to change the tables
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("Virtual Locker is listening on port: " + PORT);
    });
});