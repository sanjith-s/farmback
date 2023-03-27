var imgModel = require('../models/imageModel');
var fs = require('fs');
var path = require('path');

const getImages = async (req,res) => {
  imgModel.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred', err);
    }
    else {
      res.render('imagesPage', { items: items });
    }
  });
};

const uploadImage = async (req,res) => {
  var obj = {
    img: {
      data: req.body.fileData,
      contentType: 'image/jpg'
    }
  }
  imgModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    }
    else {
      // item.save();
      res.redirect('/');
    }
  });
};

module.exports = {
  getImages,
  uploadImage
}