const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
require('dotenv').config()

var storage = new GridFsStorage({
  url: process.env.localConnection,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];
    const filenamestore=`${Date.now()}-upload-${file.originalname}`;
    req.body.filenamestore=filenamestore;
    if (match.indexOf(file.mimetype) === -1) {
      const filename = filenamestore;
      return filename;
    }

    return {
      bucketName: process.env.imgBucket,
      filename: filenamestore
    };
  }
});

var uploadFiles = multer({ storage: storage }).single("file");
var uploadFilesUtil = util.promisify(uploadFiles);
module.exports = uploadFilesUtil;