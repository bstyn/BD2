const { Schema, model } = require('mongoose');


const ProductScheme = new Schema({
    id: String,
    name: {type: String, unique: true},
    price: Number,
    description: String,
    quantity: Number,
    unit: String,
});

module.exports = model('Product', ProductScheme);