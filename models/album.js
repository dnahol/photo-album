'use strict';

var Image = require('./image.js')

var mongoose = require('mongoose');

var albumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }]
})

// albumSchema.statics.summary = function(cb) {
//
//   return cb({ok: 'ok'})
// };

albumSchema.statics.addImage = function(albumId, imageId, cb) {
  Album.findById(albumId, (err1, album) => {
    Image.findById(imageId, (err2, image) => {
      if(err1 || err2) return res.status(400).send(err1 || err2);

      var albumHasImage = album.images.indexOf(image) !== -1;
      var imageHasAlbum = image.album == albumId;

      if(albumHasImage || imageHasAlbum) {
        return cb({error: "Album already has this image!"});
      }

      album.images.push(imageId);
      image.album = albumId;

      album.save((err1) => {
        image.save((err2) => {
          cb(err1 || err2);
        });
      });
    });
  });
};

albumSchema.statics.removeImage = function(albumId, imageId, cb) {
  Album.findById(albumId, (err, album) => {
    if(err) return res.status(400).send(err);
    var index = album.images.indexOf(imageId);

    album.images.splice(index, 1);

    album.save(cb);
  });
};

var Album = mongoose.model('Album', albumSchema);

module.exports = Album;
