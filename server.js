
var express = require ('express');//henter modules express.
var app = express();//laver ny express instance.
const path = require ('path');//The path module provides utilities for working with file and directory paths.
const bodyParser = require("body-parser")




app.set('view engine', 'ejs'); //sætter view engine til ejs.
app.use(express.static('public')); //kan bruge filer i public
app.use('/static', express.static('public')); // laver en virtuel path, hvor path ikke eksistere.
app.use(express.static(path.join(__dirname + '/public'))); //gør at du kan stadig kan bruge filer i public, hvis du starter serveren fra en anden happe.
// Bodyparser
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

require('./routes/index')(app);


app.listen(3000, (req, res) => {
    console.log("listening on port 3000")
})



