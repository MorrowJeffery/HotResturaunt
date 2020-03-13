// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// People @ Resturant (sitting and waitlist) (DATA)
// =============================================================
var IDRef = 0;

var resturauntGuests = [
  {
    name: "test",
    numofpeople: 2,
    phoneNum: "916-123-4567",
    uniqueID: 0
  }
];

// Routes
// =============================================================

//.gets 

// Basic route that sends the user to the homepage
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "homepage.html"));
});

//this is a route that will send the user to the make a reservation page
app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// returns first (up to) 5 reservations 
app.get("/api/tables", function(req, res) {
    var tables = [];
    //more that 5 reservations
    if (resturauntGuests.length > 5) {
        for (var i = 0; i < 5; i++) {
            tables.push(resturauntGuests[i]);
        }
    }
    //less than 5 reservations
    else {
        for (var i = 0; i < resturauntGuests.length; i++) {
            tables.push(resturauntGuests[i])
        }
    }
  return res.json(tables);
});

// returns the waitlist
app.get("/api/waitlist", function(req, res) {
    let waitlist = [];

    //if there are more than 5 reservations, push them into the wailist
    if (resturauntGuests.length > 5) {
        for (var i = 5; i < resturauntGuests.length; i++) {
            waitlist.push(resturauntGuests[i]);
        }
    }
    //return the waitlist
  return res.json(waitlist);
});

//____________________________________________________________________
//.posts

// Create New reservation - takes in JSON input
app.post("/api/reserve", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservation.uniqueID = IDRef;
  IDRef++;

  //console.log(newReservation);

  resturauntGuests.push(newReservation);

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
