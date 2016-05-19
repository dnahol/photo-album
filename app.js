'use strict';

const PORT = process.env.PORT || 3000;

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const MONGOURL = process.env.MONGODB_URI || 'mongodb://localhost/photo-album';

mongoose.connect(MONGOURL, err => {
  console.log(err || `Connected to MongoDB at ${MONGOURL}`);
});

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs')

app.use((req, res, next) => {

  res.handle = (err, data) => {
    res.status(err ? 400 : 200).send(err || data);
  };

  next();
});

app.use('/api/albums', require('./routes/albums'));
app.use('/api/images', require('./routes/images'));
app.use('/', require('./routes/index'))

app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});

module.exports = app;
