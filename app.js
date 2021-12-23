const express = require("express")
const app = express();
const port = 8000;
const path = require("path");
const bodyParser = require("body-parser");


//Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});

//Define Mongoose Schema
let contactSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    address: String,
    desc: String
  });

  let Contact = mongoose.model('Contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); //For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); //Set the template engine as pug


app.set('views', path.join(__dirname, 'views')); //Set views directory [pug]

// ENDPOINTS

app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params)
})
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug')
})
app.post('/contact', (req, res) => {
    let myData = new Contact(req.body)
    myData.save().then(() =>{
    res.send("this item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
    // res.status(200).render('contact.pug')
})


// START THE SERVER
app.listen(port, () => {
    console.log(`The application is started successfully on port ${port}`);
});