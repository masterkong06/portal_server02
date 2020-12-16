const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Demographics = new Schema({
    firstName: {
        type: String, 
        required: 'First name'
    },
    lastName: {
        type: String, 
        required: 'Last name'
    },
    address: {
        type: String, 
        required: 'Address'
    },
    city: {
        type: String, 
        required: 'City'
    },
    state: {
        type: String, 
        required: 'State'
    },
    zip: {
        type: Number, 
        required: 'Zip Code'
    },
    phone: {
        type: Number, 
        required: 'Phone'
    },
    email: {
        type: String
    },
    date_created: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Demographics', Demographics);