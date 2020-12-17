const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const adminRoutes = express.Router();
require('dotenv').config();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const PORT = process.env.PORT || 3003;



let Demographics = require('./models/demographics');

app.use(cors());
app.use(bodyParser.json());

const MONDODB_URI = process.env.MONDODB_URI || 'mongodb://localhost/portalDB';


mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'));
mongoose.connection.on('disconnected', () => console.log ('mongo is disconnected'));

mongoose.connect(MONDODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true // prevents errors when connecting to mongoDB
});

const connection = mongoose.connection;
mongoose.connection.once('open', () => {
    console.log('connected to mongoose...');
  });

adminRoutes.route('/').get((req, res) => {
    Demographics.find((err, demographic)=>{
        if (err){
            console.log(err)
        } else {
            res.json(demographic); // attach what we get to the resonse object iin json format.

        }
    });
});

adminRoutes.route('/:id').get((req, res) =>{
    let id = req.params.id;
    Demographics.findById(id, (err, demographic) =>{
        if (err){
            console.log(err)
        } else {
        res.json(demographic);
        }
    })
})

adminRoutes.route('/create').post((req, res) =>{
    console.log(req.body);
   Demographics.create(req.body)
        .then(demographic => {
            res.status(200).json({'demographic': 'added successfully'});
        })
        .catch(err => {
            res.status(400).send('failed to add new patient')
        })
})

adminRoutes.route('/edit/:id').post((req, res) => {
    Demographics.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, demographic)=> {
        if (!demographic) {
            res.status(404).send('no data found');
        } else {
           res.redirect('/portal')
        }
    })
})

adminRoutes.route('/remove/:id').delete((req, res) => {
    Demographics.findByIdAndRemove(req.params.id, (err, removedPatient) => {
        if (err){
            res.status(400).send('failed to remove patient')
        } else {
            res.status(200).json(removedPatient);
        }
    })
})


app.use('/portal', adminRoutes); //all the routes will be relative to this route

app.listen(PORT, () => {
    console.log(`Party on port ${PORT} ya'll!!! 🎉🎈🎊🥳`);
});
