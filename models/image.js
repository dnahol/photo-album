'use strict';

var mongoose = require('mongoose');
var imageSchema = new mongoose.Schema({
  title: { type: String },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album'}
})

var Image = mongoose.model('Image', imageSchema);

module.exports = Image;
