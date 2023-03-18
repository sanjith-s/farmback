const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
require('dotenv').config()

var storage = new GridFsStorage({
  url: process.env.localConnection,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-upload-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: process.env.imgBucket,
      filename: `${Date.now()}-upload-${file.originalname}`
    };
  }
});

var uploadFiles = multer({ storage: storage }).single("file");
var uploadFilesUtil = util.promisify(uploadFiles);
module.exports = uploadFilesUtil;