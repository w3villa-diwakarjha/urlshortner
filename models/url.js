// const mongoose= require('mongoose');
// // const { Module } = require('webpack');
// const Schema= mongoose.Schema;
// const urlSchema= new Schema({
//     shortId: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     redirecturl:{
//         type: String,
//         required: true,
//     },
//     visitHistory: [{
//         timestamps: {type: Number}
//     }],
// },
// {timestamps: true}
// );

// const URL= mongoose.model('URL',urlSchema);

// Module.exports=URL;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectURL: {
    type: String,
    required: true,
  },
  visitHistory: [{
    timestamp: Date
  }],
},
{timestamps: true}
);

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;
