require('./connect.js');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

DescSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
})

const Desc = mongoose.model('Desc', DescSchema);

exports.Desc = Desc;