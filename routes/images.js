'use strict';

var express = require('express');
var router = express.Router();

var Image = require('../models/image.js')

/* GET images listing. */
router.route('/')
.get((req, res) => {
  Image
  .find({})
  .populate('album')
  .exec(res.handle);
})
.post((req, res) => {
  Image.create(req.body, res.handle);
});

router.route('/:id')
.get((req, res) => {
  Image
  .findById(req.params.id)
  .populate('album')
  .exec(res.handle)
})
.delete((req, res) => {
  Image.findByIdAndRemove(req.params.id, res.handle);
})
.put((req, res) => {
  Image.findByIdAndUpdate(req.params.id, req.body, {new:true}, res.handle);
})

router.route('/:imageId/upvote/:userId')
.post((req, res) => {

  Post.like(req.params.postId, req.params.userId, res.handle);

});


router.route('/:imageId/downvote/:userId')
.post((req, res) => {

  Post.dislike(req.params.postId, req.params.userId, res.handle);

});

module.exports = router;
