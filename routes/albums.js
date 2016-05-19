'use strict';

var express = require('express');
var router = express.Router();

var Album = require('../models/album.js');

router.route('/')
  .get((req, res) => {
    Album
    .find({})
    .exec(res.handle);
  })
  .post((req, res) => {
    Album.create(req.body, res.handle);
  });

router.route('/:id')
  .get((req, res) => {
    Album
      .findById(req.params.id)
      .populate('images')
      .exec(res.handle)
  })
  .delete((req, res) => {
    Album.findByIdAndRemove(req.params.id, res.handle);
  })
  .put((req, res) => {
    Album.findByIdAndUpdate(req.params.id, req.body, {new:true}, res.handle);
  });

router.route('/:albumId/images/:imageId')
  .post((req, res) => {
    var albumId = req.params.albumId;
    var imageId = req.params.imageId;
    Album.addImage(albumId, imageId, res.handle);
  })
  .delete((req, res) => {
    var albumId = req.params.albumId;
    var imageId = req.params.imageId;
    Album.removeImage(albumId, imageId, res.handle);
  })

// router.route('/summary')
//   .get((req, res) => {
//     Album.summary(res.handle);
//   })

module.exports = router;
