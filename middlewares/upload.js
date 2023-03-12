const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const dotenv = require('dotenv');
dotenv.config();
// const dbConfig = require("../config/db");

var storage = new GridFsStorage({
  url: process.env.localConnection,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-bezkoder-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "farmermeets",
      filename: `${Date.now()}-bezkoder-${file.originalname}`
    };
  }
});

var uploadFiles = multer({ storage: storage }).array("file", 10);
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;